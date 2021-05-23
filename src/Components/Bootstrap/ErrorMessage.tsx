import React from 'react';

type Props = {
  error?: string;
};

const ErrorMessage: React.FC<Props> = ({ error }) => (
  <>{error ? <div className="invalid-feedback">{error}</div> : null}</>
);

export default ErrorMessage;
