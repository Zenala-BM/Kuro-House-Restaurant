function Footer() {
  return (
    <footer
      id="footer"
      className="bg-stone-900 px-[5%] py-12 text-[#f3eadc]"
    >
      
        <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-10 sm:flex-row sm:gap-12">
        {/* Brand */}
        <div className="min-w-0 flex-1">
            <h2 className="mb-4 text-2xl font-normal">Kuro House</h2>
            <p className="text-[#b8ad9d]">
            Thoughtfully Crafted. Meant to be shared.
            </p>
        </div>

        {/* Operating hours */}
        <div className="min-w-0 flex-1">
            <h3 className="mb-4 text-lg font-normal">Operating Hours</h3>
            <p className="my-[0.4rem]">Monday - Thursday: 12:00 - 21:00</p>
            <p className="my-[0.4rem]">Friday - Saturday: 12:00 - 22:00</p>
            <p className="my-[0.4rem]">Sunday: 12:00 - 18:00</p>
        </div>

        {/* Location */}
        <div className="min-w-0 flex-1">
            <h3 className="mb-4 text-lg font-normal">Find Us</h3>
            <p className="my-[0.4rem]">42 Yashiori Avenue</p>
            <p className="my-[0.4rem]">Milan, Italy</p>
        </div>
        </div>


      
        <div className="mx-auto mt-8 max-w-7xl border-t border-[#b8ad9d]/30 pt-4 text-center">
        <p className="text-sm text-[#b8ad9d]">
            &copy; 2026 Kuro House. All rights reserved.
        </p>
        </div>

    </footer>
  )
}

export default Footer
