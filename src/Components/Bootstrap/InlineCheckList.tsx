import React, { ChangeEvent } from 'react';
import ErrorMessage from './ErrorMessage';

type Value = string | number;
type Option = { label: string; value: Value };
export type ValueState = { [key: string]: boolean; [key: number]: boolean };

type Props = {
  error?: string;
  id: string;
  labelText: string;
  onChange: (value: ValueState) => void;
  values: ValueState;
  options: Option[];
};

const InlineCheckList: React.FC<Props> = ({
  error,
  id,
  labelText,
  onChange,
  options,
  values,
}) => {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange({
      [event.target.value]: event.target.checked,
    });
  }
  console.log('render InlineCheckList');

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
            type="checkbox"
            id={`${id}-${index}`}
            checked={values[option.value] === true}
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
  InlineCheckList,
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.values) === JSON.stringify(nextProps.values) &&
    prevProps.error === nextProps.error &&
    prevProps.onChange === nextProps.onChange &&
    JSON.stringify(prevProps.options) === JSON.stringify(nextProps.options)
);
