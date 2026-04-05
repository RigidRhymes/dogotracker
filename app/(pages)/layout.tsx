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
        <main>
            <div>
                <div className='bg-black '>
                    <Header user={user}/>
                </div>
                {children}
            </div>
        </main>
    )
}
export default Layout
