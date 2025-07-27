import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css" // <--- Asegúrate de que esta línea esté presente

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dieta Integral - Comienza tu camino saludable",
  description: "Pequeños cambios, grandes resultados. Descubre cómo transformar tu salud con la dieta integral.",
  keywords: ["dieta", "salud", "nutrición", "bienestar", "alimentación saludable"],
  authors: [{ name: "Dieta Integral" }],
  openGraph: {
    title: "Dieta Integral - Comienza tu camino saludable",
    description: "Pequeños cambios, grandes resultados. Descubre cómo transformar tu salud con la dieta integral.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}



// import type { Metadata } from "next";
// import "./globals.css";

// export const metadata: Metadata = {
//   title: "Dieta Integral",
//   description: "Sitio web de Dieta Integral",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="es">
//       <body>
//         {children}
//       </body>
//     </html>
//   );
// }
