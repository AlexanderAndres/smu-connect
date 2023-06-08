"use client";
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

const Home = () => {
    const { data: session, status } = useSession({ required: true })
    if (!session) redirect('/')

    useEffect(() => {
        console.log("[Status]:", status)
        // if (session) redirect('/home')
    }, [session, status])

    return (
        <div>Home</div>
    )
}

export default Home