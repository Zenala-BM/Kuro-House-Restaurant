function OurStory() {
  return (
    <section id="story" className="bg-stone-900 px-6 py-[90px] text-[#f3eadc]">
      
<div className="mx-auto flex max-w-[1100px] flex-col items-center gap-10 md:flex-row md:gap-16">
  {/* Restaurant image */}
  <div className="w-full min-w-0 flex-1">
    <img
      src="/images/KHInterior.jpg"
      alt="Kuro House Interior"
      width="800"
      height="600"
      className="aspect-[4/3] w-full object-cover"
    />
  </div>

  {/* Our story text */}
  <div className="w-full min-w-0 flex-1 py-6">
    <p className="eyebrow text-xs font-bold tracking-[3px] text-red-700">
      OUR PHILOSOPHY
    </p>

    <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-normal">
      A Place to Unwind
    </h2>

    <p className="mt-4 max-w-[500px] leading-[1.9] text-[#d2c9bd]">
      At Kuro House, we bring people together over comforting
      Japanese-inspired dishes and the simple pleasure of a shared meal.
    </p>
  </div>
</div>

    </section>
  )
}

export default OurStory
