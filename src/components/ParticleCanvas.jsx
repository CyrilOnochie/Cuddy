import { useEffect, useRef } from 'react'
export default function ParticleCanvas() {
  const canvasRef = useRef()
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, particles = []
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.6,
        dx: (Math.random() - 0.5) * 0.22,
        dy: (Math.random() - 0.5) * 0.22,
        baseA: Math.random() * 0.4 + 0.15,
        flickerSpeed: Math.random() * 0.02 + 0.008,
        flickerOffset: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.6 ? 38 : 220,
      })
    }
    let t = 0
    const draw = () => {
      t += 1
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        // Flicker — opacity oscillates per particle for a glowing twinkle effect
        const flicker = (Math.sin(t * p.flickerSpeed + p.flickerOffset) + 1) / 2
        const alpha = p.baseA * (0.4 + flicker * 0.6)

        ctx.save()
        ctx.shadowBlur = 8
        ctx.shadowColor = `hsla(${p.hue},95%,65%,${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue},90%,70%,${alpha})`
        ctx.fill()
        ctx.restore()

        p.x += p.dx; p.y += p.dy
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
}
