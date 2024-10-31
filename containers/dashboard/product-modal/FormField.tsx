import React from 'react';
import { Input } from "@/components/ui/input";

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string | number;
  max?: number;
  correctValue?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormField: React.FC<FormFieldProps> = ({ label, name, type, value, max, correctValue, onChange }) => (
  <fieldset>
    {type === 'radio' ? (
      <div className="flex">
        <label className="text-sm" htmlFor={name}>
          {label}
        </label>
        <input
          className="mx-2"
          name={name}
          type="radio"
          value={value}
          max={max}
          onChange={onChange}
          checked={value === correctValue}
        />
      </div>
    ) : (
      <div className="flex items-center">
        <label className="text-sm font-bold w-[120px]" htmlFor={name}>
          {label}:&nbsp;
        </label>
        <Input
          name={name}
          type={type}
          value={value}
          max={max}
          onChange={onChange}
          className="rounded-lg bg-background"
        />
      </div>
    )}
  </fieldset>
);