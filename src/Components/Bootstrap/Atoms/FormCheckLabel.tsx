import React from 'react';
import { debuglog } from 'Utils';

interface Props {
  id: string;
  labelText: string;
}

const FormCheckLabel: React.FC<Props> = ({ id, labelText }) => {
  debuglog('render FormCheckLabel', { id, labelText });

  return (
    <label className="form-check-label" htmlFor={id}>
      {labelText}
    </label>
  );
};

export default React.memo(FormCheckLabel);
