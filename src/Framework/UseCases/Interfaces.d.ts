import { ViewModel } from "Framework/ViewModels/Interfaces";

export interface Repository<T extends ViewModel> {
  /** Persists a ViewModel to the backend API */
  create?: (viewModel: T) => Promise<any>;

  /** Updates a ViewModel to the backend API */
  update?: (viewModel: T) => Promise<any>;

  /** Saves a ViewModel to the backend API */
  save?: (viewModel: T) => Promise<any>;

  /** Deletes a ViewModel to the backend API */
  delete?: (viewModel: T) => Promise<any>;

  /** Finds a ViewModel from the backend API */
  find?: (query?: any) => Promise<T>;

  /** Finds ViewModels from the backend API */
  findAll?: (query?: any) => Promise<Array<T>>;
}
