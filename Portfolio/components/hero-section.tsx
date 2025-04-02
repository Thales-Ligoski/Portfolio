"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasRef2 = useRef<HTMLCanvasElement>(null)

  // Particle animation effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let particles: Particle[] = []
    let animationFrameId: number

    // Define Particle class first, before using it
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      hasFall: boolean

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        // Brighter particles with higher opacity
        this.color = `rgba(0, 120, 255, ${Math.random() * 0.7 + 0.3})`
        this.hasFall = Math.random() > 0.3 // 70% of particles having falling effect
      }

      update() {
        this.x += this.speedX

        // Add gravity for particles with hasFall property
        if (this.hasFall) {
          this.speedY += 0.01
        }

        this.y += this.speedY

        if (this.x < 0 || this.x > canvas.width) {
          this.speedX = -this.speedX
        }

        // Reset particles that fall below the canvas
        if (this.y > canvas.height) {
          if (this.hasFall) {
            this.y = 0
            this.speedY = Math.random() * 0.5
          } else {
            this.speedY = -this.speedY
          }
        }

        // Bounce particles at the top
        if (this.y < 0) {
          this.speedY = -this.speedY
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 0.8
      initParticles()
    }

    function initParticles() {
      particles = []
      // Significantly increased particle count for more density
      const particleCount = Math.floor((canvas.width * canvas.height) / 4000)

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    function connectParticles() {
      if (!ctx) return

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            // Brighter connections
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0, 150, 255, ${0.15 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      connectParticles()
      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Digital rain effect
  useEffect(() => {
    const canvas = canvasRef2.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    // Matrix digital rain effect
    class Column {
      x: number
      speed: number
      fontSize: number
      text: string

      constructor(x: number, fontSize: number) {
        this.x = x
        this.speed = 1 + Math.random() * 3
        this.fontSize = fontSize
        this.text = "10"
      }

      draw(ctx: CanvasRenderingContext2D, posY: number, index: number) {
        const chars = "0123456789ABCDEF".split("")
        const randomChar = chars[Math.floor(Math.random() * chars.length)]

        // Change character randomly
        if (Math.random() > 0.95) {
          this.text = randomChar
        }

        // Gradient color based on position - brighter
        const gradient = ctx.createLinearGradient(0, posY - 100, 0, posY)
        gradient.addColorStop(0, "rgba(0, 120, 255, 0)")
        gradient.addColorStop(0.8, "rgba(0, 170, 255, 0.8)")
        gradient.addColorStop(1, "rgba(100, 220, 255, 1)")

        ctx.fillStyle = gradient
        ctx.font = `${this.fontSize}px monospace`
        ctx.fillText(this.text, this.x, posY)
      }
    }

    let columns: Column[] = []
    let positions: number[] = []

    const initRain = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 0.8

      columns = []
      positions = []

      const fontSize = 14
      const columns_count = Math.floor(canvas.width / fontSize)

      for (let i = 0; i < columns_count; i++) {
        columns.push(new Column(i * fontSize, fontSize))
        positions.push(Math.random() * canvas.height)
      }
    }

    const drawRain = () => {
      if (!ctx) return

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < columns.length; i++) {
        positions[i] += columns[i].speed

        // Reset position when it goes off screen
        if (positions[i] > canvas.height && Math.random() > 0.975) {
          positions[i] = 0
        }

        columns[i].draw(ctx, positions[i], i)
      }

      animationFrameId = requestAnimationFrame(drawRain)
    }

    window.addEventListener("resize", initRain)
    initRain()
    drawRain()

    return () => {
      window.removeEventListener("resize", initRain)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="relative h-[80vh] flex items-center justify-center overflow-hidden" id="inicio">
      {/* Canvas elements for particles - now with higher z-index */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />
      <canvas ref={canvasRef2} className="absolute inset-0 w-full h-full opacity-40 z-10" />

      {/* Content with highest z-index to ensure it's visible over particles */}
      <div className="container mx-auto px-4 z-30 text-center relative">
        {/* Text with subtle shadow for readability against particles */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-md">
            <span className="text-white">Construindo o </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 relative">
              Futuro
              <div className="absolute -inset-1 bg-blue-500/20 blur-lg rounded-lg -z-10"></div>
              <div className="absolute -inset-2 bg-blue-500/10 blur-xl rounded-lg -z-20"></div>
              <div className="absolute -inset-3 bg-blue-500/5 blur-2xl rounded-lg -z-30"></div>
            </span>
          </h1>
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl text-zinc-200 max-w-3xl mx-auto mb-10 drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Desenvolvedor front-end apaixonado por criar interfaces modernas e responsivas com HTML, CSS3, JavaScript e
          PHP
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="https://github.com/Thales-Ligoski" target="_blank" rel="noopener noreferrer">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6">
              Ver Projetos <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="https://wa.me/5541997840155" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-950/50 px-8 py-6">
              Contato
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Additional decorative elements */}
      <div
        className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-blue-500/10 blur-xl pointer-events-none animate-pulse z-10"
        style={{ animationDuration: "4s" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-blue-500/10 blur-xl pointer-events-none animate-pulse z-10"
        style={{ animationDuration: "6s" }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full bg-blue-500/10 blur-xl pointer-events-none animate-pulse z-10"
        style={{ animationDuration: "5s" }}
      />
    </div>
  )
}

