import { debuglog } from 'Utils';
import React from 'react';
import { Value } from '../Types';

export interface Props {
  checked: boolean;
  error?: string;
  id: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: 'radio' | 'checkbox';
  value: Value;
}

export const FormCheckInput: React.FC<Props> = React.memo(
  ({ checked, error, id, name, onChange, type, value }) => {
    debuglog('render FormCheckInput', { id, value });

    return (
      <input
        checked={checked}
        className={error ? 'form-check-input is-invalid' : 'form-check-input'}
        id={id}
        name={name}
        onChange={onChange}
        type={type}
        value={value}
      />
    );
  }
);
