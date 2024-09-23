"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export type FieldDefinition = {
  name: string
  label: string
  type: "text" | "number" | "email" | "password" | "checkbox" | "radio" | "select" | "textarea"
  placeholder?: string
  description?: string
  options?: { label: string; value: string }[]
}

export type DynamicFormProps = {
  schema: z.ZodObject<any>
  defaultValues?: z.infer<any>
  fields: FieldDefinition[]
  onSubmit: (data: any) => void
  buttonText?: string
}

export default function DynamicForm({ schema, defaultValues, fields, onSubmit, buttonText }: DynamicFormProps) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {},
    mode: "onChange",
  })

  const [passwordVisibility, setPasswordVisibility] = useState<{ [key: string]: boolean }>({})

  const togglePasswordVisibility = (fieldName: string) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }))
  }

  const renderField = (field: FieldDefinition) => {
    switch (field.type) {
      case "text":
      case "number":
      case "email":
        return (
          <FormItem>
            <FormLabel>{field.label}</FormLabel>
            <FormControl>
              <Input type={field.type} placeholder={field.placeholder} {...form.register(field.name)} />
            </FormControl>
            {field.description && <FormDescription>{field.description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      case "password":
        return (
          <FormItem>
            <FormLabel>{field.label}</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type={passwordVisibility[field.name] ? "text" : "password"}
                  placeholder={field.placeholder}
                  {...form.register(field.name)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => togglePasswordVisibility(field.name)}
                  aria-label={passwordVisibility[field.name] ? "Hide password" : "Show password"}
                >
                  {passwordVisibility[field.name] ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </FormControl>
            {field.description && <FormDescription>{field.description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      case "checkbox":
        return (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox {...form.register(field.name)} />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>{field.label}</FormLabel>
              {field.description && <FormDescription>{field.description}</FormDescription>}
            </div>
          </FormItem>
        )
      case "radio":
        return (
          <FormItem className="space-y-3">
            <FormLabel>{field.label}</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={(value) => form.setValue(field.name, value)} defaultValue={form.getValues(field.name)}>
                {field.options?.map((option) => (
                  <FormItem className="flex items-center space-x-3 space-y-0" key={option.value}>
                    <FormControl>
                      <RadioGroupItem value={option.value} />
                    </FormControl>
                    <FormLabel className="font-normal">{option.label}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            {field.description && <FormDescription>{field.description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      case "select":
        return (
          <FormItem>
            <FormLabel>{field.label}</FormLabel>
            <Select onValueChange={(value) => form.setValue(field.name, value)} defaultValue={form.getValues(field.name)}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem value={option.value} key={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {field.description && <FormDescription>{field.description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      case "textarea":
        return (
          <FormItem>
            <FormLabel>{field.label}</FormLabel>
            <FormControl>
              <Textarea placeholder={field.placeholder} {...form.register(field.name)} />
            </FormControl>
            {field.description && <FormDescription>{field.description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )
      default:
        return <FormItem>Unsupported field type</FormItem>
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => renderField({ ...field, ...formField })}
          />
        ))}
        <div className="space-x-4">
          <Button type="submit">{ buttonText || 'Submit' }</Button>
          {
            fields[0].type !== 'password' && (
              <Button type="reset" onClick={() => {
                form.reset()
              }} variant='secondary'>Cancel</Button>
            )
          }
        </div>
      </form>
    </Form>
  )
}
