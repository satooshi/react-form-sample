import React from 'react';
import ErrorMessage from './ErrorMessage';

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
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }
  console.log('render TextInput', { id });

  return (
    <>
      <label className="form-label" htmlFor={id}>
        {labelText}:
      </label>
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

export default TextInput;
