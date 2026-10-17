import { useState } from 'react'
import menuItems from '../data/menuData'
import MenuItem from './MenuItem'

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const filteredItems =
  selectedCategory === 'All'
    ? menuItems
    : menuItems.filter((item) => item.category === selectedCategory)
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
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {['All', 'Starters', 'Main', 'Desserts'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`border px-5 py-2 text-sm transition-colors ${
                selectedCategory === category
                  ? 'border-red-800 bg-red-800 text-white'
                  : 'border-stone-300 bg-transparent text-stone-700 hover:border-red-800 hover:text-red-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <article
            key={item.id}
            className="border border-[#e4dbcf] border-t-[3px] border-t-red-700 bg-white px-6 py-[30px]"
          >
            <MenuItem item={item} />
          </article>
        ))}
      </div>
    </section>
  )
}

export default Menu
