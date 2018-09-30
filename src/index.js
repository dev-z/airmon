// Core imports
import React from 'react';
import ReactDOM from 'react-dom';
// Stylesheets
import './styles/normalize.css';
import './styles/index.css';
// Main App Component
import App from './App';
import registerServiceWorker from './registerServiceWorker';

/* global document */
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
