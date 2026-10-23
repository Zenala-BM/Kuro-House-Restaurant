import { useState } from 'react'
import GuestStepper from './GuestStepper'
import { apiRequest } from '../api/client'

function Reservations() {
  const [message, setMessage] = useState('') 
  const [guests, setGuests] = useState(2)
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <section
      id="reservations"
      className="bg-[#f3eadc] px-6 py-[90px]"
    >
      
<div className="mx-auto mb-12 max-w-[650px] text-center">
  <p className="eyebrow text-xs font-bold tracking-[3px] text-red-700">
    YOUR TABLE AWAITS
  </p>

  <h2 className="my-4 text-[clamp(2rem,4vw,3rem)] font-normal">
    Make a Reservation
  </h2>

  <p className="text-stone-600">
    Plan your next evening at Kuro House.
  </p>
</div>


      
<form 
  
onSubmit={async (event) => {
  event.preventDefault()

  const form = event.currentTarget
  const formData = new FormData(form)

  setMessage('')
  setIsSubmitting(true)

  try {
    const result = await apiRequest('/reservations', {
      method: 'POST',
      body: JSON.stringify({
        reservation_date: formData.get('bookingDate'),
        reservation_time: formData.get('bookingTime'),
        guest_count: guests,
        special_requests: formData.get('specialRequests'),
      }),
    })

    setMessage(result.message)
    form.reset()
    setGuests(2)
  } catch (error) {
    setMessage(error.message)
  } finally {
    setIsSubmitting(false)
  }
}}

  className="mx-auto grid max-w-[800px] grid-cols-1 gap-6 border border-[#ded2c2] bg-white p-6 shadow-[0_12px_32px_rgba(23,23,23,0.06)] sm:grid-cols-2 sm:p-9"
>
  {/* Full name */}
  <div className="flex min-w-0 flex-col gap-2">
    <label htmlFor="guest-name" className="text-sm font-bold">
      Full name
    </label>
    <input
      type="text"
      id="guest-name"
      name="guestName"
      autoComplete="name"
      required
      className="w-full min-w-0 border border-[#d7cbb8] bg-[#fffaf3] px-3.5 py-3 text-stone-900 focus:border-red-700 focus:outline-2 focus:outline-offset-2 focus:outline-red-700"
    />
  </div>

  {/* Email address */}
  <div className="flex min-w-0 flex-col gap-2">
    <label htmlFor="guest-email" className="text-sm font-bold">
      Email address
    </label>
    <input
      type="email"
      id="guest-email"
      name="guestEmail"
      autoComplete="email"
      required
      className="w-full min-w-0 border border-[#d7cbb8] bg-[#fffaf3] px-3.5 py-3 text-stone-900 focus:border-red-700 focus:outline-2 focus:outline-offset-2 focus:outline-red-700"
    />
  </div>


    {/* Date */}
    <div className="flex min-w-0 flex-col gap-2">
    <label htmlFor="booking-date" className="text-sm font-bold">
        Date
    </label>
    <input
        type="date"
        id="booking-date"
        name="bookingDate"
        required
        className="w-full min-w-0 border border-[#d7cbb8] bg-[#fffaf3] px-3.5 py-3 text-stone-900 focus:border-red-700 focus:outline-2 focus:outline-offset-2 focus:outline-red-700"
    />
    </div>

    {/* Number of guests */}
<div className="flex min-w-0 flex-col gap-2">
  <label className="text-sm font-bold">
    Number of guests
  </label>

  <GuestStepper
    guests={guests}
    onGuestsChange={setGuests}
  />
</div>
    
    {/* Preferred time */}
    <div className="flex min-w-0 flex-col gap-2">
    <label htmlFor="booking-time" className="text-sm font-bold">
        Preferred time
    </label>
    <select
        id="booking-time"
        name="bookingTime"
        required
        defaultValue=""
        className="w-full min-w-0 border border-[#d7cbb8] bg-[#fffaf3] px-3.5 py-3 text-stone-900 focus:border-red-700 focus:outline-2 focus:outline-offset-2 focus:outline-red-700"
    >
        <option value="" disabled>Select a time</option>
        <option value="17:00">17:00</option>
        <option value="18:00">18:00</option>
        <option value="19:00">19:00</option>
        <option value="20:00">20:00</option>
    </select>
    </div>

    {/* Special requests */}
    <div className="col-span-full flex min-w-0 flex-col gap-2">
    <label htmlFor="special-requests" className="text-sm font-bold">
        Special requests (optional)
    </label>
    <textarea
        id="special-requests"
        name="specialRequests"
        rows={4}
        className="w-full min-w-0 resize-y border border-[#d7cbb8] bg-[#fffaf3] px-3.5 py-3 text-stone-900 focus:border-red-700 focus:outline-2 focus:outline-offset-2 focus:outline-red-700"
    />
    </div>

    
    <button
      type="submit"
      disabled={isSubmitting}
      className="col-span-full w-full border border-red-700 bg-red-700 px-6 py-[15px] font-bold text-white transition-colors duration-200 hover:border-[#842020] hover:bg-[#842020] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-stone-900 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isSubmitting ? 'Submitting...' : 'Make Reservation'}
    </button>


    <input
    
      type="hidden"
      name="guestCount"
      value={guests}
    />
</form>

  {message && (
  <p
    role="status"
    className="mx-auto mt-6 max-w-[800px] text-center text-sm text-stone-700"
  >
    {message}
  </p>
)}
    </section>
  )
}

export default Reservations
