import React from 'react';
import ErrorMessage from './ErrorMessage';

type Props = {
  error?: string;
  id: string;
  labelText: string;
  onChange: (value: string) => void; // TODO: onClick might be better than onChange
  value: string;
  checkedValue: string;
};

const Switch: React.FC<Props> = ({
  error,
  id,
  labelText,
  onChange,
  value,
  checkedValue,
}) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.checked ? event.target.value : '');
  }

  return (
    <div className="form-check form-switch">
      <input
        className={error ? 'form-check-input is-invalid' : 'form-check-input'}
        type="checkbox"
        id={id}
        onChange={handleChange}
        value={value}
        checked={value === checkedValue}
      />
      <label className="form-check-label" htmlFor={id}>
        {labelText}
      </label>
      <ErrorMessage error={error} />
    </div>
  );
};

export default Switch;
