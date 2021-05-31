import { ViewModel } from "../ViewModels/Interfaces";

export function toInt(value: string) {
  return parseInt(value, 10);
}

export function toFloat(value: string) {
  return parseFloat(value);
}

export function toNumber(value: string) {
  return Number(value);
}

/** Extracts keys if the value is true */
export function selectTrue<T extends {[key: string]: boolean}>(obj: T): (keyof T)[] {
  return Object.entries(obj).filter(a => a[1] === true).map(a => a[0] as keyof T);
}

/** Converts persistent data to view model  */
export type ToViewData<T extends ViewModel, P> = (persistentData: P) => T;

/** Converts view model to persistent data */
export type ToPersistentData<T extends ViewModel, P> = (viewModel: T) => P;
