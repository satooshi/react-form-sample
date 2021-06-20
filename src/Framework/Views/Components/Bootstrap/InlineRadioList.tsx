import { debuglog } from 'Utils';
import React, { ChangeEvent, useCallback } from 'react';
import { ErrorMessage } from './Atoms/ErrorMessage';
import { FormCheckInput } from './Atoms/FormCheckInput';
import { FormCheckLabel } from './Atoms/FormCheckLabel';
import { Option, Value } from './Types';

export interface Props {
  error?: string;
  id: string;
  labelText: string;
  onChange: (value: string) => void;
  options: Option[];
  value: Value;
}

const propsAreEqual = (
  prevProps: Readonly<Props>,
  nextProps: Readonly<Props>
) =>
  prevProps.value === nextProps.value &&
  prevProps.error === nextProps.error &&
  prevProps.onChange === nextProps.onChange &&
  JSON.stringify(prevProps.options) === JSON.stringify(nextProps.options);

export const InlineRadioList: React.FC<Props> = React.memo(
  ({ error, id, labelText, onChange, options, value }) => {
    debuglog('render InlineRadioList', { id, value });

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
      },
      [onchange]
    );

    return (
      <>
        <span className="form-check-inline">{labelText}</span>
        {options.map((option) => (
          <div
            key={`${id}-${option.value}`}
            className={
              error
                ? 'form-check form-check-inline is-invalid'
                : 'form-check form-check-inline'
            }
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
