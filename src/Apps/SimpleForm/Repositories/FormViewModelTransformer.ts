import { CreateRequest } from 'Framework/Repositories/FooApiDriverInterface';
import {
  selectTrue,
  ToPersistentData,
} from 'Framework/Repositories/ViewModelTransformer';
import { FormViewModel } from '../ViewModels/FormViewModel';

// export const toViewData: ToViewData<FormViewModel> = () => (new FormViewModel({}));

export const toCreateRequest: ToPersistentData<FormViewModel, CreateRequest> = (
  viewModel
) => {
  if (viewModel.radioList === '') {
    throw new Error('radioList does not satisfy the constraint');
  }
  if (viewModel.select === '') {
    throw new Error('select does not satisfy the constraint');
  }
  if (viewModel.inlineRadio === '') {
    throw new Error('inlineRadio does not satisfy the constraint');
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
