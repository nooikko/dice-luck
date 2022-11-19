import React from 'react';

import { formClasses } from '../constants';
import { Label } from '../Label';

interface TextFieldProps {
  id: string;
  label: string;
  type: string;
  className?: string;
  children: React.ReactNode;
}

export const TextField: React.FC<TextFieldProps> = ({ id, label, type = 'text', className = '', ...props }) => {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input id={id} type={type} {...props} className={formClasses} />
    </div>
  );
};
