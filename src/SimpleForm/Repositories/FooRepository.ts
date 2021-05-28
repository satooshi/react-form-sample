import FormViewModel from "../ViewModels/FormViewModel";
import {CommandDriver} from './Interfaces';
import {Repository} from '../UseCases/Interfaces';

type CreateErrors = {
  text1?: string;
}

export default class FooRepository implements Repository<FormViewModel> {
  #driver;

  constructor(driver: CommandDriver) {
    this.#driver = driver;
  }

  async create(viewModel: FormViewModel) {
    const requestData = {
      text1: viewModel.text1,
      text2: viewModel.text2,
      textArea: viewModel.textArea,
      radioList: viewModel.radioList,
      select: viewModel.select,
      switch: viewModel.switch,
      inlineRadio: viewModel.inlineRadio,
      inlineCheck: viewModel.inlineCheck,
    };

    try {
      const response = await this.#driver.create<CreateErrors, typeof requestData>(requestData);

      return response.message;
    } catch(e) {
      return e.errors;
    }
  }
}
