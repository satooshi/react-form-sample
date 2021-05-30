/* eslint-disable class-methods-use-this */

import ViewModelTransformer from "Repositories/ViewModelTransformer";
import FormViewModel from "../ViewModels/FormViewModel";

export default class FormViewModelTransformer extends ViewModelTransformer<FormViewModel> {
  toViewData() {
    return {};
  }

  toPersistentData() {
    if (this.viewModel.radioList === '') {
      throw new Error('radioList not satisfied the constraint');
    }
    if (this.viewModel.select === '') {
      throw new Error('select not satisfied the constraint');
    }
    if (this.viewModel.inlineRadio === '') {
      throw new Error('inlineRadio not satisfied the constraint');
    }

    const {
      inlineRadio,
      radioList,
      select,
      text1,
      text2,
      textArea
    } = this.viewModel;

    return {
      checkList: this.selectTrue(this.viewModel.checkList),
      inlineCheck: this.selectTrue(this.viewModel.inlineCheck),
      inlineRadio,
      radioList,
      select,
      switch: this.viewModel.switch,
      text1,
      text2,
      textArea,
    };
  }
}