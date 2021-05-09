import React, { useState } from 'react';
import TextInput from './TextInput';

type State = {
  text1: string;
  text2: string;
};

type Errors = {
  text1?: string;
  text2?: string;
};

function validate(values: State): Errors {
  const errors: Errors = {};

  if (values.text1.length === 0) {
    errors.text1 = 'Required';
  }
  if (values.text2.length === 0) {
    errors.text2 = 'Required';
  }

  return errors;
}

const Form: React.FC = () => {
  const [state, setState] = useState({ text1: '', text2: '' } as State);
  const [errors, setErrors] = useState({} as Errors);

  function handleTextChange1(value: string) {
    setState({ ...state, text1: value });
  }

  function handleTextChange2(value: string) {
    setState({ ...state, text2: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formErrors = validate(state);
    setErrors({ ...formErrors });
    if (Object.keys(formErrors).length === 0) {
      setState({ ...state, text1: '', text2: '' });
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

      <button type="submit" className="btn btn-primary">
        submit
      </button>
    </form>
  );
};

export default Form;
