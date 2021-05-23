import React, { useState } from 'react';
import FormViewModel, {
  InlineRadioOption,
  InlineCheckOptions,
  SelectOption,
  Props,
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
import FormUseCase from '../UseCases/FormUseCase';

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

interface FormProps {
  useCase: FormUseCase<FormViewModel>;
}

const Form: React.FC<FormProps> = ({ useCase }) => {
  const [state, setState] = useState(initState);
  const viewModel = new FormViewModel(state);
  console.log(viewModel);

  function handleTextChange1(value: string) {
    viewModel.text1 = value;
    setState(viewModel.serialized);
  }

  function handleTextChange2(value: string) {
    viewModel.text2 = value;
    setState(viewModel.serialized);
  }

  function handleTextAreaChange(value: string) {
    viewModel.textArea = value;
    setState(viewModel.serialized);
  }

  function handleRadioListChange(value: string) {
    viewModel.radioList = value;
    setState(viewModel.serialized);
  }

  function handleSelectChange(value: string) {
    viewModel.select = value as SelectOption;
    setState(viewModel.serialized);
  }

  function handleSwitchChange(value: boolean) {
    viewModel.switch = value;
    setState(viewModel.serialized);
  }

  function handleInlineCheckChange(value: ValueState) {
    viewModel.replaceInlineCheck(value as InlineCheckOptions);
    setState(viewModel.serialized);
  }

  function handleInlineRadioChange(value: string) {
    viewModel.inlineRadio = value as InlineRadioOption;
    setState(viewModel.serialized);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formErrors = viewModel.validate();

    if (Object.keys(formErrors).length === 0) {
      await useCase.create(viewModel);

      setState(new FormViewModel(initState));
    } else {
      setState(viewModel.serialized);
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
          error={viewModel.errors.text1}
        />
      </div>

      <div className="mb-3">
        <TextInput
          id="text2"
          labelText="Text2"
          value={viewModel.text2}
          onChange={handleTextChange2}
          error={viewModel.errors.text2}
        />
      </div>

      <div className="mb-3">
        <TextArea
          id="text-area"
          labelText="Text Area"
          value={viewModel.textArea}
          onChange={handleTextAreaChange}
          error={viewModel.errors.textArea}
        />
      </div>

      <div className="mb-3">
        <Select
          id="select"
          labelText="Select"
          value={viewModel.select}
          onChange={handleSelectChange}
          error={viewModel.errors.select}
          options={['option1', 'option2', 'option3']}
        />
      </div>

      <div className="mb-3">
        <RadioList
          id="radio-list"
          labelText="Radio List:"
          value={viewModel.radioList}
          onChange={handleRadioListChange}
          error={viewModel.errors.radioList}
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
          error={viewModel.errors.switch}
        />
      </div>

      <div className="mb-3">
        <InlineCheckList
          id="inline-check"
          labelText="Inline check list:"
          values={viewModel.inlineCheck}
          onChange={handleInlineCheckChange}
          error={viewModel.errors.inlineCheck}
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
          error={viewModel.errors.inlineRadio}
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
