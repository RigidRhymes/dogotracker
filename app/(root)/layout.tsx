import Header from "@/components/Header"
import CardLong from "@/components/Lon-Card"
import { User } from "lucide-react"

const Layout = ({children} : {children: React.ReactNode}) => {
  return (
    <main className="min-h-screen">
        <Header user={User}/>
        <div>
            {children}
        </div>
        <CardLong/>
    </main>
  )
}

export default Layout