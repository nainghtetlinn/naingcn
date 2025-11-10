'use client';

import * as React from 'react';
import {
  FormProvider,
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
} from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Steps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldPath extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  value: string;
  fields: TFieldPath[];
}[];

type MultistepFormState = {
  activeValue: string;
};

type MultistepFormAction = { handleNext: () => void; handlePrev: () => void };

type MultistepFormContext = MultistepFormState & MultistepFormAction;

const MultistepFormContext = React.createContext<MultistepFormContext>(
  {} as MultistepFormContext
);

const useMultistepFormContext = (name: string) => {
  const context = React.useContext(MultistepFormContext);

  if (!context) {
    throw new Error(`${name} should be used within <MultistepForm>`);
  }

  return context;
};

function MultistepForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TTransformedValues = TFieldValues
>({
  form,
  steps,
  active,
  onActiveChange,
  children,
}: {
  form: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
  steps: Steps<TFieldValues>;
  active: number;
  onActiveChange: React.Dispatch<React.SetStateAction<number>>;
} & React.PropsWithChildren) {
  const handleNext = async () => {
    const isValid = await form.trigger(steps[active].fields, {
      shouldFocus: true,
    });
    if (!isValid) {
      return; // Stop progression if validation fails
    }
    if (active < steps.length - 1) {
      onActiveChange((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (active > 0) {
      onActiveChange((prev) => prev - 1);
    }
  };

  const activeValue = steps[active].value;

  return (
    <MultistepFormContext.Provider
      value={{
        activeValue,
        handleNext,
        handlePrev,
      }}
    >
      <FormProvider {...form}>{children}</FormProvider>
    </MultistepFormContext.Provider>
  );
}

function MultistepFormContent({
  value,
  className,
  ...props
}: React.ComponentProps<'div'> & { value: string }) {
  const { activeValue } = useMultistepFormContext('<MultistepFormContent>');

  return (
    <div
      className={cn(activeValue === value ? 'block' : 'hidden', className)}
      {...props}
    />
  );
}

function MultistepFormNextTrigger({
  children = 'Next',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { handleNext } = useMultistepFormContext('<MultistepFormNextTrigger>');

  return (
    <Button
      type='button'
      data-slot='multistep-form-next-trigger'
      children={children}
      onClick={handleNext}
      {...props}
    />
  );
}

function MultistepFormPrevTrigger({
  variant = 'secondary',
  children = 'Previous',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { handlePrev } = useMultistepFormContext('<MultistepFormPrevTrigger>');

  return (
    <Button
      type='button'
      data-slot='multistep-form-prev-trigger'
      variant={variant}
      children={children}
      onClick={handlePrev}
      {...props}
    />
  );
}

export {
  MultistepForm,
  MultistepFormContent,
  MultistepFormNextTrigger,
  MultistepFormPrevTrigger,
  type Steps,
};
