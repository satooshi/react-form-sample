import FormViewModel from '../ViewModels/FormViewModel';
import FooRepositoryInterface from "./FooRepositoryInterface";

// TODO: This kind of UseCase might be unnecessary.
export default class FormUseCase {
  #repository;

  constructor(repository: FooRepositoryInterface) {
    this.#repository = repository;
  }

  create(viewModel: FormViewModel) {
    return this.#repository.create(viewModel);
  }
}
