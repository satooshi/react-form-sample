import { Repository } from 'Framework/UseCases/Interfaces';
import { FormViewModel } from '../ViewModels/FormViewModel';

export interface FooRepositoryInterface extends Repository<FormViewModel> {
  create: (viewModel: FormViewModel) => Promise<any>;
}
