
import menuItems from '../data/menuData'
import MenuItem from './MenuItem'

const categories = ['Starters', 'Main', 'Desserts']

function Menu() {
  return (
    <section id="menu" className="bg-[#f3eadc] px-6 py-[90px]">
      <div className="mx-auto mb-12 max-w-[650px] text-center">
        <p className="eyebrow text-xs font-bold tracking-[3px] text-red-700">
          A TASTE OF KURO
        </p>

        <h2 className="my-4 text-[clamp(2rem,4vw,3rem)] font-normal">
          Our Menu
        </h2>

        <p className="text-stone-600">
          Japanese-inspired favourites, prepared with care.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <article
            key={category}
            className="border border-[#e4dbcf] border-t-[3px] border-t-red-700 bg-white px-6 py-[30px]"
          >
            <h3 className="mb-6 border-b border-[#e4dbcf] pb-4 text-2xl font-normal">
              {category}
            </h3>

            {menuItems
              .filter((item) => item.category === category)
              .map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
          </article>
        ))}
      </div>
    </section>
  )
}

export default Menu
