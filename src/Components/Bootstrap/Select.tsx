import React from 'react';
import ErrorMessage from './Atoms/ErrorMessage';
import FormLabel from './Atoms/FormLabel';
import { Option, Value } from './Types';

type Props = {
  error?: string;
  id: string;
  labelText: string;
  onChange: (value: string) => void;
  value?: Value;
  options: Option[];
};

const Select: React.FC<Props> = ({
  error,
  id,
  labelText,
  onChange,
  options,
  value,
}) => {
  console.log('render Select', { id });

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onChange(event.target.value);
  }

  return (
    <>
      <FormLabel id={id} labelText={labelText} />
      <select
        id={id}
        name={id}
        className={error ? 'form-select is-invalid' : 'form-select'}
        value={value}
        onChange={handleChange}
      >
        {options.map((option) => (
          <option value={option.value} key={`${id}-${option.value}`}>
            {option.label}
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
    prevProps.onChange === nextProps.onChange &&
    JSON.stringify(prevProps.options) === JSON.stringify(nextProps.options)
);
