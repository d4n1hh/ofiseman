"use client"

import { useState } from "react"
import { ArrowUpRight, Check, ChevronDown, Camera, Menu, X } from "lucide-react"

const projects = [
  { title: "Casa Senda", category: "Interiorismo integral", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85" },
  { title: "Línea Nórdica", category: "Mobiliario a medida", image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1200&q=85" },
  { title: "Estudio Alba", category: "Carpintería interior", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85" },
]

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(0)
  const [showForm, setShowForm] = useState(false)

  return (
    <main className="site-shell">
      <header className="nav-wrap">
        <a className="brand" href="#inicio" aria-label="Ofiseman, inicio"><span>OFI</span>SEMAN</a>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#estudio" onClick={() => setMenuOpen(false)}>El estudio</a>
          <a href="#proyectos" onClick={() => setMenuOpen(false)}>Proyectos</a>
          <a href="#proceso" onClick={() => setMenuOpen(false)}>Proceso</a>
          <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
        </nav>
        <div className="nav-actions"><a className="nav-cta" href="#contacto">Hablemos <ArrowUpRight size={15} /></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">{menuOpen ? <X /> : <Menu />}</button></div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">Carpintería · Mobiliario · Interiorismo</p>
          <h1>La madera<br /><em>cuenta historias.</em></h1>
          <p className="hero-desc">Diseñamos y construimos espacios con alma. Piezas honestas, hechas para durar y vivir contigo.</p>
          <a className="circle-link" href="#proyectos">Descubre nuestro trabajo <ArrowUpRight size={18} /></a>
        </div>
        <div className="hero-image-wrap"><img src="/ofiseman-hero.png" alt="Interior cálido con mobiliario de madera diseñado por Ofiseman" className="hero-image" /><div className="hero-image-label"><span>01</span><span>Materia viva</span></div></div>
        <div className="hero-side-note">Desde 1987 <span className="line" /> Madrid · España</div>
      </section>

      <section className="manifesto" id="estudio"><div className="section-number">01 / 04</div><div className="manifesto-content"><p className="eyebrow">Nuestro manifiesto</p><h2>Creemos en lo <span>bien hecho.</span></h2><p className="large-copy">En Ofiseman entendemos la madera como un lenguaje. Uno que habla de origen, de tacto y de tiempo. Combinamos el saber hacer de siempre con una mirada contemporánea para crear piezas que se convierten en parte de tu historia.</p><a className="text-link" href="#proceso">Conócenos mejor <ArrowUpRight size={17} /></a></div><div className="manifesto-stamp">O<br />F<br />I<br />S<br />E<br />M<br />A<br />N</div></section>

      <section className="projects" id="proyectos"><div className="section-heading"><div><p className="eyebrow">Una selección</p><h2>Proyectos con <em>carácter</em></h2></div><div className="project-count">0{activeProject + 1} <span>/ 03</span></div></div><div className="project-grid">{projects.map((project, index) => <button key={project.title} className={activeProject === index ? "project-card active" : "project-card"} onClick={() => setActiveProject(index)}><img src={project.image} alt={project.title} /><div className="project-overlay"><span>{project.category}</span><strong>{project.title}</strong><ArrowUpRight /></div></button>)}</div><div className="project-progress"><span className="progress-active" style={{ width: `${(activeProject + 1) * 33.33}%` }} /></div></section>

      <section className="process" id="proceso"><div className="section-number">03 / 04</div><div className="process-title"><p className="eyebrow">Cómo trabajamos</p><h2>Del primer trazo<br /><em>a tu espacio.</em></h2></div><div className="process-list">{["Escuchamos", "Diseñamos", "Construimos", "Cuidamos"].map((item, index) => <div className="process-row" key={item}><span>0{index + 1}</span><h3>{item}</h3><p>{["Entendemos tu forma de habitar y lo que hace único tu proyecto.", "Convertimos las ideas en planos, materiales y decisiones con sentido.", "Cada pieza toma forma en nuestro taller, con precisión y paciencia.", "Te acompañamos hasta el último detalle y mucho después."][index]}</p><ChevronDown size={20} /></div>)}</div></section>

      <section className="contact" id="contacto"><div className="contact-inner"><p className="eyebrow">¿Hablamos?</p><h2>Tu próximo espacio<br /><em>empieza aquí.</em></h2><button className="contact-button" onClick={() => setShowForm(true)}>Cuéntanos tu idea <ArrowUpRight /></button><div className="contact-meta"><span>hola@ofiseman.es</span><span>+34 91 555 01 87</span><span>Madrid · España</span></div></div><div className="contact-circle">O</div></section>

      <footer><a className="brand" href="#inicio"><span>OFI</span>SEMAN</a><p>Hecho con oficio desde 1987.</p><div className="footer-links"><a href="#proyectos">Instagram <Camera size={14} /></a><a href="#contacto">Privacidad</a></div></footer>

      {showForm && <div className="modal-backdrop" onClick={() => setShowForm(false)}><div className="modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowForm(false)} aria-label="Cerrar"><X /></button><p className="eyebrow">Cuéntanos</p><h2>Hagamos algo<br /><em>extraordinario.</em></h2><form onSubmit={(event) => { event.preventDefault(); setShowForm(false) }}><input required placeholder="Tu nombre" aria-label="Tu nombre" /><input required type="email" placeholder="Tu email" aria-label="Tu email" /><textarea required placeholder="Háblanos de tu proyecto" aria-label="Háblanos de tu proyecto" rows={4} /><button className="contact-button" type="submit">Enviar mensaje <Check /></button></form></div></div>}
    </main>
  )
}
