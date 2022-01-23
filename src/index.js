import React from 'react';
import ReactDOM from 'react-dom';

import FilterTree from './FilterTree';
import { Provider } from 'react-redux';
import store from './store/TreeStore';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <FilterTree />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

