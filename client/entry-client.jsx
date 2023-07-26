import { createRoot } from "react-dom/client";
import App from "./App";
import { store } from './reduxStore/store';
import { Provider } from 'react-redux'

const root = createRoot(document.getElementById("shopify-app"));
root.render(
<Provider store={store}>
<App />
</Provider>
);
