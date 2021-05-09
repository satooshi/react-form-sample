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
    <div>
      <label htmlFor={id}>
        {labelText}:
        <input type="input" id={id} value={value} onChange={handleChange} />
      </label>
      {error ? <p>{error}</p> : null}
    </div>
  );
};

export default TextInput;
