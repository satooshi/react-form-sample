import React from 'react';
import { debuglog } from 'Utils';
import FormViewModel, { Props } from 'SimpleForm/ViewModels/FormViewModel';
import FormUseCase from 'SimpleForm/UseCases/FormUseCase';
import FooApiDriver from 'Drivers/FooApiDriver';
import FooRepository from 'SimpleForm/Repositories/FooRepository';
import SimpleForm from 'SimpleForm/Views/Form';
import logo from 'logo.svg'; // eslint-disable-line @typescript-eslint/no-unused-vars
// import 'App.css';

const fooDriver = new FooApiDriver();
const fooRepository = new FooRepository(fooDriver);
const formUseCase = new FormUseCase(fooRepository);
debuglog('Wired', { formUseCase });

const initState: Props = {
  text1: '',
  text2: '',
  textArea: '',
  checkList: { C1: false, C2: false, C3: false, C4: false },
  radioList: '',
  select: '',
  switch: false,
  inlineCheck: { C1: false, C2: false, C3: false, C4: false },
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
