import { FooApiDriverInterface } from 'Framework/Repositories/FooApiDriverInterface';
import { FooRepositoryInterface } from '../UseCases/FooRepositoryInterface';
import { FormViewModel } from '../ViewModels/FormViewModel';
import { toCreateRequest } from './FormViewModelTransformer';

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
    } catch (e) {
      return e.errors;
    }
  }
}
