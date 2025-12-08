'use client'
import React, { useState } from 'react'
import countryList from 'react-select-country-list'
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Check, ChevronsUpDown} from "lucide-react";
import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {Controller} from "react-hook-form";
import Link from "next/link";


const CountrySelect = ({value, onChange}: {value: string, onChange:(value: string) => void}) => {
  const [open, setOpen] = useState(false);

  const countries = countryList().getData()
  
  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map((char) => 127397 + char.charCodeAt(0))

    return String.fromCodePoint(...codePoints)
  }

  return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
          variant='outline'
          role="combobox"
          aria-expanded={open}
          className='country-select-trigger'
          >
          {value ? (
              <span className='flex items-center gap-2'>
                <span>{getFlagEmoji(value)}</span>
                <span>{countries.find((c) => c.value === value)?.label}</span>
              </span>
          ) : (
              'Select Country...'
          )}
              <ChevronsUpDown className='ml-2 h-4 shrink-0 opacity-50'/>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full bg-blue-950 border-blue-600' align='start'>
          <Command className='bg-blue-950 border-blue-600'>
            <CommandInput className='country-select-input' placeholder='Search Countries...'/>
            <CommandEmpty>
              No country found.
            </CommandEmpty>
            <CommandList className='max-h-60 bg-blue-950 scrollbar-hide-default'>
              <CommandGroup className='bg-blue-950'>
                {countries.map((country) => (
                    <CommandItem
                    key={country.value}
                    value={`${country.label} ${country.value}`}
                    onSelect={() => {
                      onChange(country.value)
                      setOpen(false)
                    }}
                    className='country-select-item'
                    >
                      <Check className={cn('mr-2 h-4 w-4 text-blue-500', value === country.value ? 'opacity-100' : 'opacity-0')}/>
                      <span className='flex items-center gap-2'>
                        <span>{getFlagEmoji(country.value)}</span>
                        <span>{country.label}</span>
                      </span>
                    </CommandItem>
                ))}
              </CommandGroup>

            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
  )

}
const CountrySelectField = ({name, label, control, error, required = false} : CountrySelectProps) => {
  return (
    <div className='space-y-2'>
      <Label htmlFor={name} className='form-label'>{label}</Label>
      <Controller name={name}
                  control={control}
                  rules={{required: required ? `Please select ${label.toLowerCase()}` : false}}
                  render={({field}) => (
                      <CountrySelect value={field.value} onChange={field.onChange} />
                  )} />

      {error && <p className='text-sm text-red-700'>{error.message}</p>}
      <Link href='/terms-conditions' className='text-sm text-blue-500'>Read our Data Privacy & Policy</Link>
    </div>
  )
}



export default CountrySelectField
