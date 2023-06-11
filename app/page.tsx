"use client";
import { signIn, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react'
import Input from './components/inputs/Input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { data: session, status } = useSession()

  const handleInputChange = (inputName: string, value: string) => {
    if (inputName === 'email') {
      setEmail(value);
    } else if (inputName === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const result = await signIn('credentials', { redirect: false, email, password, })
    console.log("[RESULT:]", result)
  }


  useEffect(() => {
    if (session) redirect('/home');
  }, [session])

  useEffect(() => {
    console.log("[Email]:", email)
    console.log("[Pass]:", password)
  }, [email, password])

  return (
    <div className="bg-gray-900 text-gray-100 h-screen w-screen flex justify-center items-center">
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-6 flex-auto'>
          <Input id='email' label='Email' onInputChange={(value: string) => handleInputChange('email', value)} />
          <Input id='password' label='Password' onInputChange={(value: string) => handleInputChange('password', value)} />
          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  )
}

export default Login