"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
            // observer.unobserve(entry.target) // Add this to prevent flickering
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px" } // Adjusted observer settings
    )

    // Add this timeout to ensure elements are mounted
    const timer = setTimeout(() => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.observe(section)
      })
    }, 500)

    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "projects", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="intro"
          ref={(el) => (sectionsRef.current[0] = el)}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / {new Date().getFullYear()}</div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  M1 Media
                  <br />
                  <span className="text-muted-foreground">Net</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Digital agency crafting exceptional web experiences at the intersection of
                  <span className="text-foreground"> design</span>,<span className="text-foreground"> technology</span>,
                  and
                  <span className="text-foreground"> innovation</span>.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for projects
                  </div>
                  <div>Worldwide</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">SERVICES</div>
                <div className="space-y-2">
                  <div className="text-foreground">Web Development</div>
                  <div className="text-foreground">UI/UX Design</div>
                  <div className="text-foreground">Digital Strategy</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">TECHNOLOGIES</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "NextJS",
                    "TypeScript",
                    "Node.js",
                    "Tailwind",
                    "Python",
                    "Flutter",
                    "Dart",
                    "PostgreSQL",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>
        <section
          id="projects"
          ref={(el) => (sectionsRef.current[1] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0 translate-y-6" // Added translate-y-6 for smoother animation
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Projects</h2>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  name: "Smart PDF Chat",
                  description:
                    "This project is a web-based PDF question-answering chatbot powered by Deepseek v3 and R1's Language Learning Models (LLMs). Users can upload PDFs, ask questions related to the uploaded documents, and receive accurate responses.",
                  tech: ["React", "NextJS", "TypeScript", "Python", "ChromaDB", "Deepseek AI", "TailwindCSS"],
                  liveUrl: "https://llm-pdf-chatbot-with-deepseek-v3.vercel.app/",
                  githubUrl: "https://github.com/eldavido7/LLM-PDF-Chatbot-with-Deepseek-v3-and-r1",
                },
                // {
                //   name: "HR Assistant",
                //   description:
                //     "HR Assistant Bot using Deepseek v3. It also uses chromadb for data persistence across all file uploads and for future reference. A telegram bot (and whatsapp number) can also be generated and used to talk to the bot. Endpoints have also been provided to delete individual files from these chromadb collections, or clear out the collections entirely.",
                //   tech: ["Python", "ChromaDB", "Deepseek", "FastAPI"],
                //   liveUrl: "https://t.me/Hrlive_bot",
                //   githubUrl: "https://github.com/eldavido7/hr-assistant-backend",
                // },
                {
                  name: "Portfolio Tracker",
                  description: "Minimalist portfolio showcasing photography and design work with smooth animations.",
                  tech: ["NextJS", "React", "Typescript", "PostgreSQL", "TailwindCSS", "Prisma"],
                  liveUrl: "https://portfolio-data-structure.vercel.app",
                  githubUrl: "https://github.com/eldavido7/portfolio-tracker",
                },
                {
                  name: "Halamin Herbal Store/Admin Dashboard",
                  description:
                    "Halamin Herbal is a full-featured herbal products eCommerce system built with Next.js, Prisma, PostgreSQL, Neon, Cloudinary, and Paystack. It includes a powerful admin dashboard and a lightweight public storefront. Customers can place orders and receive real-time email updates as their order progresses.",
                  tech: ["React", "NextJS", "PostgreSQL", "TypeScript", "TailwindCSS", "Cloudinary", "Prisma"],
                  liveUrl: "https://halaminherbal.vercel.app/",
                  githubUrl: "https://github.com/eldavido7/ecommerce-dashboard",
                },
                {
                  name: "Ride Along Android App",
                  description:
                    "A Flutter-based mobile application for real-time driver location tracking, trip management, and user profile management. The app allows drivers to start and end trips, share live locations, view trip history, and manage their profiles.",
                  tech: ["Flutter", "Dart", "NextJS", "TypeScript", "PostgreSQL", "Google Maps API", "Prisma"],
                  liveUrl: "https://drive.google.com/drive/folders/17pRf8xjqD95-XsYFUC3kFPOLol-3O4Zc?usp=sharing",
                  githubUrl: "https://github.com/eldavido7/driver_tracker",
                },
                {
                  name: "Hospital Management System",
                  description:
                    "This is a full-featured Hospital Management System (HMS) designed for local server deployment in a mid-sized hospital. Backend is simulated and data is persisted using zustand store until refreshed.",
                  tech: ["React", "NextJS", "PostgreSQL", "TypeScript", "TailwindCSS"],
                  liveUrl: "https://hospital-management-system-six-gules.vercel.app/",
                  githubUrl: "https://github.com/eldavido7/hospital-management-system",
                },
                {
                  name: "IDEBS Store/Dashboard",
                  description:
                    "This is a full-featured clothing eCommerce system built with Next.js, Prisma, PostgreSQL, Neon, Cloudinary, and Paystack. It includes a powerful admin dashboard and a lightweight public storefront. Customers can place orders and receive real-time email updates as their order progresses.",
                  tech: ["React", "NextJS", "PostgreSQL", "TypeScript", "TailwindCSS", "Cloudinary", "Prisma"],
                  liveUrl: "https://hospital-management-system-six-gules.vercel.app/",
                  githubUrl: "https://github.com/eldavido7/hospital-management-system",
                },
              ].map((project, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{project.name}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:border-muted-foreground/50 hover:bg-muted/20 transition-all duration-300"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          Live Site
                        </Link>
                      )}
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:border-muted-foreground/50 hover:bg-muted/20 transition-all duration-300"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        GitHub
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-6 flex flex-wrap gap-2 items-start content-start mt-2 lg:mt-0">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs border border-border rounded-full text-muted-foreground hover:border-muted-foreground/50 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="connect" ref={(el) => (sectionsRef.current[2] = el)} className="py-20 sm:py-32 opacity-0">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Always interested in new opportunities, collaborations, and conversations about technology and design.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:contact@m1media.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">contact@m1media.net</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Instagram", handle: "@m1medianet", url: "#" },
                  { name: "Twitter", handle: "@m1medianet", url: "#" },
                  // { name: "HubSpot Community", handle: "@m1medianet", url: "#" },
                  { name: "LinkedIn", handle: "m1medianet", url: "#" },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} M1 Media Net. All rights reserved.</div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              <button
                title="open"
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
