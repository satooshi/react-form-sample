import React from 'react';
import logo from './logo.svg'; // eslint-disable-line @typescript-eslint/no-unused-vars
// import './App.css';
import SimpleForm from './SimpleForm/Views/Form';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-6">
            <h2>Simple form</h2>
            <SimpleForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
