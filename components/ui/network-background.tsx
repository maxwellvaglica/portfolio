'use client'
import { useRef, useEffect } from 'react'

const NetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    })

    interface Node {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
    }

    const nodes: Node[] = []
    const nodeCount = 50

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      ctx.strokeStyle = 'rgba(10, 200, 150, 0.2)'
      ctx.fillStyle = 'rgba(10, 200, 150, 0.5)'

      nodes.forEach((node) => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const update = () => {
      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1
      })
    }

    const animate = () => {
      draw()
      update()
      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 -z-10" />
}

export default NetworkBackground
