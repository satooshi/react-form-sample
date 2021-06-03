import React from 'react';
import { debuglog } from 'Utils';

interface Props {
  id: string;
  labelText: string;
}

export const FormLabel: React.FC<Props> = React.memo(({ id, labelText }) => {
  debuglog('render FormLabel', { id, labelText });

  return (
    <label className="form-label" htmlFor={id}>
      {labelText}:
    </label>
  );
});
