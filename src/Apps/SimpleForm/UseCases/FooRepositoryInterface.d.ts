import { Repository } from "Framework/UseCases/Interfaces";
import FormViewModel from '../ViewModels/FormViewModel';

export default interface FooRepositoryInterface extends Repository<FormViewModel> {
  create: (viewModel: FormViewModel) => Promise<any>;
}
