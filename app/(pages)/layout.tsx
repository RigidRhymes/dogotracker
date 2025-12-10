import React from 'react'
import {auth} from "@/lib/better-auth/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import Header from "@/components/Header";


const Layout = async ({children} : {children: React.ReactNode}) => {
    const session = await auth.api.getSession({headers: await headers()})
    if(!session?.user) redirect('/sign-up')

    const user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
    }
    return (
        <main className='min-h-screen bg-black'>
            <Header user={user}/>
            <section className='pages-section scrollbar-hide-default'>
                <p></p>
                <div className='container mx-auto px-4 '>
                    {children}
                </div>
            </section>
        </main>
    )
}
export default Layout
