import { debuglog } from 'Utils';
import React from 'react';
import { ErrorMessage } from './Atoms/ErrorMessage';
import { FormLabel } from './Atoms/FormLabel';
import { Option, Value } from './Types';

type Props = {
  error?: string;
  id: string;
  labelText: string;
  onChange: (value: string) => void;
  options: Option[];
  value?: Value;
};

const propsAreEqual = (
  prevProps: Readonly<Props>,
  nextProps: Readonly<Props>
) =>
  prevProps.value === nextProps.value &&
  prevProps.error === nextProps.error &&
  prevProps.onChange === nextProps.onChange &&
  JSON.stringify(prevProps.options) === JSON.stringify(nextProps.options);

export const Select: React.FC<Props> = React.memo(
  ({ error, id, labelText, onChange, options, value }) => {
    debuglog('render Select', { id, value });

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
      onChange(event.target.value);
    }

    return (
      <>
        <FormLabel id={id} labelText={labelText} />
        <select
          className={error ? 'form-select is-invalid' : 'form-select'}
          id={id}
          name={id}
          onChange={handleChange}
          value={value}
        >
          {options.map((option) => (
            <option key={`${id}-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ErrorMessage error={error} />
      </>
    );
  },
  propsAreEqual
);
