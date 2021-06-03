import {
  selectTrue,
  ToPersistentData,
} from 'Framework/Repositories/ViewModelTransformer';
import { CreateRequest } from 'Framework/Repositories/FooApiDriverInterface';
import { FormViewModel } from '../ViewModels/FormViewModel';

// export const toViewData: ToViewData<FormViewModel> = () => (new FormViewModel({}));

export const toCreateRequest: ToPersistentData<FormViewModel, CreateRequest> = (
  viewModel
) => {
  if (viewModel.radioList === '') {
    throw new Error('radioList not satisfied the constraint');
  }
  if (viewModel.select === '') {
    throw new Error('select not satisfied the constraint');
  }
  if (viewModel.inlineRadio === '') {
    throw new Error('inlineRadio not satisfied the constraint');
  }

  const { inlineRadio, radioList, select, text1, text2, textArea } = viewModel;

  return {
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
};
