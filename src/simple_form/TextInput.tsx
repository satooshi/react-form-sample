import React from 'react';

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

  return (
    <>
      <label className="form-label" htmlFor={id}>
        {labelText}:
      </label>
      <input
        type="input"
        id={id}
        className={error ? 'form-control is-invalid' : 'form-control'}
        value={value}
        onChange={handleChange}
      />
      {error ? <div className="invalid-feedback">{error}</div> : null}
    </>
  );
};

export default TextInput;
