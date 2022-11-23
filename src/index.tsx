import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './fonts/Open_Sans/static/OpenSans/OpenSans-Bold.ttf';
import './fonts/Open_Sans/static/OpenSans/OpenSans-Regular.ttf';
import './fonts/Open_Sans/static/OpenSans/OpenSans-SemiBold.ttf';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { socket, SocketContext } from './context/socket';

const persistor = persistStore(store);
const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</PersistGate>
	</Provider>
);
