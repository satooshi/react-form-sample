import React from 'react';

type Props = {
  id: string;
  labelText: string;
  onChange: (value: string) => void;
  value?: string;
};

const TextInput: React.FC<Props> = ({ id, labelText, value, onChange }) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  return (
    <label htmlFor={id}>
      {labelText}:
      <input type="input" id={id} value={value} onChange={handleChange} />
    </label>
  );
};

export default TextInput;
