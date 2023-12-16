import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css'; 

ReactDOM.render(
  <React.StrictMode>
    <div className="text-white"style={{ backgroundColor: 'black', minHeight: '100vh'}}>
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

/**
 * ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="text-white"style={{ backgroundColor: 'black', minHeight: '100vh'}}>
        <Routes>
          <Route path ="/*" element={<App/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

 */
