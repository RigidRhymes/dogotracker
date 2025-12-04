'use client'

import InputFields from '@/components/forms/InputFields'
import { useRouter } from 'next/navigation'
import {useForm} from 'react-hook-form'

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

  return (
    <>
     <h1 className='form-title'>Sign Up & Personalize</h1>
     <form>
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
      
     </form>
    </>
  )
}

export default SignUp
