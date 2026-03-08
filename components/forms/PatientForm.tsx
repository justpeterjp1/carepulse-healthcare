'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { useState } from "react"
import { patientFormSchema } from "@/lib/validation"
import CustomFormField from '../ui/CustomFormField'
import { FieldGroup } from '../ui/field'
import SubmitButton from '../ui/SubmitButton'

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  CHECKBOX = 'checkbox',
  PHONE_INPUT = "phone-input"
}

export function PatientForm() {

  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof patientFormSchema>>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: ''
    }
  })

  function onSubmit(data: z.infer<typeof patientFormSchema>) {
    // Do something with the form values.
    console.log(data)
  }
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 flex-1 p-6'>
      <FieldGroup>
        <section className='mb-12 space-y-4'>
          <h1 className="header">Hi there 👋 </h1>
          <p className="text-dark-700">Schedule your first appointment</p>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name='name'
          FieldLabel='Name'
          placeholder='John Doe'
          iconSrc='/assets/icons/user.svg'
          iconAlt='user'
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name='email'
          FieldLabel='Email'
          placeholder='example@email.com'
          iconSrc='/assets/icons/email.svg'
          iconAlt='email'
        />

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name='phoneNumber'
          FieldLabel='Phone number'
          placeholder='(555) 123-4567'
        />
         <SubmitButton 
      isLoading={isLoading}>Get Started</SubmitButton>
      </FieldGroup>
      
      
    </form>
  )
}

export default PatientForm


