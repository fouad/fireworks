export type FireworksInput = {
  x: number
  y: number
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
}

export type Particle = {
  x: number
  y: number
  yVel: number
  speed: number
  radius: number
  opacity: number
  gravity: number
  rotation: number
  friction: number
  color: string
}

export default fireworks

const defaultColors = ['#2d80ee', '#1b4e8f', '#112e55']

export function fireworks(opts: FireworksInput) {
  if (!opts) {
    throw new Error('Missing options for fireworks')
  }

  const {
    x,
    y,
    canvasWidth = 300,
    canvasHeight = 300,
    particleTimeout = 1000,
    colors = defaultColors,
    bubbleSizeMinimum = 10,
    bubbleSizeMaximum = 25,
    bubbleSpeedMinimum = 6,
    bubbleSpeedMaximum = 10,
    count: bubbleCount = 25,
    canvasLeftOffset = canvasWidth / 2,
    canvasTopOffset = canvasHeight / 2,
    parentNode = document.body
  } = opts
  
  const ratio = window.devicePixelRatio
  const cvs = document.createElement('canvas')
  const ctx = cvs.getContext('2d')
  
  
  if (!ctx) {
    console.log(`fireworks: unable to get 2d canvas context`)
    return
  }
  
  cvs.style.zIndex = '100'
  cvs.style.position = 'absolute'
  cvs.style.pointerEvents = 'none'
  cvs.style.top = `${y - canvasTopOffset}px`
  cvs.style.left = `${x - canvasLeftOffset}px`
  cvs.style.height = `${canvasHeight}px`
  cvs.style.width = `${canvasWidth}px`
  cvs.height = canvasHeight * ratio
  cvs.width = canvasWidth * ratio
  parentNode.appendChild(cvs)
  
  let particles = []

  for (let i = 0; i < bubbleCount; i++) {
    particles.push({
      x: cvs.width / 2,
      y: cvs.height / 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      radius: randomRange(bubbleSizeMinimum, bubbleSizeMaximum),
      speed: randomRange(bubbleSpeedMinimum, bubbleSpeedMaximum),
      rotation: randomRange(0, 360, -1),
      opacity: randomRange(0, 0.5, -1),
      friction: 0.96,
      gravity: 0.05,
      yVel: 0,
    })
  }

  console.table(particles)

  render(cvs.width, cvs.height, particles, ctx)

  setTimeout(function() {
    parentNode.removeChild(cvs)
  }, particleTimeout)
}

function render(
  width: number,
  height: number,
  particles: Particle[],
  ctx: CanvasRenderingContext2D
) {
  requestAnimationFrame(() => {
    render(width, height, particles, ctx)
  })

  ctx.clearRect(0, 0, width, height)
  particles.forEach(function(p: Particle, i: number) {
    p.x += p.speed * Math.cos((p.rotation * Math.PI) / 180)
    p.y += p.speed * Math.sin((p.rotation * Math.PI) / 180)
    p.opacity -= 0.005
    p.speed *= p.friction
    p.radius *= p.friction
    p.yVel += p.gravity
    p.y += p.yVel

    if (p.opacity < 0 || p.radius < 0) {
      return
    }

    ctx.beginPath()
    ctx.globalAlpha = p.opacity
    ctx.fillStyle = p.color
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false)
    ctx.fill()
  })

  return ctx
}

function randomRange(a: number, b: number, c: number = 0) {
  return parseFloat(
    (Math.random() * ((a ? a : 1) - (b ? b : 0)) + (b ? b : 0)).toFixed(
      c > 0 ? c : 0
    )
  )
}
