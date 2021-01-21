![Demo GIF of fireworks being rendered](./test/images/fireworks.gif)

<br/>
<p align="center">
  <strong><code>🎆 fireworks</code></strong>
</p>

<p align="center">
  Simple, zero-dependency library for<br/>
  rendering fireworks in JavaScript and React
</p>
<br/>

<p align="center">
  <a href="https://unpkg.com/fireworks@latest/lib/fireworks.js"><img src="https://img.badgesize.io/https://unpkg.com/fireworks@^2.2.2/lib/fireworks.js?compression=gzip&amp;label=fireworks"></a>
  <a href="https://www.npmjs.com/package/fireworks"><img src="https://img.shields.io/npm/v/fireworks.svg?maxAge=3600&label=fireworks&colorB=007ec6"></a>
</p>
<br/>

```typescript
import fx from 'fireworks'

fx({
  x: number // required
  y: number // required

  // optional
  count?: number
  colors?: string[]
  canvasWidth?: number
  canvasHeight?: number
  canvasTopOffset?: number
  canvasLeftOffset?: number
  bubbleSizeMinimum?: number
  bubbleSizeMaximum?: number
  bubbleSpeedMinimum?: number
  bubbleSpeedMaximum?: number
  particleTimeout?: number
  parentNode?: HTMLElement
})
```

## Installation

Install with npm:

```
$ npm install fireworks --save
```

Or with yarn:

```
$ yarn add fireworks
```

### Usage

Each time you call the `fireworks()` function, a canvas gets rendered with fireworks at position `(x,y)` like this:

```javascript
const fireworks = require('fireworks')

fireworks({
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  colors: ['#cc3333', '#4CAF50', '#81C784']
})
```

If you want render multiple, you can loop through randomly:

```javascript
import fx from 'fireworks'

let range = n => [...new Array(n)]

range(6).map(() =>
  fx({
    x: Math.random(window.innerWidth / 2) + window.innerWidth / 4,
    y: Math.random(window.innerWidth / 2) + window.innerWidth / 4,
    colors: ['#cc3333', '#4CAF50', '#81C784']
  })
)
```

For React apps, you can optionally use the component:

```javascript
// You need to install React/React-DOM
import { Fireworks } from 'fireworks/lib/react'

function App() {
  let fxProps = {
    count: 3,
    interval: 200,
    colors: ['#cc3333', '#4CAF50', '#81C784'],
    calc: (props, i) => ({
      ...props,
      x: (i + 1) * (window.innerWidth / 3) - (i + 1) * 100,
      y: 200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0)
    })
  }

  return (
    <div>
      <Fireworks {...fxProps} />
      <h1>Congrats!</h1>
    </div>
  )
}
```

#### NodeConf Fireworks

Looking for Eran Hammer's fireworks from NodeConf? Check out https://github.com/hueniverse/fireworks
