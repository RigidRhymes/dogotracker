'use client'

import InputFields from '@/components/forms/InputFields'
import { useRouter } from 'next/navigation'
import {useForm} from 'react-hook-form'
import CountrySelectField from "@/components/forms/CountrySelectField";
import {Button} from "@/components/ui/button";
import FooterLink from "@/components/forms/FooterLink";

const SignIn = () => {
  const router = useRouter()

  const {register, handleSubmit, control, formState: {errors, isSubmitting}, } = useForm<SignInFormData>({
    defaultValues : {
      email: '',
      password: '',
    },
    mode: 'onBlur'
  })

  const onSubmit = async(data: SignInFormData) => {
    try {

    }catch (e){
      console.error(e)
      toast.error('Sign in failed. Please try again later', 'Failed to sign in', {
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
          <FooterLink text='Already have an account' linkText='Sign Up' href='/sign-up'/>
        </form>
      </>
  )
}

export default SignIn
