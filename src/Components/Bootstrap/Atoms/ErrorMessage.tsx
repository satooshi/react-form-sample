import React from 'react';

type Props = {
  error?: string;
};

const ErrorMessage: React.FC<Props> = ({ error }) => {
  console.log('render ErrorMessage', { error });
  return <>{error ? <div className="invalid-feedback">{error}</div> : null}</>;
};

export default React.memo(ErrorMessage);
