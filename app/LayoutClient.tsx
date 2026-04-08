'use client'

import Header from "@/components/Header";


type Props = {
    user: {id: string; name: string; email: string };
    children: React.ReactNode;
};

const LayoutClient = ({ user, children }: Props) => {
    return(
        <main>
                <Header user={user} />
            <div>
                {children}
            </div>
        </main>
    )
}

export default LayoutClient;
