export interface ViewModel {
  /** Returns serialized ViewModel state */
  get serialized(): Record<string, unknown>;

  /** Returns whether the ViewModel is valid */
  get isValid(): boolean;

  /** Returns errors if the ViewModel is invalid */
  get errors(): {[key: string]: string};
}
