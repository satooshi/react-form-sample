import { FooRepository } from 'Apps/SimpleForm/Repositories/FooRepository';
import { FormUseCase } from 'Apps/SimpleForm/UseCases/FormUseCase';
import { FormViewModel, Props } from 'Apps/SimpleForm/ViewModels/FormViewModel';
import { Form as SimpleForm } from 'Apps/SimpleForm/Views/Form';
import { FooApiDriver } from 'Framework/Drivers/FooApiDriver';
import { debuglog } from 'Utils';
import React from 'react';
// import logo from 'logo.svg'; // eslint-disable-line @typescript-eslint/no-unused-vars
// import 'App.css';

const fooDriver = new FooApiDriver();
const fooRepository = new FooRepository(fooDriver);
const formUseCase = new FormUseCase(fooRepository);
debuglog('Wired', { formUseCase });

const initState: Props = {
  checkList: { C1: false, C2: false, C3: false, C4: false },
  inlineCheck: { C1: false, C2: false, C3: false, C4: false },
  inlineRadio: '',
  password: '',
  radioList: '',
  select: '',
  switch: false,
  text1: '',
  text2: '',
  textArea: '',
};
const viewModel = new FormViewModel(initState);

const onSubmitSuccess = (callback: (v: FormViewModel) => void) => {
  callback(new FormViewModel(initState));
};

export function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-6">
            <h2>Simple form</h2>
            <SimpleForm
              initialViewModel={viewModel}
              onSubmitSuccess={onSubmitSuccess}
              useCase={formUseCase}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
