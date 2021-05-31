import React from 'react';
import { debuglog } from 'Utils';

interface Props {
  id: string;
  labelText: string;
}

const FormLabel: React.FC<Props> = ({ id, labelText }) => {
  debuglog('render FormLabel', { id, labelText });

  return (
    <label className="form-label" htmlFor={id}>
      {labelText}:
    </label>
  );
};

export default React.memo(FormLabel);
