import { fireworks } from '../lib/fireworks'

let range = n => [...new Array(n)].map((_, i) => i)
let r = () =>
  range(10).map(i =>
    fireworks({
      colors: ['#47B881', '#1070CA', '#00783E'],
      x: (window.innerWidth / 3) * 2 - ((i + 1) % 5) * 100,
      y: 200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0)
    })
  )

r()
setTimeout(() => r(), 2000)
