import React from 'react';
import ErrorMessage from './ErrorMessage';

type Props = {
  error?: string;
  id: string;
  labelText: string;
  /** Use this to reduce re-render */
  onBlur?: (value: string) => void;
  /** Use this to track all text change */
  onChange?: (value: string) => void;
  value?: string;
};

const TextInput: React.FC<Props> = ({
  error,
  id,
  labelText,
  onChange,
  onBlur,
  value,
}) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (onChange) {
      onChange(event.target.value);
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    if (onBlur) {
      onBlur(event.target.value);
    }
  }

  const conditionalProps = onBlur
    ? { onBlur: handleBlur, defalutvalue: value }
    : { onChange: handleChange, value };

  return (
    <>
      <label className="form-label" htmlFor={id}>
        {labelText}:
      </label>
      <input
        type="input"
        id={id}
        className={error ? 'form-control is-invalid' : 'form-control'}
        {...conditionalProps} // eslint-disable-line react/jsx-props-no-spreading
      />
      <ErrorMessage error={error} />
    </>
  );
};

export default TextInput;
