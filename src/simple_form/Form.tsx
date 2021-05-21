import React, { useState } from 'react';
import InlineCheckList, { ValueState } from './InlineCheckList';
import InlineRadioList from './InlineRadioList';
import RadioList from './RadioList';
import Select from './Select';
import Switch from './Switch';
import TextArea from './TextArea';
import TextInput from './TextInput';

type State = {
  text1: string;
  text2: string;
  textArea: string;
  radioList: string;
  select: string;
  switch: boolean;
  inlineCheck: ValueState;
  inlineRadio: string;
};

type Errors = {
  text1?: string;
  text2?: string;
  textArea?: string;
  radioList?: string;
  select?: string;
  switch?: string;
  inlineCheck?: string;
  inlineRadio?: string;
};

const initState: State = {
  text1: '',
  text2: '',
  textArea: '',
  radioList: '',
  select: '',
  switch: false,
  inlineCheck: {} as ValueState,
  inlineRadio: '',
};

function validate(values: State): Errors {
  const errors: Errors = {};

  if (values.text1.length === 0) {
    errors.text1 = 'Required';
  }
  if (values.text2.length === 0) {
    errors.text2 = 'Required';
  }
  if (values.textArea.length === 0) {
    errors.textArea = 'Required';
  }
  if (values.radioList.length === 0) {
    errors.radioList = 'Required';
  }
  if (values.select.length === 0) {
    errors.select = 'Required';
  }
  if (values.switch === false) {
    errors.switch = 'Required';
  }
  if (!Object.values(values.inlineCheck).find((v) => v === true)) {
    errors.inlineCheck = 'Required';
  }
  if (values.inlineRadio === '') {
    errors.inlineRadio = 'Required';
  }

  return errors;
}

const Form: React.FC = () => {
  const [state, setState] = useState(initState);
  const [errors, setErrors] = useState({} as Errors);

  function handleTextChange1(value: string) {
    setState({ ...state, text1: value });
  }

  function handleTextChange2(value: string) {
    setState({ ...state, text2: value });
  }

  function handleTextAreaChange(value: string) {
    setState({ ...state, textArea: value });
  }

  function handleRadioListChange(value: string) {
    setState({ ...state, radioList: value });
  }

  function handleSelectChange(value: string) {
    setState({ ...state, select: value });
  }

  function handleSwitchChange(value: boolean) {
    setState({ ...state, switch: value });
  }

  function handleInlineCheckChange(value: ValueState) {
    setState({ ...state, inlineCheck: { ...state.inlineCheck, ...value } });
  }

  function handleInlineRadioChange(value: string) {
    setState({ ...state, inlineRadio: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formErrors = validate(state);
    setErrors({ ...formErrors });
    if (Object.keys(formErrors).length === 0) {
      setState({
        ...state,
        ...initState,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <TextInput
          id="text1"
          labelText="Text1"
          value={state.text1}
          onChange={handleTextChange1}
          error={errors.text1}
        />
      </div>

      <div className="mb-3">
        <TextInput
          id="text2"
          labelText="Text2"
          value={state.text2}
          onChange={handleTextChange2}
          error={errors.text2}
        />
      </div>

      <div className="mb-3">
        <TextArea
          id="text-area"
          labelText="Text Area"
          value={state.textArea}
          onChange={handleTextAreaChange}
          error={errors.textArea}
        />
      </div>

      <div className="mb-3">
        <Select
          id="select"
          labelText="Select"
          value={state.select}
          onChange={handleSelectChange}
          error={errors.select}
          options={['option1', 'option2', 'option3']}
        />
      </div>

      <div className="mb-3">
        <RadioList
          id="radio-list"
          labelText="Radio List:"
          value={state.radioList}
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
          checked={state.switch}
          onChange={handleSwitchChange}
          error={errors.switch}
        />
      </div>

      <div className="mb-3">
        <InlineCheckList
          id="inline-check"
          labelText="Inline check list:"
          values={state.inlineCheck}
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
          value={state.inlineRadio}
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
