"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  title: string
  description: string
  languages: string[]
  repoUrl: string
}

export function ProjectCard({ title, description, languages, repoUrl }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Link href={repoUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
        <Card className="h-full border-blue-900/50 bg-gradient-to-br from-blue-950/30 to-black/80 overflow-hidden relative group cursor-pointer">
          {/* Glow effect on hover */}
          <div
            className={`absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isHovered ? "shadow-glow" : ""}`}
          />

          {/* Border glow effect */}
          <div className="absolute inset-0 border border-blue-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <CardHeader>
            <CardTitle className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300 flex items-center">
              {title}
              <Github className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </CardTitle>
            <CardDescription className="text-zinc-400">{description}</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {languages.map((lang) => (
                <Badge key={lang} variant="outline" className="bg-blue-950/30 text-blue-300 border-blue-800/50">
                  {lang}
                </Badge>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex justify-end items-center">
            <div className="text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Abrir no GitHub
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}

