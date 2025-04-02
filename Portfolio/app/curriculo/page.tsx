"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Award,
  Languages,
  Code,
  FileText,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function Curriculo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasRef2 = useRef<HTMLCanvasElement>(null)

  // Particle animation effect - similar to the one in hero-section
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
        this.color = `rgba(0, 120, 255, ${Math.random() * 0.7 + 0.3})`
        this.hasFall = Math.random() > 0.3
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
      canvas.height = window.innerHeight
      initParticles()
    }

    function initParticles() {
      particles = []
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

        // Gradient color based on position
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
      canvas.height = window.innerHeight

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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Função para simular o download do currículo em PDF
  const handleDownloadCV = () => {
    alert("Em um ambiente real, o currículo seria baixado em formato PDF.")
  }

  return (
    <div className="min-h-screen bg-[#050A1A] text-white pb-20 relative overflow-hidden">
      {/* Background effects */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-10 opacity-50" />
      <canvas ref={canvasRef2} className="fixed inset-0 w-full h-full opacity-20 z-10" />

      {/* Decorative elements */}
      <div className="fixed -bottom-40 -left-40 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
      <div className="fixed -top-40 -right-40 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div
        className="fixed top-1/4 left-1/4 w-40 h-40 rounded-full bg-blue-500/10 blur-xl pointer-events-none animate-pulse"
        style={{ animationDuration: "4s" }}
      />
      <div
        className="fixed bottom-1/3 right-1/4 w-60 h-60 rounded-full bg-blue-500/10 blur-xl pointer-events-none animate-pulse"
        style={{ animationDuration: "6s" }}
      />

      {/* Header com link de volta */}
      <div className="relative pt-24 pb-8 z-20">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-blue-300 hover:text-blue-100 transition-colors mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o início
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Currículo</h1>
        </div>
      </div>

      {/* Botão flutuante para download/compartilhar */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
          <button
            onClick={handleDownloadCV}
            className="relative flex items-center justify-center gap-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-4 rounded-full shadow-lg hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-105"
          >
            <FileText className="h-6 w-6" />
            <span className="absolute opacity-0 group-hover:opacity-100 group-hover:right-16 transition-all duration-300 whitespace-nowrap font-medium">
              Baixar PDF
            </span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 relative z-20">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Coluna da esquerda - Informações pessoais e habilidades */}
          <motion.div variants={fadeIn} className="lg:col-span-1">
            <Card className="border-blue-900/50 bg-gradient-to-br from-blue-950/40 to-black/80 backdrop-blur-sm overflow-hidden shadow-xl">
              <CardHeader className="pb-2 relative">
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400"></div>
                <CardTitle className="text-xl text-blue-400">Informações Pessoais</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex flex-col items-center mb-8">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 p-1 mb-6 overflow-hidden">
                    <Image
                      src="/images/profile-photo.png"
                      alt="Thales Ligoski dos Santos"
                      width={200}
                      height={200}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <h2 className="text-2xl font-bold">Thales Ligoski dos Santos</h2>
                  <p className="text-zinc-400">Desenvolvedor Front-end</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                    <div>
                      <p className="text-zinc-300">Curitiba, PR</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                    <div>
                      <p className="text-zinc-300">tp.ligoskitls@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                    <div>
                      <p className="text-zinc-300">(41) 99784-0155</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6 bg-blue-900/30" />

                <div>
                  <h3 className="text-lg font-semibold mb-5 flex items-center">
                    <Code className="h-5 w-5 text-blue-500 mr-2" />
                    Habilidades Técnicas
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-zinc-400 mb-2">HTML</p>
                      <div className="h-2 w-full bg-blue-950/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                          style={{ width: "90%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-zinc-400 mb-2">CSS3</p>
                      <div className="h-2 w-full bg-blue-950/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-zinc-400 mb-2">JavaScript</p>
                      <div className="h-2 w-full bg-blue-950/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                          style={{ width: "88%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-zinc-400 mb-2">Python</p>
                      <div className="h-2 w-full bg-blue-950/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-zinc-400 mb-2">.NET</p>
                      <div className="h-2 w-full bg-blue-950/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                          style={{ width: "70%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6 bg-blue-900/30" />

                <div>
                  <h3 className="text-lg font-semibold mb-5 flex items-center">
                    <Languages className="h-5 w-5 text-blue-500 mr-2" />
                    Idiomas
                  </h3>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-300">Português</span>
                      <span className="text-zinc-400">Nativo</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-zinc-300">Inglês</span>
                      <span className="text-zinc-400">Intermediário</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Coluna da direita - Experiência, educação, etc */}
          <motion.div variants={fadeIn} className="lg:col-span-2 space-y-8">
            {/* Experiência Profissional */}
            <Card className="border-blue-900/50 bg-gradient-to-br from-blue-950/40 to-black/80 backdrop-blur-sm overflow-hidden shadow-xl">
              <CardHeader className="pb-2 relative">
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400"></div>
                <CardTitle className="text-xl text-blue-400 flex items-center">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Experiência Profissional
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-8">
                <div className="relative pl-6 border-l border-blue-600/30">
                  <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[6.5px] top-1.5"></div>
                  <div className="mb-2 flex justify-between">
                    <h3 className="text-lg font-semibold">Militar Força Aérea</h3>
                    <Badge variant="outline" className="bg-blue-900/20 text-blue-300 border-blue-800/50">
                      <Calendar className="mr-1 h-3 w-3" /> 2020 - Atual
                    </Badge>
                  </div>
                  <h4 className="text-zinc-400 mb-3">Parte Administrativa</h4>
                  <p className="text-zinc-300">
                    Atuação na área administrativa voltada para publicação de boletim e processamento de pagamentos.
                    Responsável pela organização e gestão de documentos oficiais.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Educação */}
            <Card className="border-blue-900/50 bg-gradient-to-br from-blue-950/40 to-black/80 backdrop-blur-sm overflow-hidden shadow-xl">
              <CardHeader className="pb-2 relative">
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400"></div>
                <CardTitle className="text-xl text-blue-400 flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Educação
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-8">
                <div className="relative pl-6 border-l border-blue-600/30">
                  <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[6.5px] top-1.5"></div>
                  <div className="mb-2 flex justify-between">
                    <h3 className="text-lg font-semibold">Ensino Médio</h3>
                    <Badge variant="outline" className="bg-blue-900/20 text-blue-300 border-blue-800/50">
                      <Calendar className="mr-1 h-3 w-3" /> 2013 - 2022
                    </Badge>
                  </div>
                  <h4 className="text-zinc-400">Colégio Estadual Helena Kolody</h4>
                </div>

                <div className="relative pl-6 border-l border-blue-600/30">
                  <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[6.5px] top-1.5"></div>
                  <div className="mb-2 flex justify-between">
                    <h3 className="text-lg font-semibold">Ensino Fundamental</h3>
                    <Badge variant="outline" className="bg-blue-900/20 text-blue-300 border-blue-800/50">
                      <Calendar className="mr-1 h-3 w-3" /> 2008 - 2012
                    </Badge>
                  </div>
                  <h4 className="text-zinc-400">Colégio Municipal Antonio Andre Johnsson</h4>
                </div>
              </CardContent>
            </Card>

            {/* Certificações */}
            <Card className="border-blue-900/50 bg-gradient-to-br from-blue-950/40 to-black/80 backdrop-blur-sm overflow-hidden shadow-xl">
              <CardHeader className="pb-2 relative">
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400"></div>
                <CardTitle className="text-xl text-blue-400 flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Certificações
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-blue-900/30 mr-3">
                    <Award className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">.Net Básico</h3>
                    <p className="text-sm text-zinc-400">Instituto Federal de Minas Gerais - 40 horas - 2024</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-blue-900/30 mr-3">
                    <Award className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Python Básico</h3>
                    <p className="text-sm text-zinc-400">Instituto Federal de Minas Gerais - 40 horas - 2023</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-blue-900/30 mr-3">
                    <Award className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">JavaScript Avançado</h3>
                    <p className="text-sm text-zinc-400">Instituto Federal de Minas Gerais - 40 horas - 2023</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-blue-900/30 mr-3">
                    <Award className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">JavaScript Básico</h3>
                    <p className="text-sm text-zinc-400">Instituto Federal de Minas Gerais - 40 horas - 2023</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-blue-900/30 mr-3">
                    <Award className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">UOL Curso de Inglês 2.0 - Intermediate</h3>
                    <p className="text-sm text-zinc-400">Portal da Educação - 190 horas - 2021</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-blue-900/30 mr-3">
                    <Award className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">UOL Curso de Inglês 2.0 - Basic</h3>
                    <p className="text-sm text-zinc-400">Portal da Educação - 190 horas - 2021</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

