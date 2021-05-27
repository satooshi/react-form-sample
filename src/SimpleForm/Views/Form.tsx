import React, { useState, useCallback } from 'react';
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
import { useViewModel } from '../Bridges/ReactBridge';

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
  const [submitting, setSubmitting] = useState(false);
  const [viewModel, setViewModel] = useViewModel(new FormViewModel(initState));

  console.log('render Form', { viewModel });

  const handleTextChange1 = useCallback((value: string) => {
    viewModel.text1 = value;
    setViewModel(viewModel);
  }, []);

  const handleTextChange2 = useCallback((value: string) => {
    viewModel.text2 = value;
    setViewModel(viewModel);
  }, []);

  const handleTextAreaChange = useCallback((value: string) => {
    viewModel.textArea = value;
    setViewModel(viewModel);
  }, []);

  const handleRadioListChange = useCallback((value: string) => {
    viewModel.radioList = value;
    setViewModel(viewModel);
  }, []);

  const handleSelectChange = useCallback((value: string) => {
    viewModel.select = value as SelectOption;
    setViewModel(viewModel);
  }, []);

  const handleSwitchChange = useCallback((value: boolean) => {
    viewModel.switch = value;
    setViewModel(viewModel);
  }, []);

  const handleInlineCheckChange = useCallback((value: ValueState) => {
    viewModel.replaceInlineCheck(value as InlineCheckOptions);
    setViewModel(viewModel);
  }, []);

  const handleInlineRadioChange = useCallback((value: string) => {
    viewModel.inlineRadio = value as InlineRadioOption;
    setViewModel(viewModel);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    console.log('Submitting the form');
    setSubmitting(true);
    e.preventDefault();

    const formErrors = viewModel.validate();

    if (Object.keys(formErrors).length === 0) {
      await useCase.create(viewModel);

      setViewModel(new FormViewModel(initState));
      setSubmitting(false);
    } else {
      setViewModel(viewModel);
      setSubmitting(false);
    }
  }

  return (
    <form noValidate>
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

      <button
        type="submit"
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={submitting}
      >
        submit
      </button>
    </form>
  );
};

export default Form;
