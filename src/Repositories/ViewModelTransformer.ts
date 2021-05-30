/* eslint-disable class-methods-use-this */
import { ViewModel } from "../ViewModels/Interfaces";

export default abstract class ViewModelTransformer<V extends ViewModel> {
  protected viewModel: V;

  constructor(viewModel: V) {
    this.viewModel = viewModel;
  }

  /** Transform the view model to the view representation */
  abstract toViewData(): object;

  /** Transform the view model to the persistent representation */
  abstract toPersistentData(): object;

  protected toInt(value: string) {
    return parseInt(value, 10);
  }

  protected toFloat(value: string) {
    return parseFloat(value);
  }

  protected toNumber(value: string) {
    return Number(value);
  }

  /** Extracts keys if the value is true */
  protected selectTrue<T extends {[key: string]: boolean}>(obj: T): (keyof T)[] {
    return Object.entries(obj).filter(a => a[1] === true).map(a => a[0] as keyof T);
  }
}
