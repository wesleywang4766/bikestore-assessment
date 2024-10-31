import React from 'react';
import { Input } from "@/components/ui/input";

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormField: React.FC<FormFieldProps> = ({ label, name, type, value, onChange }) => (
  <fieldset>
    <div className="flex items-center">
      <label className="text-sm w-[100px]" htmlFor={name}>
        {label}
      </label>
      <Input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="rounded-lg bg-background"
      />
    </div>
  </fieldset>
);