import React from 'react'
import LayoutClient from "@/app/LayoutClient";
import {getAuth} from "@/lib/better-auth/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

const Layout = async ({children}:{children:React.ReactNode}) => {
    const auth = await getAuth();
    const session = await auth.api.getSession({headers: await headers()})


    if(!session?.user ) redirect('/sign-up')
    return (
        <div>
            <LayoutClient user={session.user} >
                {children}
            </LayoutClient>
        </div>
    )
}
export default Layout
