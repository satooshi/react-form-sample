import {FooApiDriverInterface} from 'Repositories/FooApiDriverInterface';
import {Repository} from "UseCases/Interfaces";
import FormViewModel from "../ViewModels/FormViewModel";
import {toCreateRequest} from './FormViewModelTransformer';

interface CreateErrors {
  text1?: string;
}

export default class FooRepository implements Repository<FormViewModel> {
  #driver;

  constructor(driver: FooApiDriverInterface) {
    this.#driver = driver;
  }

  /** Persists a ViewModel to the backend API */
  async create(viewModel: FormViewModel) {
    try {
      const request = toCreateRequest(viewModel);
      const response = await this.#driver.create<CreateErrors>(request);

      return response.message;
    } catch(e) {
      return e.errors;
    }
  }
}
