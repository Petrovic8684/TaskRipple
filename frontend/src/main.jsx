import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import modalsReducer from './features/modals.js';
import boardsReducer from './features/boards.js';
import currentReducer from './features/current.js';

import global_en from './lib/translations/en/global.json';
import global_srb from './lib/translations/sr/global.json';

import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

i18next.init({
  fallbackLng: 'en',
  lng: 'en', // default language
  interpolation: { escapeValue: true },
  resources: {
    en: {
      global: global_en,
    },
    sr: {
      global: global_srb,
    },
  },
});

export const store = configureStore({
  reducer: {
    modals: modalsReducer,
    boards: boardsReducer,
    current: currentReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </Provider>
);
