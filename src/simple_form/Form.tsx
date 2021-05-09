import React, { useState } from 'react';
import TextInput from './TextInput';

type State = {
  text1: string;
  text2: string;
};

const Form: React.FC = () => {
  const [state, setState] = useState({ text1: '', text2: '' } as State);

  function handleTextChange1(value: string) {
    setState({ ...state, text1: value });
  }

  function handleTextChange2(value: string) {
    setState({ ...state, text2: value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setState({ ...state, text1: '', text2: '' });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextInput
          id="text1"
          labelText="Text1"
          value={state.text1}
          onChange={handleTextChange1}
        />
      </div>

      <div>
        <TextInput
          id="text2"
          labelText="Text2"
          value={state.text2}
          onChange={handleTextChange2}
        />
      </div>

      <div>
        <button type="submit">submit</button>
      </div>
    </form>
  );
};

export default Form;
