export function isInteger(value: string) {
  return /^(\d+)$/.test(value);
}

export function isSignedInteger(value: string) {
  return /^[-+]?(\d+)$/.test(value);
}

export function isFloat(value: string) {
  return !Number.isNaN(Number(value)) && !Number.isNaN(parseFloat(value));
}
