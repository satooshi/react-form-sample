import React, { useCallback } from 'react';
import { debuglog } from 'Utils';
import { ErrorMessage } from './Atoms/ErrorMessage';
import { FormCheckLabel } from './Atoms/FormCheckLabel';
import { FormCheckInput } from './Atoms/FormCheckInput';
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

export const RadioList: React.FC<Props> = React.memo(
  ({ error, id, labelText, onChange, options, value }) => {
    debuglog('render RadioList', { id, value });

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
      },
      [onChange]
    );

    return (
      <>
        <span>{labelText}</span>
        {options.map((option) => (
          <div
            className={error ? 'form-check is-invalid' : 'form-check'}
            key={`${id}-${option.value}`}
          >
            <FormCheckInput
              checked={option.value === value}
              error={error}
              id={`${id}-${option.value}`}
              name={id}
              onChange={handleChange}
              type="radio"
              value={option.value}
            />
            <FormCheckLabel
              id={`${id}-${option.value}`}
              labelText={option.label}
            />
          </div>
        ))}
        <ErrorMessage error={error} />
      </>
    );
  },
  propsAreEqual
);