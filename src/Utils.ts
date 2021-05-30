/* eslint-disable import/prefer-default-export */

export const debuglog = (log: string, debugProps?: object) => {
  if (process.env.NODE_ENV === 'development') {
    if (debugProps) {
      console.log(`${log}`, { ...debugProps }); // eslint-disable-line no-console
    } else {
      console.log(`${log}`); // eslint-disable-line no-console
    }
  }
};
