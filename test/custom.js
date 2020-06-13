import { fireworks } from '../lib/fireworks'

let range = n => [...new Array(n)].map((_, i) => i)
let r = () =>
  range(10).map(i =>
    fireworks({
      canvasWidth: 800,
      canvasHeight: 800,
      particleTimeout: 1200,
      bubbleSizeMinimum: 20,
      bubbleSizeMaximum: 30,
      bubbleSpeedMinimum: 10,
      bubbleSpeedMaximum: 15,
      colors: ['#e40624', '#2c2954', '#c0c1d9'],
      x: (window.innerWidth / 3) * 2 - ((i + 1) % 5) * 100,
      y: 200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0)
    })
  )

r()
setInterval(() => r(), 2000)
