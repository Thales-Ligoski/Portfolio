"use client"

import { motion } from "framer-motion"
import { Code, Database, CheckCircle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SkillsSection() {
  const frontendSkills = [
    { name: "HTML", level: 90 },
    { name: "CSS3", level: 85 },
    { name: "JavaScript", level: 88 },
    { name: "PHP", level: 80 },
  ]

  const backendSkills = [{ name: "MySQL", level: 85 }]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="container mx-auto px-4 py-20 relative overflow-hidden" id="habilidades">
      {/* Additional decorative elements */}
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />

      <div className="mb-12 text-center relative z-10">
        <h2 className="text-3xl font-bold mb-4 text-blue-500">Minhas Habilidades</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Tecnologias e ferramentas que utilizo para criar soluções eficientes e escaláveis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {/* Frontend Skills */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={container}>
          <Card className="border-blue-900/50 bg-gradient-to-br from-blue-950/30 to-black/80 h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-full bg-blue-900/30">
                  <Code className="h-5 w-5 text-blue-400" />
                </div>
                <CardTitle className="text-xl text-blue-400">Front-end</CardTitle>
              </div>
              <CardDescription className="text-zinc-400">
                Tecnologias para desenvolvimento de interfaces e experiências de usuário
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {frontendSkills.map((skill) => (
                  <motion.div key={skill.name} variants={item} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        <span className="font-medium text-white">{skill.name}</span>
                      </div>
                      <span className="text-sm text-zinc-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-blue-950/30 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Backend Skills */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={container}>
          <Card className="border-blue-900/50 bg-gradient-to-br from-blue-950/30 to-black/80 h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-full bg-blue-900/30">
                  <Database className="h-5 w-5 text-blue-400" />
                </div>
                <CardTitle className="text-xl text-blue-400">Back-end</CardTitle>
              </div>
              <CardDescription className="text-zinc-400">
                Tecnologias para desenvolvimento de servidores, APIs e bancos de dados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {backendSkills.map((skill) => (
                  <motion.div key={skill.name} variants={item} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        <span className="font-medium text-white">{skill.name}</span>
                      </div>
                      <span className="text-sm text-zinc-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-blue-950/30 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

