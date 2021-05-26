import React from 'react';
import ErrorMessage from './ErrorMessage';

type Props = {
  error?: string;
  id: string;
  labelText: string;
  onChange: (value: string) => void;
  value?: string;
  options: string[];
};

const RadioList: React.FC<Props> = ({
  error,
  id,
  labelText,
  onChange,
  value,
  options,
}) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }
  console.log('render RadioList', { id });

  return (
    <>
      <span>{labelText}</span>
      {options.map((option, index) => (
        <div
          className={error ? 'form-check is-invalid' : 'form-check'}
          key={`${id}-${option}`}
        >
          <input
            className={
              error ? 'form-check-input is-invalid' : 'form-check-input'
            }
            type="radio"
            id={`${id}-${index}`}
            checked={value === option}
            value={option}
            onChange={handleChange}
          />
          <label
            className={
              error ? 'form-check-label is-invalid' : 'form-check-label'
            }
            htmlFor={`${id}-${index}`}
          >
            {option}
          </label>
        </div>
      ))}
      <ErrorMessage error={error} />
    </>
  );
};

export default RadioList;
