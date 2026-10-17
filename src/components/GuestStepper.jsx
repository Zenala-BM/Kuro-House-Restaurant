function GuestStepper({ guests, onGuestsChange }) {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => onGuestsChange(Math.max(1, guests - 1))}
        disabled={guests <= 1}
        aria-label="Decrease number of guests"
        className="flex h-10 w-10 items-center justify-center border border-[#d7cbb8] text-stone-700 transition-colors hover:border-red-700 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        −
      </button>

      <span className="min-w-20 text-center text-stone-900">
        {guests} {guests === 1 ? 'guest' : 'guests'}
      </span>

      <button
        type="button"
        onClick={() => onGuestsChange(Math.min(10, guests + 1))}
        disabled={guests >= 10}
        aria-label="Increase number of guests"
        className="flex h-10 w-10 items-center justify-center border border-[#d7cbb8] text-stone-700 transition-colors hover:border-red-700 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        +
      </button>
    </div>
  )
}

export default GuestStepper