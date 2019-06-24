import * as React from 'react'
import fx, { FireworksInput } from './fireworks'

type FireworksProps = {
  // Interval in milliseconds for how often new fireworks get rendered
  interval?: number
  // Count of the fireworks that are rendered concurrently
  count?: number
  // Calc is a function that can be evaluated to generate `FireworksInput`
  calc?: (input: any, index: number) => FireworksInput
}

export class Fireworks extends React.Component<FireworksProps> {
  // A reference for `setInterval` instance
  _ivl = 0
  // A check if the browser is idle to decide if fireworks
  // re-render should be attempted.
  _idle = false
  // Reference to the base HTML element
  _ref: HTMLElement | null = null

  render() {
    return React.createElement('div', {
      ref: ref => (this._ref = ref),
      className: 'react-fireworks'
    })
  }

  componentDidMount() {
    let self = this
    let { interval } = this.props

    if (interval) {
      // TODO: check if tab is idle
      //
      // window.requestIdleCallback(function() {
      //   self.onIdle()
      // })

      this._ivl = window.setInterval(function() {
        if (self._idle) return

        self.evaluate()
      }, interval)

      this.evaluate()
    } else {
      this.evaluate()
    }
  }

  onIdle() {
    this._idle = true
  }

  componentWillUnmount() {
    if (this._ivl) {
      clearInterval(this._ivl)
    }
  }

  evaluate() {
    let { count, calc, interval, ...props } = this.props
    let input = props as FireworksInput

    if (!input.parentNode) {
      if (this._ref) {
        input.parentNode = this._ref
      }
    }

    for (let i = 0; i < (count || 1); i++) {
      fx(calc ? calc(props, i) : input)
    }
  }
}

// Add type-safe `window.requestIdleCallback`
//
// From https://github.com/Microsoft/TypeScript/issues/21309
type RequestIdleCallbackHandle = any
type RequestIdleCallbackOptions = {
  timeout: number
}
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean
  timeRemaining: () => number
}

declare global {
  interface Window {
    requestIdleCallback: (
      callback: (deadline: RequestIdleCallbackDeadline) => void,
      opts?: RequestIdleCallbackOptions
    ) => RequestIdleCallbackHandle
    cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void
  }
}

export default Fireworks
