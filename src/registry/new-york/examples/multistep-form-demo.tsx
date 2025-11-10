'use client';

import React from 'react';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  type Steps,
  MultistepForm,
  MultistepFormContent,
  MultistepFormNextTrigger,
  MultistepFormPrevTrigger,
} from '@/registry/new-york/ui/multistep-form';

const schema = z.object({
  username: z.string().min(1, 'Username required'),
  email: z.email(),
  password: z.string().min(1, 'Password required'),
});

type TSchema = z.infer<typeof schema>;

const steps: Steps<TSchema> = [
  { value: 'step-one', fields: ['username'] },
  { value: 'step-two', fields: ['email'] },
  { value: 'step-three', fields: ['password'] },
  { value: 'step-four', fields: [] },
];

export const MultistepFormDemo = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const [active, setActive] = React.useState(0);

  return (
    <form
      onSubmit={form.handleSubmit((d) => console.log(d))}
      className='max-w-[350px] w-full'
    >
      <MultistepForm
        form={form}
        steps={steps}
        active={active}
        onActiveChange={setActive}
      >
        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
          </CardHeader>
          <CardContent>
            <MultistepFormContent value='step-one'>
              <StepOne />
            </MultistepFormContent>
            <MultistepFormContent value='step-two'>
              <StepTwo />
            </MultistepFormContent>
            <MultistepFormContent value='step-three'>
              <StepThree />
            </MultistepFormContent>
            <MultistepFormContent value='step-four'>
              <StepFour />
            </MultistepFormContent>
          </CardContent>
          <CardFooter className='justify-end gap-2'>
            {active > 0 && <MultistepFormPrevTrigger />}
            {active === steps.length - 1 ? (
              <Button>Submit</Button>
            ) : (
              <MultistepFormNextTrigger />
            )}
          </CardFooter>
        </Card>
      </MultistepForm>
    </form>
  );
};

function StepOne() {
  const form = useFormContext<TSchema>();

  return (
    <Controller
      control={form.control}
      name='username'
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='username'>Username</FieldLabel>
          <Input {...field} id='username' aria-invalid={fieldState.invalid} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
function StepTwo() {
  const form = useFormContext<TSchema>();

  return (
    <Controller
      control={form.control}
      name='email'
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='email'>Email</FieldLabel>
          <Input {...field} id='email' aria-invalid={fieldState.invalid} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
function StepThree() {
  const form = useFormContext<TSchema>();

  return (
    <Controller
      control={form.control}
      name='password'
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor='password'>Password</FieldLabel>
          <Input {...field} id='password' aria-invalid={fieldState.invalid} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

function StepFour() {
  const form = useFormContext<TSchema>();

  return (
    <div>
      <p>Username: {form.getValues('username')}</p>
      <p>Email: {form.getValues('email')}</p>
      <p>Password: {form.getValues('password')}</p>
    </div>
  );
}
