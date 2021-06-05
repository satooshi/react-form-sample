import { ViewModel } from 'Framework/ViewModels/Interfaces';

export interface Repository<T extends ViewModel> {
  /** Persists a ViewModel to the backend API */
  create?: (viewModel: T) => Promise<any>; // eslint-disable-line @typescript-eslint/no-explicit-any

  /** Deletes a ViewModel to the backend API */
  delete?: (viewModel: T) => Promise<any>; // eslint-disable-line @typescript-eslint/no-explicit-any

  /** Finds a ViewModel from the backend API */
  find?: (query?: Record<string, unknown>) => Promise<T>;

  /** Finds ViewModels from the backend API */
  findAll?: (query?: Record<string, unknown>) => Promise<Array<T>>;

  /** Saves a ViewModel to the backend API */
  save?: (viewModel: T) => Promise<any>; // eslint-disable-line @typescript-eslint/no-explicit-any

  /** Updates a ViewModel to the backend API */
  update?: (viewModel: T) => Promise<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}
