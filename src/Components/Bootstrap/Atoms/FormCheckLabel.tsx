import React from 'react';

interface Props {
  id: string;
  labelText: string;
}

const FormCheckLabel: React.FC<Props> = ({ id, labelText }) => {
  console.log('render FormCheckLabel');

  return (
    <label className="form-check-label" htmlFor={id}>
      {labelText}
    </label>
  );
};

export default React.memo(FormCheckLabel);
