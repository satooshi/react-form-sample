import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  const [submitting, setSubmitting] = useState(false);

  const refViewModel = useRef(viewModel);
  useEffect(() => {
    refViewModel.current = viewModel;
  });
  console.log('render Form', { state, viewModel });

  const handleTextChange1 = useCallback((value: string) => {
    const props = refViewModel.current;
    props.text1 = value;
    setState(props.serialized);
  }, []);

  const handleTextChange2 = useCallback((value: string) => {
    const props = refViewModel.current;
    props.text2 = value;
    setState(props.serialized);
  }, []);

  const handleTextAreaChange = useCallback((value: string) => {
    const props = refViewModel.current;
    props.textArea = value;
    setState(props.serialized);
  }, []);

  const handleRadioListChange = useCallback((value: string) => {
    const props = refViewModel.current;
    props.radioList = value;
    setState(props.serialized);
  }, []);

  const handleSelectChange = useCallback((value: string) => {
    const props = refViewModel.current;
    props.select = value as SelectOption;
    setState(props.serialized);
  }, []);

  const handleSwitchChange = useCallback((value: boolean) => {
    const props = refViewModel.current;
    props.switch = value;
    setState(props.serialized);
  }, []);

  const handleInlineCheckChange = useCallback((value: ValueState) => {
    const props = refViewModel.current;
    props.replaceInlineCheck(value as InlineCheckOptions);
    setState(props.serialized);
  }, []);

  const handleInlineRadioChange = useCallback((value: string) => {
    const props = refViewModel.current;
    props.inlineRadio = value as InlineRadioOption;
    setState(props.serialized);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    console.log('Submitting the form');
    setSubmitting(true);
    e.preventDefault();
    const props = refViewModel.current;

    const formErrors = props.validate();

    if (Object.keys(formErrors).length === 0) {
      await useCase.create(props);

      setState(new FormViewModel(initState));
      setSubmitting(false);
    } else {
      setState(props.serialized);
      setSubmitting(false);
    }
  }

  // memoize to avoid too-many re-render

  return (
    <form noValidate>
      <div className="mb-3">
      <TextInput
        id="text1"
        labelText="Text1"
          value={viewModel2.text1}
        onChange={handleTextChange1}
          error={viewModel2.errors.text1}
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
