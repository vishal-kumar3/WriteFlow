import DynamicForm, { DynamicFormProps } from "./DynamicForm"

export const FormWrapper = ({ title, schema, defaultValues, fields, onSubmit, buttonText }: DynamicFormProps & { title: string }) => {
  return (
    <div className=' max-w-full md:max-w-[70%] text-sm space-y-4'>
      <div className='text-xl font-semibold'># {title}</div>
      <hr />
      <div className='ml-8'>
        <DynamicForm
          schema={schema}
          defaultValues={defaultValues}
          fields={fields}
          onSubmit={onSubmit}
          buttonText={buttonText}
        />
      </div>
    </div>
  )
}
