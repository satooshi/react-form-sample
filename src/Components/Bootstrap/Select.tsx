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

const Select: React.FC<Props> = ({
  error,
  id,
  labelText,
  onChange,
  options,
  value,
}) => {
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onChange(event.target.value);
  }
  console.log('render Select', { id });

  return (
    <>
      <label className="form-label" htmlFor={id}>
        {labelText}:
      </label>
      <select
        id={id}
        className={error ? 'form-select is-invalid' : 'form-select'}
        value={value}
        onChange={handleChange}
      >
        <option value="">Please Select {labelText}</option>
        {options.map((option) => (
          <option value={option} key={`${id}-${option}`}>
            {option}
          </option>
        ))}
      </select>
      <ErrorMessage error={error} />
    </>
  );
};

export default React.memo(
  Select,
  (prevProps, nextProps) =>
    prevProps.value === nextProps.value &&
    prevProps.error === nextProps.error &&
    prevProps.onChange === nextProps.onChange
  // prevProps.options === nextProps.options
);
