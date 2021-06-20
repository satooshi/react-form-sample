import { debuglog } from 'Utils';
import React from 'react';
import { ErrorMessage } from './Atoms/ErrorMessage';
import { FormLabel } from './Atoms/FormLabel';

export interface Props {
  error?: string;
  id: string;
  labelText: string;
  onChange: (value: string) => void;
  value?: string;
}

export const TextInput: React.FC<Props> = React.memo(
  ({ error, id, labelText, onChange, value }) => {
    debuglog('render TextInput', { id, value });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      onChange(event.target.value);
    }

    return (
      <>
        <FormLabel id={id} labelText={labelText} />
        <input
          className={error ? 'form-control is-invalid' : 'form-control'}
          id={id}
          onChange={handleChange}
          type="input"
          value={value}
        />
        <ErrorMessage error={error} />
      </>
    );
  }
);
