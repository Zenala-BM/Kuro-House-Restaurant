
import { useState } from 'react'

function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Menu', href: '#menu' },
    { label: 'Our Story', href: '#story' },
    { label: 'Reservations', href: '#reservations' },
    { label: 'Visit Us', href: '#footer' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-stone-700/50 bg-stone-950 text-stone-100">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-4 md:flex-nowrap md:gap-6"
      >
        <a
          href="#home"
          className="whitespace-nowrap font-serif text-2xl font-bold tracking-widest"
        >
          KURO HOUSE
        </a>

        <button
          type="button"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-stone-500 md:hidden"
        >
          <span className="h-0.5 w-5 bg-current" />
          <span className="h-0.5 w-5 bg-current" />
          <span className="h-0.5 w-5 bg-current" />
        </button>

        <ul
          id="primary-navigation"
          className={`${isOpen ? 'flex' : 'hidden'} w-full flex-col gap-1 md:flex md:w-auto md:flex-row md:items-center md:gap-6`}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 transition-colors hover:text-amber-200 md:py-2"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
