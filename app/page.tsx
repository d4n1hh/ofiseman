"use client"

import { useEffect, useState } from "react"
import { ArrowDown, ArrowUpRight, Check, Menu, MoveDown, X } from "lucide-react"

const chapters = [
  { id: "01", label: "La veta", title: "Todo empieza\nen el árbol.", copy: "Seleccionamos cada tablón por su dibujo, su peso y la historia que todavía guarda.", image: "/ofiseman-space.png", material: "Nogal · 04.2 mm" },
  { id: "02", label: "El corte", title: "Medimos\nlo invisible.", copy: "La precisión no se ve. Se nota cuando una pieza encaja como si siempre hubiera estado ahí.", image: "/ofiseman-detail.png", material: "Roble · Unión 01" },
  { id: "03", label: "El lugar", title: "La casa\nse despierta.", copy: "No fabricamos objetos aislados. Construimos el escenario de tus días.", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2200&q=90", material: "Interior · Madrid 2026" },
]

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const sections = [...document.querySelectorAll<HTMLElement>("[data-chapter]")]
      let closest = 0
      sections.forEach((section, index) => { if (Math.abs(section.getBoundingClientRect().top - window.innerHeight * .32) < Math.abs(sections[closest].getBoundingClientRect().top - window.innerHeight * .32)) closest = index })
      setActive(closest)
      document.documentElement.style.setProperty("--scroll-angle", `${window.scrollY * .035}deg`)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return <main className="workshop">
    <header className={menuOpen ? "workshop-nav open" : "workshop-nav"}><a className="brand" href="#inicio"><span>OFI</span>SEMAN</a><nav><a href="#materia" onClick={() => setMenuOpen(false)}>Materia</a><a href="#proceso" onClick={() => setMenuOpen(false)}>Proceso</a><a href="#contacto" onClick={() => setMenuOpen(false)}>Encargos</a></nav><div className="nav-code">OF / 1987 / MAD <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">{menuOpen ? <X /> : <Menu />}</button></div></header>

    <section className="workshop-hero" id="inicio"><div className="blueprint-grid" /><div className="hero-copy"><p className="work-label">Ofiseman / Taller de carpintería</p><h1>La casa<br /><em>se construye.</em></h1><p>Diseñamos lugares con la paciencia de quien trabaja la madera: capa a capa, detalle a detalle.</p><a className="enter-link" href="#materia">Entrar en el taller <ArrowDown /></a></div><div className="hero-plank"><span>OFI—01</span><span>Escala 1:1</span></div><div className="hero-coordinates">40°24&apos;N<br />3°42&apos;W</div></section>

    <section className="manifesto-strip" id="materia"><span>01 — LA MATERIA</span><p>Antes de ser mueble, la madera es paisaje.</p><MoveDown /></section>

    <div className="chapter-stack">{chapters.map((chapter, index) => <section className="chapter" data-chapter key={chapter.id} style={{ zIndex: index + 1 }}><div className="chapter-image" style={{ backgroundImage: `url(${chapter.image})` }} /><div className="grain-overlay" /><div className="chapter-copy"><span className="chapter-code">{chapter.id} / 03</span><p className="work-label">{chapter.label}</p><h2>{chapter.title.split("\n").map((line, i) => <span key={line}>{line}{i === 0 && <br />}</span>)}</h2><p>{chapter.copy}</p><a className="chapter-link" href="#contacto">Ver el detalle <ArrowUpRight /></a></div><div className="material-tag"><span>{chapter.material}</span><i /></div></section>)}</div>

    <section className="process-blueprint" id="proceso"><div className="blueprint-grid" /><div className="process-heading"><p className="work-label">El proceso</p><h2>Del plano<br /><em>a la vida.</em></h2></div><div className="process-steps">{["Escuchar", "Dibujar", "Cortar", "Instalar"].map((step, index) => <div className="step" key={step}><span>0{index + 1}</span><strong>{step}</strong><p>{["Tu forma de habitar es nuestro primer material.", "Convertimos intuiciones en proporciones.", "El taller traduce el dibujo en materia.", "La pieza encuentra su lugar definitivo."][index]}</p></div>)}</div></section>

    <section className="final-room" id="contacto"><div className="final-image" /><div className="final-copy"><p className="work-label">Último paso</p><h2>¿Qué vamos<br /><em>a construir?</em></h2><button className="work-button" onClick={() => setShowForm(true)}>Abrir encargo <ArrowUpRight /></button></div></section>
    <footer><a className="brand" href="#inicio"><span>OFI</span>SEMAN</a><span>Hecho con oficio desde 1987</span><span>hola@ofiseman.es</span></footer>

    {showForm && <div className="modal-backdrop" onClick={() => setShowForm(false)}><div className="modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowForm(false)} aria-label="Cerrar"><X /></button><p className="work-label">Nuevo encargo</p><h2>Hagamos<br /><em>algo único.</em></h2><form onSubmit={(event) => { event.preventDefault(); setShowForm(false) }}><input required placeholder="Tu nombre" aria-label="Tu nombre" /><input required type="email" placeholder="Tu email" aria-label="Tu email" /><textarea required placeholder="Cuéntanos qué quieres construir" aria-label="Tu proyecto" rows={4} /><button className="work-button" type="submit">Enviar <Check /></button></form></div></div>}
    <div className="scroll-meter"><span style={{ height: `${((active + 1) / chapters.length) * 100}%` }} /><b>0{active + 1}</b></div>
  </main>
}
