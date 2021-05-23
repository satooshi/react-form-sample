import React from 'react';
import logo from './logo.svg'; // eslint-disable-line @typescript-eslint/no-unused-vars
// import './App.css';
import SimpleForm from './SimpleForm/Views/Form';
import FooRepository from './SimpleForm/Repositories/FooRepository';
import FooDriver from './SimpleForm/Drivers/FooDriver';
import FormUseCase from './SimpleForm/UseCases/FormUseCase';

const fooDriver = new FooDriver();
const fooRepository = new FooRepository(fooDriver);
const formUseCase = new FormUseCase(fooRepository);
console.log('Wired', formUseCase);

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-6">
            <h2>Simple form</h2>
            <SimpleForm useCase={formUseCase} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
