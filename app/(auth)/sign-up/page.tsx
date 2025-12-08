'use client'

import InputFields from '@/components/forms/InputFields'
import { useRouter } from 'next/navigation'
import {useForm} from 'react-hook-form'
import CountrySelectField from "@/components/forms/CountrySelectField";
import {Button} from "@/components/ui/button";
import FooterLink from "@/components/forms/FooterLink";
import {signUpWithEmail} from "@/lib/actions/auth.actions";

const SignUp = () => {
const router = useRouter()
const {register, handleSubmit, control, formState: {errors, isSubmitting}, } = useForm<SignUpFormData>({
  defaultValues : {
    fullName: '',
    email: '',
    password: '',
    country: 'US',
  },
  mode: 'onBlur'
})
    const onSubmit = async (data: SignUpFormData) => {
    try {
        const result = await signUpWithEmail(data)
        if(result.success) router.push('/')
    }catch (e){
        console.error(e)
        toast.errr('Sign up failed. Please try again later', {
            description: e instanceof Error ? e.message : 'Failed to sign up'
        })
    }
    }

  return (
    <>
     <h1 className='form-title'>Sign Up & Personalize</h1>
     <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
      <InputFields 
      name='fullName'
      label='Full Name'
      placeholder='John Doe'
      register={register}
      error={errors.fullName}
      validation={{required: 'Full name is required', minLength: 2}}
      />
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
      <CountrySelectField name='country' label='Select Country' control={control} required error={errors.country} />

         <Button type='submit' disabled={isSubmitting} className='yellow-btn w-full mt-5'>
             {isSubmitting ? 'Creating Account...' : 'Secure Your Email Account'}
         </Button>
         <FooterLink text='Already have an account' linkText='Sign in' href='/sign-in'/>
     </form>
    </>
  )
}

export default SignUp
