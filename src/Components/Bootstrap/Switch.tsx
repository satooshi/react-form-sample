import React from 'react';
import ErrorMessage from './ErrorMessage';

type Props = {
  checked: boolean;
  error?: string;
  id: string;
  labelText: string;
  onChange: (value: boolean) => void;
  value: string;
};

const Switch: React.FC<Props> = ({
  checked,
  error,
  id,
  labelText,
  onChange,
  value,
}) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.checked);
  }
  console.log('render Switch', { id });

  return (
    <div className="form-check form-switch">
      <input
        checked={checked}
        className={error ? 'form-check-input is-invalid' : 'form-check-input'}
        id={id}
        onChange={handleChange}
        type="checkbox"
        value={value}
      />
      <label className="form-check-label" htmlFor={id}>
        {labelText}
      </label>
      <ErrorMessage error={error} />
    </div>
  );
};

export default React.memo(Switch);
