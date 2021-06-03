import React from 'react';
import { debuglog } from 'Utils';

type Props = {
  error?: string;
};

export const ErrorMessage: React.FC<Props> = React.memo(({ error }) => {
  debuglog('render ErrorMessage', { error });
  return <>{error ? <div className="invalid-feedback">{error}</div> : null}</>;
});
