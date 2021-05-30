import { Repository } from "UseCases/Interfaces";

// TODO: This kind of UseCase might be unnecessary.
export default class FormUseCase<T> {
  #repository;

  constructor(repository: Repository<T>) {
    this.#repository = repository;
  }

  create(viewModel: T) {
    return this.#repository.create(viewModel);
  }
}
