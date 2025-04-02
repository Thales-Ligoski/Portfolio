"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Determine active section based on scroll position
      const sections = {
        inicio: 0,
        projetos: document.getElementById("projetos")?.offsetTop - 100,
        habilidades: document.getElementById("habilidades")?.offsetTop - 100,
      }

      const scrollPosition = window.scrollY + 100

      if (scrollPosition >= (sections.habilidades || 0)) {
        setActiveSection("habilidades")
      } else if (scrollPosition >= (sections.projetos || 0)) {
        setActiveSection("projetos")
      } else {
        setActiveSection("inicio")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Início", href: "/", id: "inicio" },
    { name: "Projetos", href: "/#projetos", id: "projetos" },
    { name: "Habilidades", href: "/#habilidades", id: "habilidades" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            <span className="text-blue-500">&lt;</span>
            Dev
            <span className="text-blue-500">/&gt;</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors ${
                  activeSection === item.id
                    ? "text-blue-400 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-0.5 after:bg-blue-500"
                    : "text-zinc-400 hover:text-blue-400"
                }`}
                target={item.name === "Contato" ? "_blank" : undefined}
                rel={item.name === "Contato" ? "noopener noreferrer" : undefined}
              >
                {item.name}
              </Link>
            ))}

            <Link href="/curriculo">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Currículo</Button>
            </Link>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex flex-col p-4"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-10">
              <Link href="/" className="text-2xl font-bold text-white">
                <span className="text-blue-500">&lt;</span>
                Dev
                <span className="text-blue-500">/&gt;</span>
              </Link>

              <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
                <span className="sr-only">Fechar menu</span>
              </Button>
            </div>

            <nav className="flex flex-col gap-6 items-center justify-center flex-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`text-2xl transition-colors ${
                      activeSection === item.id ? "text-blue-400" : "text-zinc-400 hover:text-blue-400"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    target={item.name === "Contato" ? "_blank" : undefined}
                    rel={item.name === "Contato" ? "noopener noreferrer" : undefined}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Link href="/curriculo" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-4">Currículo</Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

