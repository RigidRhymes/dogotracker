'use client'

import InputFields from '@/components/forms/InputFields'
import { useRouter } from 'next/navigation'
import {useForm} from 'react-hook-form'
import {Button} from "@/components/ui/button";
import FooterLink from "@/components/forms/FooterLink";
import {signInWithEmail} from "@/lib/actions/auth.actions";
import {toast} from "sonner";

const SignIn = () => {
  const router = useRouter()

  const {register, handleSubmit, formState: {errors, isSubmitting}, } = useForm<SignInFormData>({
    defaultValues : {
      email: '',
      password: '',
    },
    mode: 'onBlur'
  })

  const onSubmit = async(data: SignInFormData) => {
    try {
      const result = await signInWithEmail(data)

      if(result.success){
        router.push('/')
      } else {
        toast.error('Sign in failed. Please check your email and password', {
          description: result.error || 'Failed to sign in'
        }   )
      }
    }catch (e){
      console.error(e)
      toast.error('Sign in failed. Please try again later', {
          description: e instanceof Error ? e.message : 'Failed to sign in'
      })
    }
  }
  return (
      <>
        <h1 className='form-title'>Log In to Your Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          <InputFields
              name='email'
              label='Email'
              placeholder='example@dogo.com'
              register={register}
              error={errors.email}
              validation={{required: 'Email is required', pattern:{value: /^\S+@\S+$/i}, message: 'Invalid Email Address'}}
          />
          <InputFields
              name='password'
              label='Password'
              placeholder='Enter a strong password'
              register={register}
              error={errors.password}
              type='password'
              validation={{required: 'Password is required', minLength: 8}}
          />


          <Button type='submit' disabled={isSubmitting} className='yellow-btn w-full mt-5'>
            {isSubmitting ? 'Signing In...' : 'Log in to your Account'}
          </Button>
          <FooterLink text='No account yet?' linkText='Sign Up' href='/sign-up'/>
        </form>
      </>
  )
}

export default SignIn
