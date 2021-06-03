export class TypeValidator {
  static isInteger(value: string) {
    return /^(\d+)$/.test(value);
  }

  static isSignedInteger(value: string) {
    return /^[-+]?(\d+)$/.test(value);
  }

  static isFloat(value: string) {
    return !Number.isNaN(Number(value)) && !Number.isNaN(parseFloat(value));
  }
}
