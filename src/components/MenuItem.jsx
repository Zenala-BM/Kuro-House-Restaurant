function MenuItem({ item }) {
  return (
    <article className="flex items-start justify-between gap-4 border-b border-stone-200 py-[18px] last:border-b-0 last:pb-0">
      <div className="min-w-0">
        <h4 className="mb-2 text-lg font-normal">
          {item.name}
        </h4>

        <p className="text-sm leading-relaxed text-stone-600">
          {item.description}
        </p>
      </div>

      <span className="shrink-0 font-bold text-red-700">
        {item.price}
      </span>
    </article>
  )
}

export default MenuItem
