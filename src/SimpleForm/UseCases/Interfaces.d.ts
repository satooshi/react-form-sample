export interface Repository<T> {
  create: (viewModel: T) => Promise<any>;
}
