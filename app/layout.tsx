import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Ofiseman — Carpintería y mobiliario con alma",
  description: "Diseñamos y construimos espacios con alma. Carpintería, mobiliario e interiorismo desde Madrid.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>
}
