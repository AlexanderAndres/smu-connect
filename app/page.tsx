"use client";
import { signIn, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react'
import Input from './components/inputs/Input';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailInput, setEmailValue] = useState('');

  const { data: session, status } = useSession()

  const handleInputChange = (value: any) => {
    setEmailValue(value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const result = await signIn('credentials', { redirect: false, email, password, })
    console.log("[RESULT:]", result)
  }


  useEffect(() => {
    // console.log("[Status]:", status)
    if (session) redirect('/home');
  }, [session])

  useEffect(() => {
    console.log("[Email]:", emailInput)
  }, [emailInput])

  return (
    <div className="bg-gray-900 text-gray-100 h-screen w-screen flex justify-center items-center">
      <div>
        <form
          onSubmit={handleSubmit} className='flex flex-col gap-4 relative p-6 flex-auto'>
          <Input id='email' label='Email' onInputChange={handleInputChange} />
          {/* <div>
          <label htmlFor="email"
          className=''
          >Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div> */}
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
      </div>
    </div>
  )
}

export default Login