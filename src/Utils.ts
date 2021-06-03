export const debuglog = <T>(log: string, debugProps?: T) => {
  if (process.env.NODE_ENV === 'development') {
    if (debugProps) {
      console.log(`${log}`, { ...debugProps }); // eslint-disable-line no-console
    } else {
      console.log(`${log}`); // eslint-disable-line no-console
    }
  }
};
