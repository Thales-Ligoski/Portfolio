import Link from "next/link"
import { GitHubLogoIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { HeroSection } from "@/components/hero-section"
import { NavBar } from "@/components/nav-bar"
import { SkillsSection } from "@/components/skills-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />
      <HeroSection />

      <section className="container mx-auto px-4 py-20" id="projetos">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-500">Projetos em Destaque</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Uma amostra dos meus trabalhos recentes e contribuições open source. Estes projetos representam minhas
            habilidades e paixão por criar soluções inovadoras.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard
            title="Soluções em Tecnologia"
            description="Plataforma completa para gerenciamento de serviços de TI e suporte técnico empresarial"
            languages={["JavaScript", "HTML", "CSS"]}
            repoUrl="https://github.com/Thales-Ligoski/Up-Solu-es-em-Tecnologia"
          />

          <ProjectCard
            title="Habilitar Mais Vida"
            description="Sistema web para gestão de serviços de saúde e agendamento de consultas online"
            languages={["PHP", "MySQL", "Bootstrap"]}
            repoUrl="https://github.com/Thales-Ligoski/habilitar-mais-vida"
          />

          <ProjectCard
            title="Portfólio Futurista"
            description="Portfólio profissional com design futurista, animações avançadas e efeitos visuais em React e Framer Motion"
            languages={["TypeScript", "React", "Next.js"]}
            repoUrl="https://github.com/Thales-Ligoski/Portfolio"
          />
        </div>

        <div className="mt-16 text-center">
          <Link href="https://github.com/Thales-Ligoski" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="group border-blue-500 text-blue-500 hover:bg-blue-950">
              Ver Todos os Projetos no GitHub
              <GitHubLogoIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      <SkillsSection />

      <footer className="border-t border-blue-900/30 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-zinc-500">
          <p>Desenvolvido por Thales Santos</p>
        </div>
      </footer>
    </div>
  )
}

