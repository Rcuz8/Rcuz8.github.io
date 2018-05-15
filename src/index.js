import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyNavBar from './MyNavBar';
import App from './App';

ReactDOM.render(<MyNavBar/>, document.getElementById('topNavBar'));
ReactDOM.render(<App/>, document.getElementById('root'));
