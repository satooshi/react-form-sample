import React from 'react';

interface Props {
  id: string;
  labelText: string;
}

const FormLabel: React.FC<Props> = ({ id, labelText }) => {
  console.log('render FormLabel', { id, labelText });

  return (
    <label className="form-label" htmlFor={id}>
      {labelText}:
    </label>
  );
};

export default React.memo(FormLabel);
