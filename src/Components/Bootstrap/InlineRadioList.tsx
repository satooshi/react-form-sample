import React, { ChangeEvent } from 'react';
import ErrorMessage from './ErrorMessage';

type Value = string | number;
type Option = { label: string; value: Value };

type Props = {
  error?: string;
  id: string;
  labelText: string;
  onChange: (value: string) => void;
  value: string;
  options: Option[];
};

const InlineRadioList: React.FC<Props> = ({
  error,
  id,
  labelText,
  onChange,
  options,
  value,
}) => {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }

  console.log('render InlineRadioList');
  return (
    <>
      <span className="form-check-inline">{labelText}</span>
      {options.map((option, index) => (
        <div
          className={
            error
              ? 'form-check form-check-inline is-invalid'
              : 'form-check form-check-inline'
          }
          key={`${id}-${option.value}`}
        >
          <input
            className={
              error ? 'form-check-input is-invalid' : 'form-check-input'
            }
            type="radio"
            id={`${id}-${index}`}
            name={id}
            checked={option.value === value}
            value={option.value}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor={`${id}-${index}`}>
            {option.label}
          </label>
        </div>
      ))}
      <ErrorMessage error={error} />
    </>
  );
};

export default React.memo(
  InlineRadioList,
  (prevProps, nextProps) =>
    prevProps.value === nextProps.value &&
    prevProps.error === nextProps.error &&
    prevProps.onChange === nextProps.onChange
  // prevProps.options === nextProps.options
);
