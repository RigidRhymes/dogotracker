import React from 'react'
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import Header from "@/components/Header";
import {getAuth} from "@/lib/better-auth/auth";


const Layout = async ({children} : {children: React.ReactNode}) => {
    const auth = await getAuth();
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
