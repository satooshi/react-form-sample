import { debuglog } from 'Utils';
import React from 'react';
import { FormLabel, ErrorMessage } from './Atoms';

export interface Props {
  error?: string;
  id: string;
  labelText: string;
  onChange: (file: File | null) => void;
}

/** Single file input */
export const FileInput: React.FC<Props> = React.memo(
  ({ id, error, labelText, onChange }) => {
    debuglog('render FileInput', { error, id });
    const invalidClass = error ? 'is-invalid' : '';

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const file = event.target.files[0] ? event.target.files[0] : null;
        onChange(file);
      } else {
        onChange(null);
      }
    };

    return (
      <>
        <FormLabel id={id} labelText={labelText} />
        <input
          className={['form-control', invalidClass].join(' ')}
          id={id}
          onChange={handleChange}
          type="file"
        />
        <ErrorMessage error={error} />
      </>
    );
  }
);
