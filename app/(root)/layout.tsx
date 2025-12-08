import Header from "@/components/Header"
import CardLong from "@/components/Lon-Card"
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {auth} from "@/lib/better-auth/auth";


const Layout = async ({children} : {children: React.ReactNode}) => {
    const session = await auth.api.getSession({headers: await headers()})
    if(!session?.user) redirect('/sign-up')

    const user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
    }
  return (
    <main className="min-h-screen">
        <Header user={user}/>
        <div>
            {children}
        </div>
        <CardLong/>
    </main>
  )
}

export default Layout