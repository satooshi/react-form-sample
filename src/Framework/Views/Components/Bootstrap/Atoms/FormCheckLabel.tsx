import React from 'react';
import { debuglog } from 'Utils';

interface Props {
  id: string;
  labelText: string;
}

export const FormCheckLabel: React.FC<Props> = React.memo(
  ({ id, labelText }) => {
    debuglog('render FormCheckLabel', { id, labelText });

    return (
      <label className="form-check-label" htmlFor={id}>
        {labelText}
      </label>
    );
  }
);
