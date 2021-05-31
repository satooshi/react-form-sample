import React from 'react';
import { debuglog } from 'Utils';
import ErrorMessage from './Atoms/ErrorMessage';
import FormLabel from './Atoms/FormLabel';

type Props = {
  error?: string;
  id: string;
  labelText: string;
  onChange: (value: string) => void;
  value?: string;
};

const TextInput: React.FC<Props> = ({
  error,
  id,
  labelText,
  onChange,
  value,
}) => {
  debuglog('render TextInput', { id, value });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <>
      <FormLabel id={id} labelText={labelText} />
      <input
        type="input"
        id={id}
        className={error ? 'form-control is-invalid' : 'form-control'}
        onChange={handleChange}
        value={value}
      />
      <ErrorMessage error={error} />
    </>
  );
};

export default React.memo(TextInput);
