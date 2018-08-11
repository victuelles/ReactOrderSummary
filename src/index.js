import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { configureStore } from './components/store/configureStore';

const store= configureStore();
const rootEl=document.getElementById('root')

let render = () => {
    ReactDOM.render(
      <Provider store={store}>
          <App />
      </Provider>,
      rootEl
    );
  };
    
render();
registerServiceWorker();
