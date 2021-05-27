import React from 'react';
import ErrorMessage from './ErrorMessage';

type Props = {
  error?: string;
  id: string;
  labelText: string;
  onChange: (value: string) => void;
  value?: string;
};

const TextArea: React.FC<Props> = ({
  error,
  id,
  labelText,
  onChange,
  value,
}) => {
  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange(event.target.value);
  }
  console.log('render TextArea', { id });

  return (
    <>
      <label className="form-label" htmlFor={id}>
        {labelText}
      </label>
      <textarea
        id={id}
        onChange={handleChange}
        className={error ? 'form-control is-invalid' : 'form-control'}
        value={value}
      />
      <ErrorMessage error={error} />
    </>
  );
};

export default React.memo(TextArea);
