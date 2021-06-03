import React from 'react';
import { debuglog } from 'Utils';
import { ErrorMessage } from './Atoms/ErrorMessage';
import { FormLabel } from './Atoms/FormLabel';

type Props = {
  error?: string;
  id: string;
  labelText: string;
  onChange: (value: string) => void;
  value?: string;
};

export const TextArea: React.FC<Props> = React.memo(
  ({ error, id, labelText, onChange, value }) => {
    debuglog('render TextArea', { id, value });

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
      onChange(event.target.value);
    }

    return (
      <>
        <FormLabel id={id} labelText={labelText} />
        <textarea
          id={id}
          onChange={handleChange}
          className={error ? 'form-control is-invalid' : 'form-control'}
          value={value}
        />
        <ErrorMessage error={error} />
      </>
    );
  }
);