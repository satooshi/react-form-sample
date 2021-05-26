import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
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
    e.preventDefault();
    const props = refViewModel.current;

    const formErrors = props.validate();

    if (Object.keys(formErrors).length === 0) {
      await useCase.create(props);

      setState(new FormViewModel(initState));
    } else {
      setState(props.serialized);
    }
  }

  // memoize to avoid too-many re-render

  const text1View = useMemo(
    () => (
      <TextInput
        id="text1"
        labelText="Text1"
        value={viewModel.text1}
        onChange={handleTextChange1}
        error={viewModel.errors.text1}
      />
    ),
    [viewModel.text1, viewModel.errors.text1]
  );

  const text2View = useMemo(
    () => (
      <TextInput
        id="text2"
        labelText="Text2"
        value={viewModel.text2}
        onChange={handleTextChange2}
        error={viewModel.errors.text2}
      />
    ),
    [viewModel.text2, viewModel.errors.text2]
  );

  const textAreaView = useMemo(
    () => (
      <TextArea
        id="text-area"
        labelText="Text Area"
        value={viewModel.textArea}
        onChange={handleTextAreaChange}
        error={viewModel.errors.textArea}
      />
    ),
    [viewModel.textArea, viewModel.errors.textArea, handleTextAreaChange]
  );

  const selectView = useMemo(
    () => (
      <Select
        id="select"
        labelText="Select"
        value={viewModel.select}
        onChange={handleSelectChange}
        error={viewModel.errors.select}
        options={['option1', 'option2', 'option3']}
      />
    ),
    [viewModel.select, viewModel.errors.select, handleSelectChange]
  );

  const radioListView = useMemo(
    () => (
      <RadioList
        id="radio-list"
        labelText="Radio List:"
        value={viewModel.radioList}
        onChange={handleRadioListChange}
        error={viewModel.errors.radioList}
        options={['radio1', 'radio2', 'radio3']}
      />
    ),
    [viewModel.radioList, viewModel.errors.radioList, handleRadioListChange]
  );

  const switchView = useMemo(
    () => (
      <Switch
        id="switch"
        labelText="Switch here"
        value="nyan"
        checked={viewModel.switch}
        onChange={handleSwitchChange}
        error={viewModel.errors.switch}
      />
    ),
    [viewModel.switch, viewModel.errors.switch, handleSwitchChange]
  );

  const inlineCheckListView = useMemo(
    () => (
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
    ),
    [
      viewModel.inlineCheck,
      viewModel.errors.inlineCheck,
      handleInlineCheckChange,
    ]
  );

  const inlineRadioListView = useMemo(
    () => (
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
    ),
    [
      viewModel.inlineRadio,
      viewModel.errors.inlineRadio,
      handleInlineRadioChange,
    ]
  );

  return (
    <form noValidate>
      <div className="mb-3">{text1View}</div>
      <div className="mb-3">{text2View}</div>
      <div className="mb-3">{textAreaView}</div>
      <div className="mb-3">{selectView}</div>
      <div className="mb-3">{radioListView}</div>
      <div className="mb-3">{switchView}</div>
      <div className="mb-3">{inlineCheckListView}</div>
      <div className="mb-3">{inlineRadioListView}</div>

      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        submit
      </button>
    </form>
  );
};

export default Form;
