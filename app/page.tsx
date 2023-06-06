"use client";

import { useSession } from 'next-auth/react';
import { authOptions } from './utils/autOptions'
import { useEffect } from 'react';
// import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const Home = async () => {
  // const session = await getServerSession(authOptions);
  const { data: session, status } = useSession({ required: true })
  if (!session) redirect('/api/auth/signin')

  useEffect(() => {
    console.log("[Status]:", status)
  }, [session, status])

  // if (status === 'loading') return <div>Loading...</div>

  return (
    <div className='flex h-screen w-screen items-center justify-center'>This is a protected page</div>
  )
}

export default Home