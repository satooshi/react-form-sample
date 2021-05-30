import React, { useState, useCallback } from 'react';
import FormViewModel, {
  CheckOptions,
  RadioValue,
  SelectValue,
} from '../ViewModels/FormViewModel';
import { ValueState } from '../../Components/Bootstrap/Types';
import InlineRadioList from '../../Components/Bootstrap/InlineRadioList';
import InlineCheckList from '../../Components/Bootstrap/InlineCheckList';
import CheckList from '../../Components/Bootstrap/CheckList';
import RadioList from '../../Components/Bootstrap/RadioList';
import Select from '../../Components/Bootstrap/Select';
import Switch from '../../Components/Bootstrap/Switch';
import TextArea from '../../Components/Bootstrap/TextArea';
import TextInput from '../../Components/Bootstrap/TextInput';
import FormUseCase from '../UseCases/FormUseCase';
import { useViewModel } from '../Bridges/ReactBridge';

interface FormProps {
  useCase: FormUseCase<FormViewModel>;
  initialViewModel: FormViewModel;
  onSubmitSuccess?: (
    setViewModel: (nextViewModel: FormViewModel) => void
  ) => void;
}

const Form: React.FC<FormProps> = ({
  useCase,
  initialViewModel,
  onSubmitSuccess,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [viewModel, setViewModel] = useViewModel(initialViewModel);

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

  const handleCheckListChange = useCallback((value: ValueState) => {
    viewModel.replaceCheckList(value as CheckOptions);
    setViewModel(viewModel);
  }, []);

  const handleRadioListChange = useCallback((value: string) => {
    viewModel.radioList = value as RadioValue;
    setViewModel(viewModel);
  }, []);

  const handleSelectChange = useCallback((value: string) => {
    viewModel.select = value as SelectValue;
    setViewModel(viewModel);
  }, []);

  const handleSwitchChange = useCallback((value: boolean) => {
    viewModel.switch = value;
    setViewModel(viewModel);
  }, []);

  const handleInlineCheckChange = useCallback((value: ValueState) => {
    viewModel.replaceInlineCheck(value as CheckOptions);
    setViewModel(viewModel);
  }, []);

  const handleInlineRadioChange = useCallback((value: string) => {
    viewModel.inlineRadio = value as RadioValue;
    setViewModel(viewModel);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    setSubmitting(true);
    e.preventDefault();

    const formErrors = viewModel.validate();

    if (Object.keys(formErrors).length === 0) {
      console.log('Submitting the form');
      await useCase.create(viewModel);

      if (onSubmitSuccess) {
        onSubmitSuccess(setViewModel);
      }

      setSubmitting(false);
    } else {
      console.log('the form validation failed', { errors: viewModel.errors });
      setViewModel(viewModel); // notify errors
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
          options={[
            { label: 'Please select', value: '' },
            { label: 'option1', value: 'S1' },
            { label: 'option2', value: 'S2' },
            { label: 'option3', value: 'S3' },
          ]}
        />
      </div>
      <div className="mb-3">
        <CheckList
          id="check_list"
          labelText="Check List:"
          values={viewModel.checkList}
          onChange={handleCheckListChange}
          error={viewModel.errors.checkList}
          options={[
            { label: 'check1', value: 'C1' },
            { label: 'check2', value: 'C2' },
            { label: 'check3', value: 'C3' },
            { label: 'check4', value: 'C4' },
          ]}
        />
      </div>
      <div className="mb-3">
        <RadioList
          id="radio-list"
          labelText="Radio List:"
          value={viewModel.radioList}
          onChange={handleRadioListChange}
          error={viewModel.errors.radioList}
          options={[
            { label: 'radio1', value: 'R1' },
            { label: 'radio2', value: 'R2' },
            { label: 'radio3', value: 'R3' },
          ]}
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
            { label: 'check1', value: 'C1' },
            { label: 'check2', value: 'C2' },
            { label: 'check3', value: 'C3' },
            { label: 'check4', value: 'C4' },
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
            { label: 'radio1', value: 'R1' },
            { label: 'radio2', value: 'R2' },
            { label: 'radio3', value: 'R3' },
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
