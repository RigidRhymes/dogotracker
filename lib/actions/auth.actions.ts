'use server'

import {headers} from "next/headers";
import {getAuth} from "@/lib/better-auth/auth";



export const signUpWithEmail = async({email, password, fullName, country}: {email: string, password: string, fullName:string, country: string}) => {
    try {
        const auth = await getAuth()
        const response = await auth.api.signUpEmail({
            body: {email, password, name: fullName}
        })
        if(response){
           return {success: true}
        }
    }catch (e){
        console.log('Sign up failed', e)
        return {success: false, error: 'Sign up failed'}
    }
}

export const signOUt = async() => {
    try {
        const auth = await getAuth()
        await auth.api.signOut({
            headers: await headers()
        })
    }catch (e){
        console.log('Sign out failed', e)
        return {success: false, error: 'Sign out failed'}
    }
}

export const signInWithEmail = async({email, password}: {email: string, password: string}) => {
    try {
        const auth = await getAuth()
        const response = await auth.api.signInEmail({
            body: {email, password}
        })
        return {success: true, data: response}
    }catch (e){
        console.log('Sign in failed', e)
        return {success: false, error: 'Sign in failed'}
    }
}