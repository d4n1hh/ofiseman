"use client"

import { useEffect, useState } from "react"
import { ArrowDown, ArrowUpRight, Camera, Check, Menu, X } from "lucide-react"

const scenes = [
  { number: "01", eyebrow: "El origen", title: "Materia\ncon memoria.", description: "Madera seleccionada, manos expertas y una forma de hacer que respeta el tiempo.", image: "/ofiseman-hero.png", align: "left" },
  { number: "02", eyebrow: "El espacio", title: "Diseñamos\npara vivir.", description: "Interiores que no piden permiso. Se sienten, se habitan y envejecen contigo.", image: "/ofiseman-space.png", align: "right" },
  { number: "03", eyebrow: "El detalle", title: "Lo esencial\nse nota.", description: "Cada unión, cada veta, cada sombra. La belleza está en lo que permanece.", image: "/ofiseman-detail.png", align: "left" },
]

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    let frame = 0
    const updateScenes = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        document.querySelectorAll<HTMLElement>(".image-scene").forEach((scene) => {
          const rect = scene.getBoundingClientRect()
          const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)))
          scene.style.setProperty("--scene-progress", progress.toFixed(3))
        })
      })
    }
    updateScenes()
    window.addEventListener("scroll", updateScenes, { passive: true })
    window.addEventListener("resize", updateScenes)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", updateScenes)
      window.removeEventListener("resize", updateScenes)
    }
  }, [])

  return (
    <main className="site-shell">
      <header className="floating-nav"><a className="brand" href="#inicio" aria-label="Ofiseman, inicio"><span>OFI</span>SEMAN</a><nav className={menuOpen ? "nav-links open" : "nav-links"}><a href="#historia" onClick={() => setMenuOpen(false)}>Historia</a><a href="#espacios" onClick={() => setMenuOpen(false)}>Espacios</a><a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a></nav><div className="nav-right"><span>Madrid · 1987</span><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">{menuOpen ? <X /> : <Menu />}</button></div></header>

      <section className="intro-scene" id="inicio"><img src="/ofiseman-hero.png" alt="Interior de madera cálido y contemporáneo" /><div className="scene-wash" /><div className="intro-content"><p className="kicker">Ofiseman / Carpintería e interiorismo</p><h1>La madera<br /><em>cuenta historias.</em></h1><p className="intro-copy">Diseñamos espacios con alma y construimos piezas para toda una vida.</p></div><a className="scroll-cue" href="#historia"><span>Scroll para descubrir</span><ArrowDown /></a><span className="scene-index">01 — 03</span></section>

      <div className="scene-stack" id="historia">{scenes.map((scene) => <section className={`image-scene ${scene.align}`} key={scene.number} style={{ backgroundImage: `url(${scene.image})` }}><div className="scene-shade" /><div className="scene-content"><span className="scene-number">{scene.number} / OFISEMAN</span><p className="kicker">{scene.eyebrow}</p><h2>{scene.title.split("\n").map((line, index) => <span key={line}>{line}{index === 0 && <br />}</span>)}</h2><p className="scene-description">{scene.description}</p><a className="round-arrow" href="#contacto" aria-label={`Descubre ${scene.eyebrow}`}><ArrowUpRight /></a></div><span className="image-caption">Ofiseman — Estudio de materia</span></section>)}</div>

      <section className="closing-scene" id="espacios"><div className="closing-backdrop" /><div className="closing-content"><p className="kicker">Una forma de hacer</p><h2>Hecho para<br /><em>quedarse.</em></h2><p>Desde un mueble hasta un espacio completo. Hablamos de tu idea, dibujamos el camino y la hacemos realidad.</p><button className="outline-button" onClick={() => setShowForm(true)}>Cuéntanos tu proyecto <ArrowUpRight /></button></div></section>

      <footer id="contacto"><a className="brand" href="#inicio"><span>OFI</span>SEMAN</a><div><span>hola@ofiseman.es</span><span>+34 91 555 01 87</span></div><a href="#espacios">Instagram <Camera /></a></footer>

      {showForm && <div className="modal-backdrop" onClick={() => setShowForm(false)}><div className="modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowForm(false)} aria-label="Cerrar"><X /></button><p className="kicker">Cuéntanos</p><h2>Hagamos algo<br /><em>extraordinario.</em></h2><form onSubmit={(event) => { event.preventDefault(); setShowForm(false) }}><input required placeholder="Tu nombre" aria-label="Tu nombre" /><input required type="email" placeholder="Tu email" aria-label="Tu email" /><textarea required placeholder="Háblanos de tu proyecto" aria-label="Tu proyecto" rows={4} /><button className="outline-button" type="submit">Enviar mensaje <Check /></button></form></div></div>}
    </main>
  )
}
