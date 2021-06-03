import { FooApiDriverInterface } from 'Framework/Repositories/FooApiDriverInterface';
import { FormViewModel } from "../ViewModels/FormViewModel";
import {toCreateRequest} from './FormViewModelTransformer';
import {FooRepositoryInterface} from '../UseCases/FooRepositoryInterface';

interface CreateErrors {
  text1?: string;
}

export class FooRepository implements FooRepositoryInterface {
  #driver;

  constructor(driver: FooApiDriverInterface) {
    this.#driver = driver;
  }

  /** @inheritdoc */
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
