import React from 'react';
import { Value } from '../Types';

interface Props {
  checked: boolean;
  error?: string;
  id: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'radio' | 'checkbox';
  value: Value;
}

const FormCheckInput: React.FC<Props> = ({
  checked,
  error,
  id,
  name,
  onChange,
  type,
  value,
}) => {
  console.log('render FormCheckInput');

  return (
    <input
      className={error ? 'form-check-input is-invalid' : 'form-check-input'}
      type={type}
      id={id}
      name={name}
      checked={checked}
      value={value}
      onChange={onChange}
    />
  );
};

export default React.memo(FormCheckInput);
