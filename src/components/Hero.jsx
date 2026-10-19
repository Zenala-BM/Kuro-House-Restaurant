function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[620px] items-center justify-center overflow-hidden bg-stone-900 bg-cover bg-center px-6 py-[100px] text-center text-white"
      style={{
        backgroundImage: "url('/images/KHExterior.jpg')",
      }}
    >
      {/* Dark overlay over the background image */}
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,23,23,0.82),rgba(23,23,23,0.48))]"
        aria-hidden="true"
      />

      {/* Hero text and button */}
      <div className="relative z-10 w-full max-w-[760px]">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-stone-200">
          Japanese Dining · Thoughtfully Crafted
        </p>

        <h1 className="mb-5 text-[clamp(3rem,7vw,6rem)] leading-tight font-normal tracking-[2px]">
          An Artful Taste of Japan
        </h1>

        <p className="mx-auto mb-8 max-w-[550px] text-[clamp(1rem,2vw,1.25rem)] leading-relaxed text-stone-200">
          Discover a thoughtful approach to Japanese dining,
          where tradition meets contemporary elegance.
        </p>

        <a
          href="#reservations"
          className="inline-block border border-red-700 bg-red-700 px-7 py-3.5 text-sm text-white transition-colors duration-200 hover:border-red-800 hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Book a Table
        </a>
      </div>
    </section>
  )
}

export default Hero
