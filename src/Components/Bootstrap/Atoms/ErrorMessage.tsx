import React from 'react';
import { debuglog } from 'Utils';

type Props = {
  error?: string;
};

const ErrorMessage: React.FC<Props> = ({ error }) => {
  debuglog('render ErrorMessage', { error });
  return <>{error ? <div className="invalid-feedback">{error}</div> : null}</>;
};

export default React.memo(ErrorMessage);
