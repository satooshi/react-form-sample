export interface ViewModel {
  /** Returns serialized data */
  get serialized(): object;

  /** Returns the view model is valid */
  get isValid(): boolean;

  /** Returns errors if the view model is invalid */
  get errors(): {[key: string]: string};
}
