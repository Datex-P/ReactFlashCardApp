import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContextProvider from './Context';
//import Refvsdom from './Refvsdom';
// import Example from './class/'

//import LearnUseRef from './LearnUseRef'
import Testfile from './Testfile'


ReactDOM.render(
  <ContextProvider>{/* step 3 cover required parent component with context state */}
    <React.StrictMode>
    
     <App/>
      
    </React.StrictMode>

  </ContextProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


