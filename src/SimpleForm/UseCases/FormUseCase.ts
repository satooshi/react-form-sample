import { Repository } from "./Interfaces";

// TODO: This kind of UseCase might be unnecessary.
export default class FormUseCase<T> {
  private _repository;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  create(viewModel: T) {
    return this._repository.create(viewModel);
  }
}
