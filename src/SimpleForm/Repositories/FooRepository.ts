import FormViewModel from "../ViewModels/FormViewModel";
import {CommandDriver} from './Interfaces';
import {Repository} from '../UseCases/Interfaces';

interface CreateErrors {
  text1?: string;
}

type CheckValue = 'C1' | 'C2' | 'C3' | 'C4';
type RadioValue = 'R1' | 'R2' | 'R3';
type SelectValue = 'S1' | 'S2'| 'S3';

interface CreateRequest {
  text1: string;
  text2: string;
  textArea: string;
  checkList: CheckValue[];
  radioList: RadioValue;
  select: SelectValue;
  switch: boolean;
  inlineRadio: RadioValue;
  inlineCheck: CheckValue[];
}

export default class FooRepository implements Repository<FormViewModel> {
  #driver;

  constructor(driver: CommandDriver) {
    this.#driver = driver;
  }

  /** Persists a ViewModel to the backend API */
  async create(viewModel: FormViewModel) {
    // extract keys if the value is true
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

    const requestData: CreateRequest = {
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
      const response = await this.#driver.create<CreateErrors, CreateRequest>(requestData);

      return response.message;
    } catch(e) {
      return e.errors;
    }
  }
}
