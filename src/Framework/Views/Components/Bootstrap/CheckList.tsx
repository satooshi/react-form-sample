import React, { ChangeEvent, useCallback } from 'react';
import { debuglog } from 'Utils';
import { ErrorMessage } from './Atoms/ErrorMessage';
import { FormCheckLabel } from './Atoms/FormCheckLabel';
import { FormCheckInput } from './Atoms/FormCheckInput';
import { Option, ValueState } from './Types';

type Props = {
  error?: string;
  id: string;
  labelText: string;
  onChange: (value: ValueState) => void;
  values: ValueState;
  options: Option[];
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
            className={error ? 'form-check is-invalid' : 'form-check'}
            key={`${id}-${option.value}`}
          >
            <FormCheckInput
              error={error}
              type="checkbox"
              id={`${id}-${option.value}`}
              name={`${id}-${option.value}`}
              checked={values[option.value] === true}
              value={option.value}
              onChange={handleChange}
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
