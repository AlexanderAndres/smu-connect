"use client";
import { signIn, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { data: session, status } = useSession({ required: true })
  if (!session) redirect('/')

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    console.log("[RESULT:]", result)
    // Redirect to home page on success

  }


  useEffect(() => {
    console.log("[Status]:", status)
    if (session) redirect('/home')
  }, [session, status])

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">Sign in</button>
    </form>
  )
}

export default Login