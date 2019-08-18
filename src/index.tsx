import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { Spinner } from './components/spinner';

import App from './components/app';

ReactDOM.render(
	<Provider store={ store }>
		<PersistGate loading={ Spinner }  persistor={ persistor } >
			<App />
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);