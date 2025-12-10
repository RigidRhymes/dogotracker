'use server'
import {auth} from '@/lib/better-auth/auth'
import {headers} from "next/headers";


export const signUpWithEmail = async({email, password, fullName, country}) => {
    try {
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
        await auth.api.signOut({
            headers: await headers()
        })
    }catch (e){
        console.log('Sign out failed', e)
        return {success: false, error: 'Sign out failed'}
    }
}

export const signInWithEmail = async({email, password}) => {
    try {
        const response = await auth.api.signInEmail({
            body: {email, password}
        })
        return {success: true, data: response}
    }catch (e){
        console.log('Sign in failed', e)
        return {success: false, error: 'Sign in failed'}
    }
}