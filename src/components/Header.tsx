// import Image from 'next/image';
// import Link from 'next/link';

// const Header = () => {
//   return (
//     <header className="bg-white shadow-md">
//       <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//         <div className="flex items-center">
//           <Link href="/" className="flex items-center">
//             <Image src="/Logo-Dieta-Integral.png" alt="Dieta Integral Logo" width={40} height={40} style={{ height: 'auto' }} />
//             <span className="ml-3 text-xl font-bold text-gray-800">Dieta Integral</span>
//           </Link>
//         </div>
//         <nav className="hidden md:flex items-center space-x-6">
//           <Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link>
//           <Link href="/articulos" className="text-gray-600 hover:text-gray-800">Artículos</Link>
//           <Link href="/sobre-mi" className="text-gray-600 hover:text-gray-800">Sobre mí</Link>
//           <Link href="/contacto" className="text-gray-600 hover:text-gray-800">Contacto</Link>
//         </nav>
//         <div className="md:hidden">
//           {/* Mobile menu button */}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, MessageCircle, Phone, Youtube, Instagram, Leaf } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Artículos", href: "/articulos" },
    { name: "Sobre mi", href: "/sobre-mi" },
    { name: "Contacto", href: "/contacto" },
  ]

  const socialLinks = [
    {
      name: "Telegram",
      href: "https://t.me/dietaintegral",
      icon: MessageCircle,
      color: "hover:text-blue-500",
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/1234567890",
      icon: Phone,
      color: "hover:text-green-600",
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@dietaintegral",
      icon: Youtube,
      color: "hover:text-red-600",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/dietaintegral",
      icon: Instagram,
      color: "hover:text-pink-600",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Dieta Integral</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Social Links - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-600 ${social.color} transition-colors duration-200`}
                  aria-label={social.name}
                >
                  <IconComponent className="w-5 h-5" />
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-6 mt-6">
                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-gray-700 hover:text-green-600 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Mobile Social Links */}
                <div className="border-t pt-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Síguenos</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => {
                      const IconComponent = social.icon
                      return (
                        <Link
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-gray-600 ${social.color} transition-colors duration-200`}
                          aria-label={social.name}
                        >
                          <IconComponent className="w-6 h-6" />
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
