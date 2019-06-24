import { Fireworks } from '../lib/react'

const root = document.querySelector('#root')

ReactDOM.render(
  React.createElement(Fireworks, {
    count: 10,
    interval: 1200,
    colors: ['#47B881', '#1070CA', '#00783E'],
    calc: (props, i) => ({
      ...props,
      x: (window.innerWidth / 3) * 2 - ((i + 1) % 5) * 100,
      y: 200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0)
    })
  }),
  root
)
