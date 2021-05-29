import React from 'react';
import logo from './logo.svg'; // eslint-disable-line @typescript-eslint/no-unused-vars
// import './App.css';
import SimpleForm from './SimpleForm/Views/Form';
import FooRepository from './SimpleForm/Repositories/FooRepository';
import FooDriver from './SimpleForm/Drivers/FooDriver';
import FormUseCase from './SimpleForm/UseCases/FormUseCase';
import FormViewModel, { Props } from './SimpleForm/ViewModels/FormViewModel';

const fooDriver = new FooDriver();
const fooRepository = new FooRepository(fooDriver);
const formUseCase = new FormUseCase(fooRepository);
console.log('Wired', formUseCase);

const initState: Props = {
  text1: '',
  text2: '',
  textArea: '',
  checkList: { 1: false, 2: false },
  radioList: '',
  select: '',
  switch: false,
  inlineCheck: { 1: false, 2: false },
  inlineRadio: '',
};
const viewModel = new FormViewModel(initState);

const onSubmitSuccess = (callback: (v: FormViewModel) => void) => {
  callback(new FormViewModel(initState));
};

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-6">
            <h2>Simple form</h2>
            <SimpleForm
              useCase={formUseCase}
              initialViewModel={viewModel}
              onSubmitSuccess={onSubmitSuccess}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
