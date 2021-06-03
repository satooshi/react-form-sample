import React from 'react';
import { debuglog } from 'Utils';
import { ErrorMessage } from './Atoms/ErrorMessage';
import { FormCheckLabel } from './Atoms/FormCheckLabel';

type Props = {
  checked: boolean;
  error?: string;
  id: string;
  labelText: string;
  onChange: (value: boolean) => void;
  value: string;
};

export const Switch: React.FC<Props> = React.memo(
  ({ checked, error, id, labelText, onChange, value }) => {
    debuglog('render Switch', { id, value });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      onChange(event.target.checked);
    }

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
        <FormCheckLabel id={id} labelText={labelText} />
        <ErrorMessage error={error} />
      </div>
    );
  }
);
