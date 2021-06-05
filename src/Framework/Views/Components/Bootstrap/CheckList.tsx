import { debuglog } from 'Utils';
import React, { ChangeEvent, useCallback } from 'react';
import { ErrorMessage } from './Atoms/ErrorMessage';
import { FormCheckInput } from './Atoms/FormCheckInput';
import { FormCheckLabel } from './Atoms/FormCheckLabel';
import { Option, ValueState } from './Types';

type Props = {
  error?: string;
  id: string;
  labelText: string;
  onChange: (value: ValueState) => void;
  options: Option[];
  values: ValueState;
};

const propsAreEqual = (
  prevProps: Readonly<Props>,
  nextProps: Readonly<Props>
) =>
  JSON.stringify(prevProps.values) === JSON.stringify(nextProps.values) &&
  prevProps.error === nextProps.error &&
  prevProps.onChange === nextProps.onChange &&
  JSON.stringify(prevProps.options) === JSON.stringify(nextProps.options);

export const CheckList: React.FC<Props> = React.memo(
  ({ error, id, labelText, onChange, options, values }) => {
    debuglog('render InlineCheckList', { id, values });

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        onChange({
          [event.target.value]: event.target.checked,
        });
      },
      [onChange]
    );

    return (
      <>
        <span className="form-check-inline">{labelText}</span>
        {options.map((option) => (
          <div
            key={`${id}-${option.value}`}
            className={error ? 'form-check is-invalid' : 'form-check'}
          >
            <FormCheckInput
              checked={values[option.value] === true}
              error={error}
              id={`${id}-${option.value}`}
              name={`${id}-${option.value}`}
              onChange={handleChange}
              type="checkbox"
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
