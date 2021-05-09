import React from 'react';
import logo from './logo.svg'; // eslint-disable-line @typescript-eslint/no-unused-vars
import './App.css';
import SimpleForm from './simple_form/Form';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h2>Simple form</h2>
          <SimpleForm />
        </div>
      </header>
    </div>
  );
}

export default App;
