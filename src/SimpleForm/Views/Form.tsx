import React, { useState } from 'react';
import FormViewModel, {
  InlineRadioOption,
  InlineCheckOptions,
  SelectOption,
  Props,
  Errors,
} from '../ViewModels/FormViewModel';
import InlineCheckList, {
  ValueState,
} from '../../Components/Bootstrap/InlineCheckList';
import InlineRadioList from '../../Components/Bootstrap/InlineRadioList';
import RadioList from '../../Components/Bootstrap/RadioList';
import Select from '../../Components/Bootstrap/Select';
import Switch from '../../Components/Bootstrap/Switch';
import TextArea from '../../Components/Bootstrap/TextArea';
import TextInput from '../../Components/Bootstrap/TextInput';

const initState: Props = {
  text1: '',
  text2: '',
  textArea: '',
  radioList: '',
  select: '',
  switch: false,
  inlineCheck: {} as InlineCheckOptions,
  inlineRadio: '',
};

const Form: React.FC = () => {
  const [state, setState] = useState(initState);
  const viewModel = new FormViewModel(state);
  const [errors, setErrors] = useState({} as Errors);

  function handleTextChange1(value: string) {
    viewModel.text1 = value;
    setState(viewModel.serialize());
  }

  function handleTextChange2(value: string) {
    viewModel.text2 = value;
    setState(viewModel);
  }

  function handleTextAreaChange(value: string) {
    viewModel.textArea = value;
    setState(viewModel);
  }

  function handleRadioListChange(value: string) {
    viewModel.radioList = value;
    setState(viewModel);
  }

  function handleSelectChange(value: string) {
    viewModel.select = value as SelectOption;
    setState(viewModel);
  }

  function handleSwitchChange(value: boolean) {
    viewModel.switch = value;
    setState(viewModel);
  }

  function handleInlineCheckChange(value: ValueState) {
    viewModel.replaceInlineCheck(value as InlineCheckOptions);
    setState(viewModel);
  }

  function handleInlineRadioChange(value: string) {
    viewModel.inlineRadio = value as InlineRadioOption;
    setState(viewModel);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formErrors = viewModel.validate();
    setErrors({ ...formErrors });

    if (Object.keys(formErrors).length === 0) {
      setState(new FormViewModel(initState));
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <TextInput
          id="text1"
          labelText="Text1"
          value={viewModel.text1}
          onChange={handleTextChange1}
          error={errors.text1}
        />
      </div>

      <div className="mb-3">
        <TextInput
          id="text2"
          labelText="Text2"
          value={viewModel.text2}
          onChange={handleTextChange2}
          error={errors.text2}
        />
      </div>

      <div className="mb-3">
        <TextArea
          id="text-area"
          labelText="Text Area"
          value={viewModel.textArea}
          onChange={handleTextAreaChange}
          error={errors.textArea}
        />
      </div>

      <div className="mb-3">
        <Select
          id="select"
          labelText="Select"
          value={viewModel.select}
          onChange={handleSelectChange}
          error={errors.select}
          options={['option1', 'option2', 'option3']}
        />
      </div>

      <div className="mb-3">
        <RadioList
          id="radio-list"
          labelText="Radio List:"
          value={viewModel.radioList}
          onChange={handleRadioListChange}
          error={errors.radioList}
          options={['radio1', 'radio2', 'radio3']}
        />
      </div>

      <div className="mb-3">
        <Switch
          id="switch"
          labelText="Switch here"
          value="nyan"
          checked={viewModel.switch}
          onChange={handleSwitchChange}
          error={errors.switch}
        />
      </div>

      <div className="mb-3">
        <InlineCheckList
          id="inline-check"
          labelText="Inline check list:"
          values={viewModel.inlineCheck}
          onChange={handleInlineCheckChange}
          error={errors.inlineCheck}
          options={[
            { label: 'check1', value: '1' },
            { label: 'check2', value: '2' },
          ]}
        />
      </div>

      <div className="mb-3">
        <InlineRadioList
          id="inline-radio"
          labelText="Inline radio list:"
          value={viewModel.inlineRadio}
          onChange={handleInlineRadioChange}
          error={errors.inlineRadio}
          options={[
            { label: 'check1', value: '1' },
            { label: 'check2', value: '2' },
          ]}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        submit
      </button>
    </form>
  );
};

export default Form;
