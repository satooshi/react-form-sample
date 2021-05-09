import React, { useState } from 'react';
import RadioList from './RadioList';
import Select from './Select';
import TextArea from './TextArea';
import TextInput from './TextInput';

type State = {
  text1: string;
  text2: string;
  textArea: string;
  radioList: string;
  select: string;
};

type Errors = {
  text1?: string;
  text2?: string;
  textArea?: string;
  radioList?: string;
  select?: string;
};

const initState: State = {
  text1: '',
  text2: '',
  textArea: '',
  radioList: '',
  select: '',
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
          labelText="Radio List"
          value={state.radioList}
          onChange={handleRadioListChange}
          error={errors.radioList}
          options={['radio1', 'radio2', 'radio3']}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        submit
      </button>
    </form>
  );
};

export default Form;
