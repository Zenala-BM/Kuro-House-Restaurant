
function MenuItem({ item }) {
  return (
    <article className="flex items-start gap-4 border-b border-stone-200 py-[18px] last:border-b-0 last:pb-0">
      <img
        src={item.image}
        alt={item.name}
        className="h-24 w-24 shrink-0 rounded-md object-cover"
      />

      <div className="min-w-0 flex-1">
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
