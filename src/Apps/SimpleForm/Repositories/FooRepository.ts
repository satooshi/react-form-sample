import {FooApiDriverInterface} from 'Repositories/FooApiDriverInterface';
import {Repository} from "UseCases/Interfaces";
import FormViewModel from "../ViewModels/FormViewModel";

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
    // extract keys if the value is true
    // TODO: Refactor to DataTransformer
    const selectTrue = <T extends {[key: string]: boolean}>(obj: T): (keyof T)[] => (
      Object.entries(obj).filter(a => a[1] === true).map(a => a[0] as keyof T)
    );

    // Assert values to pass the type check
    if (viewModel.radioList === '') {
      throw new Error('radioList not satisfied the constraint');
    }
    if (viewModel.select === '') {
      throw new Error('select not satisfied the constraint');
    }
    if (viewModel.inlineRadio === '') {
      throw new Error('inlineRadio not satisfied the constraint');
    }

    const {
      inlineRadio,
      radioList,
      select,
      text1,
      text2,
      textArea
    } = viewModel;

    const requestData = {
      checkList: selectTrue(viewModel.checkList),
      inlineCheck: selectTrue(viewModel.inlineCheck),
      inlineRadio,
      radioList,
      select,
      switch: viewModel.switch,
      text1,
      text2,
      textArea,
    };

    try {
      const response = await this.#driver.create<CreateErrors>(requestData);

      return response.message;
    } catch(e) {
      return e.errors;
    }
  }
}
