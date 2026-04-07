
import {use} from 'react'

export default function ClientSearch({
    searchParams,
} : {
    searchParams: Promise<{q?: string}>
}){
    const params = use(searchParams)
    return <div>Query: {params.q}</div>
}