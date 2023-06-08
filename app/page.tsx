"use client";
import { signIn, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react'
import Input from './components/inputs/input';
import {
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { data: session, status } = useSession()

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
  });

  // const handleSubmit = async (event: any) => {
  //   event.preventDefault()
  //   const result = await signIn('credentials', { redirect: false, email, password, })
  //   console.log("[RESULT:]", result)
  // }


  useEffect(() => {
    // console.log("[Status]:", status)
    if (session) redirect('/home');
  }, [session])

  return (
    <div className="bg-gray-900 text-gray-100 h-screen w-screen flex justify-center items-center">
      <form
        // onSubmit={handleSubmit}
        className=''>
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
        <Input
          id="password"
          label="Password"
          type="password"
          errors={errors}
          required
        />
        <button type="submit">Sign in</button>
      </form>
    </div>
  )
}

export default Login