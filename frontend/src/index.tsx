import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './state/AppState';

const load = () => {
    window.removeEventListener('load', load);

    const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    );
};

window.addEventListener('load', load);
