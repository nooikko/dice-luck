import React from 'react';
import { formClasses } from '../constants';
import { Label } from '../Label';

interface SelectFieldProps {
  id: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}

export const SelectField: React.FC<SelectFieldProps> = ({ id, label, className = '', ...props }) => {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <select id={id} {...props} className={`${formClasses} 'pr-8'`} />
    </div>
  );
};
