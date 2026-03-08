"use client"

import { Control, Controller } from 'react-hook-form'
import { Field, FieldError, FieldGroup, FieldLabel } from './field'
import { Input } from './input'
import Image from 'next/image'
import { FormFieldType } from '../forms/PatientForm'
import "@/app/globals.css"
import PhoneInput from 'react-phone-input-2'
import SubmitButton from './SubmitButton'

interface CustomFormFieldProps {
  control: Control<any>,
  fieldType: FormFieldType,
  name: string,
  FieldLabel?: string,
  placeholder?: string,
  iconSrc?: string,
  iconAlt?: string,
  disabled?: boolean,
  dateFormat?: string,
  showTimeSelect?: boolean,
  children?: React.ReactNode,
  renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any; props: CustomFormFieldProps }) => {
  const { fieldType, iconSrc, iconAlt, placeholder, disabled } = props;
  
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "icon"}
              className='ml-2'
            />
          )}
          <Input 
            placeholder={placeholder}
            {...field}
            disabled={disabled}
            className="shad-input border-0"
          />
        </div>
      )
    case FormFieldType.PHONE_INPUT:
      return (
        <div className="phone-input-wrapper">
          <PhoneInput
            country={'us'}
            value={field.value || ''}
            onChange={field.onChange}
            disabled={disabled}
            countryCodeEditable={true}
            disableDropdown={false}
            searchPlaceholder="Search countries..."
            inputProps={{
              placeholder: placeholder || '(555) 123-4567',
              required: true,
              className: 'phone-input-field'
            }}
            containerClass="phone-input-container"
            buttonClass="phone-input-button"
            dropdownClass="phone-input-dropdown"
            searchClass="phone-input-search"
          />
        </div>
      )
    case FormFieldType.TEXTAREA:
      return (
        <textarea
          placeholder={placeholder}
          {...field}
          disabled={disabled}
          className="shad-input"
        />
      )
    case FormFieldType.CHECKBOX:
      return (
        <input
          type="checkbox"
          {...field}
          disabled={disabled}
          className="shad-checkbox"
        />
      )
    default:
      return null
  }
}

const CustomFormField = (props: CustomFormFieldProps) => {
  const { control, name, fieldType, FieldLabel } = props;
  
  return (
    <FieldGroup>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            {fieldType !== FormFieldType.CHECKBOX && FieldLabel && (
              <label htmlFor={name}>
                {FieldLabel}
              </label>
            )}
            <RenderField field={field} props={props} />
            {fieldState.invalid && fieldState.error && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
     
    </FieldGroup>
  )
}

export default CustomFormField