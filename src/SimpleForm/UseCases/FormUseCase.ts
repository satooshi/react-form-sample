import { Repository } from "./Interfaces";

export default class FormUseCase<T> {
  private _repository;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  create(viewModel: T) {
    return this._repository.create(viewModel);
  }
}
