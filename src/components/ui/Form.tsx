"use client";

import * as React from "react";
import { useFormContext, FormProvider, Control, FieldValues, FieldPath, Controller } from "react-hook-form";

export const Form = ({ children, ...props }: any) => {
  return <FormProvider {...props}>{children}</FormProvider>;
};

export const FormItem = ({ className, ...props }: any) => (
  <div className={`space-y-2 ${className}`} {...props} />
);

export const FormLabel = ({ className, ...props }: any) => (
  <label className={`text-sm font-medium leading-none ${className}`} {...props} />
);

export const FormControl = ({ children, ...props }: any) => (
  <div className="min-h-0" {...props}>{children}</div>
);

export const FormMessage = ({ className, ...props }: any) => (
  <p className={`text-sm font-medium text-red-500 ${className}`} {...props} />
);

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  render: (field: any) => React.ReactNode;
}

export const FormField = <T extends FieldValues>({
  control,
  name,
  render,
}: FormFieldProps<T>) => {
  const { control: contextControl } = useFormContext<T>();
  const activeControl = control || contextControl;

  return (
    <Controller
      control={activeControl}
      name={name}
      render={render}
    />
  );
};
