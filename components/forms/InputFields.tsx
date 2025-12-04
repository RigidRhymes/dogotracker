
import React from 'react'
import {Input} from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {Label} from '@/components/ui/label'



const InputFields = ({name, label, placeholder, type='text', register, error, validation, disabled, value} : FormInputProps) => {
return (
    <div className='space-y-2'>
        <Label htmlFor={name} className="form-label">
            {label}
        </Label>
      <Input 
      type={type}
      id={name}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      className={cn('form-input', {'opacity-50 cursor-not-allowed' : disabled})}
      {...register(name, validation)}
      />
        {error && <p className='text-sm text-red-700'>{error.message}</p>}
    </div>
  )
}

export default InputFields
