import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; 
import { createStore} from 'redux';
import { Provider} from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from '../src/store/reducer';

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}> app</Provider>, document.getElementById('root'));
registerServiceWorker();
