import { FormUseCase } from 'Apps/SimpleForm/UseCases/FormUseCase';
import {
  CheckOptions,
  FormViewModel,
  RadioValue,
  SelectValue,
} from 'Apps/SimpleForm/ViewModels/FormViewModel';
import { useViewModel } from 'Framework/Bridges/ReactBridge';
import {
  CheckList,
  InlineCheckList,
  InlineRadioList,
  PasswordInput,
  RadioList,
  Select,
  Switch,
  TextArea,
  TextInput,
  ValueState,
} from 'Framework/Views/Components/Bootstrap';
import { debuglog } from 'Utils';
import React, { useCallback, useState } from 'react';

interface FormProps {
  initialViewModel: FormViewModel;
  onSubmitSuccess?: (
    setViewModel: (nextViewModel: FormViewModel) => void
  ) => void;
  useCase: FormUseCase;
}

export const Form: React.FC<FormProps> = ({
  useCase,
  initialViewModel,
  onSubmitSuccess,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [viewModel, setViewModel] = useViewModel(initialViewModel);
  debuglog('render Form', { submitting, viewModel });

  const handleTextChange1 = useCallback((value: string) => {
    viewModel.text1 = value;
    setViewModel(viewModel);
  }, []);

  const handleTextChange2 = useCallback((value: string) => {
    viewModel.text2 = value;
    setViewModel(viewModel);
  }, []);

  const handlePasswordChange = useCallback((value: string) => {
    viewModel.password = value;
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

    if (viewModel.isValid) {
      debuglog('Submitting the form');
      await useCase.create(viewModel);

      if (onSubmitSuccess) {
        onSubmitSuccess(setViewModel);
      }

      setSubmitting(false);
    } else {
      debuglog('the form validation failed', { errors: viewModel.errors });
      setViewModel(viewModel); // notify errors
      setSubmitting(false);
    }
  }

  return (
    <form noValidate>
      <div className="mb-3">
        <TextInput
          error={viewModel.errors.text1}
          id="text1"
          labelText="Text1"
          onChange={handleTextChange1}
          value={viewModel.text1}
        />
      </div>
      <div className="mb-3">
        <TextInput
          error={viewModel.errors.text2}
          id="text2"
          labelText="Text2"
          onChange={handleTextChange2}
          value={viewModel.text2}
        />
      </div>
      <div className="mb-3">
        <PasswordInput
          error={viewModel.errors.password}
          id="password"
          labelText="Password"
          onChange={handlePasswordChange}
          value={viewModel.password}
        />
      </div>
      <div className="mb-3">
        <TextArea
          error={viewModel.errors.textArea}
          id="text-area"
          labelText="Text Area"
          onChange={handleTextAreaChange}
          value={viewModel.textArea}
        />
      </div>
      <div className="mb-3">
        <Select
          error={viewModel.errors.select}
          id="select"
          labelText="Select"
          onChange={handleSelectChange}
          options={[
            { label: 'Please select', value: '' },
            { label: 'option1', value: 'S1' },
            { label: 'option2', value: 'S2' },
            { label: 'option3', value: 'S3' },
          ]}
          value={viewModel.select}
        />
      </div>
      <div className="mb-3">
        <CheckList
          error={viewModel.errors.checkList}
          id="check_list"
          labelText="Check List:"
          onChange={handleCheckListChange}
          options={[
            { label: 'check1', value: 'C1' },
            { label: 'check2', value: 'C2' },
            { label: 'check3', value: 'C3' },
            { label: 'check4', value: 'C4' },
          ]}
          values={viewModel.checkList}
        />
      </div>
      <div className="mb-3">
        <RadioList
          error={viewModel.errors.radioList}
          id="radio-list"
          labelText="Radio List:"
          onChange={handleRadioListChange}
          options={[
            { label: 'radio1', value: 'R1' },
            { label: 'radio2', value: 'R2' },
            { label: 'radio3', value: 'R3' },
          ]}
          value={viewModel.radioList}
        />
      </div>
      <div className="mb-3">
        <Switch
          checked={viewModel.switch}
          error={viewModel.errors.switch}
          id="switch"
          labelText="Switch here"
          onChange={handleSwitchChange}
          value="nyan"
        />
      </div>
      <div className="mb-3">
        <InlineCheckList
          error={viewModel.errors.inlineCheck}
          id="inline-check"
          labelText="Inline check list:"
          onChange={handleInlineCheckChange}
          options={[
            { label: 'check1', value: 'C1' },
            { label: 'check2', value: 'C2' },
            { label: 'check3', value: 'C3' },
            { label: 'check4', value: 'C4' },
          ]}
          values={viewModel.inlineCheck}
        />
      </div>
      <div className="mb-3">
        <InlineRadioList
          error={viewModel.errors.inlineRadio}
          id="inline-radio"
          labelText="Inline radio list:"
          onChange={handleInlineRadioChange}
          options={[
            { label: 'radio1', value: 'R1' },
            { label: 'radio2', value: 'R2' },
            { label: 'radio3', value: 'R3' },
          ]}
          value={viewModel.inlineRadio}
        />
      </div>

      <button
        className="btn btn-primary"
        disabled={submitting}
        onClick={handleSubmit}
        type="submit"
      >
        submit
      </button>
    </form>
  );
};
