import { useState, useEffect } from 'react'
import { apiRequest } from '../api/client'

function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [user, setUser] = useState(null)

  //session checker
    useEffect(() => {
    async function checkSession() {
        try {
        const result = await apiRequest('/auth/me')
        setUser(result.user)
        } catch (error) {
        setUser(null)
        }
    }

    checkSession()
    }, [])


  return (
    <section className="bg-[#f3eadc] px-6 py-20">
      <div className="mx-auto max-w-md rounded-sm bg-white p-8 shadow-sm sm:p-10">
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-[#a52a2a]">
          Welcome to Kuro House
        </p>

        <h2 className="mb-3 font-serif text-3xl text-[#171717]">
        {user
            ? `Welcome back, ${user.name}.`
            : isLogin
            ? 'Welcome back.'
            : 'Join our table.'}
        </h2>

        <p className="mb-8 text-sm leading-6 text-gray-600">
        {user
            ? 'You are logged in and can manage your reservations.'
            : isLogin
            ? 'Sign in to manage your reservations.'
            : 'Create an account to make and manage reservations.'}
        </p>

        
        {user && (
        <div className="border-t border-[#d5cabb] pt-6">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#a52a2a]">
            Your Account
            </p>

            <p className="font-serif text-xl text-[#171717]">
            {user.name}
            </p>

            <p className="mt-1 text-sm text-gray-600">
            {user.email}
            </p>

            <p className="mt-5 text-sm leading-6 text-gray-600">
            You're all set. You can now manage your Kuro House reservations.
            </p>
            
            <button
            type="button"
            disabled={isSubmitting}
            onClick={async () => {
                setMessage('')
                setIsSubmitting(true)

                try {
                const result = await apiRequest('/auth/logout', {
                    method: 'POST',
                })

                setUser(null)
                setIsLogin(true)
                setMessage(result.message)
                } catch (error) {
                setMessage(error.message)
                } finally {
                setIsSubmitting(false)
                }
            }}
            className="mt-6 w-full border border-[#a52a2a] px-6 py-3 text-sm uppercase tracking-widest text-[#a52a2a] transition hover:bg-[#a52a2a] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
            {isSubmitting ? 'Logging Out...' : 'Log Out'}
            </button>

        </div>
        )}

        {!user && (
            <>
            <form
                className="space-y-5"
                onSubmit={async (event) => {
                    event.preventDefault()

                    const form = event.currentTarget
                    const formData = new FormData(form)

                    setMessage('')
                    setIsSubmitting(true)

                    try {
                    const result = await apiRequest(
                        isLogin ? '/auth/login' : '/auth/register',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                        name: formData.get('name'),
                        email: formData.get('email'),
                        password: formData.get('password'),
                        }),
                    })

                    setMessage(result.message)

                    if (isLogin) {
                    const session = await apiRequest('/auth/me')
                    setUser(session.user)
                    }
                    if (!isLogin) {
                    form.reset()
                    }
                    } catch (error) {
                    setMessage(error.message)
                    } finally {
                    setIsSubmitting(false)
                    }
                }}
                > 
            {!isLogin && (
                <div>
                <label
                    htmlFor="name"
                    className="mb-2 block text-sm text-[#171717]"
                >
                    Full name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="w-full border border-[#d5cabb] px-4 py-3 outline-none focus:border-[#a52a2a]"
                />
                </div>
            )}

            <div>
                <label
                htmlFor="email"
                className="mb-2 block text-sm text-[#171717]"
                >
                Email address
                </label>
                <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full border border-[#d5cabb] px-4 py-3 outline-none focus:border-[#a52a2a]"
                />
            </div>

            <div>
                <label
                htmlFor="password"
                className="mb-2 block text-sm text-[#171717]"
                >
                Password
                </label>
                <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? 'current-password' : 'new-password'}
                required
                minLength={8}
                className="w-full border border-[#d5cabb] px-4 py-3 outline-none focus:border-[#a52a2a]"
                />
            </div>

            
            <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#a52a2a] px-6 py-3 text-sm uppercase tracking-widest text-white transition hover:bg-[#842121] disabled:cursor-not-allowed disabled:opacity-60"
            >
            {isSubmitting
                ? isLogin
                ? 'Signing In...'
                : 'Creating Account...'
                : isLogin
                ? 'Sign In'
                : 'Create Account'}
            </button>

            </form>

            
            {message && (
              <p role="status" className="mt-4 text-sm text-[#a52a2a]">
                {message}
              </p>
            )}

            <p className="mt-6 text-center text-sm text-gray-600">
              {isLogin ? 'New to Kuro House?' : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="font-semibold text-[#a52a2a] underline underline-offset-4"
              >
                {isLogin ? 'Create an account' : 'Sign in'}
              </button>
            </p>
          </>
        )}
        
      </div>
    </section>
  )
}

export default Auth
