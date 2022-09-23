import * as React from 'react';
import ReactDOM from 'react-dom'

import SafeProvider from '@gnosis.pm/safe-apps-react-sdk'


import App from './App'
import {CircularProgress, DialogTitle} from "@material-ui/core";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

ReactDOM.render(
    <React.StrictMode>
        <SafeProvider
            loader={
                <>
                    <DialogTitle>Waiting for Safe...</DialogTitle>
                    <CircularProgress size="md" />
                </>
            }
        >
            <App />
        </SafeProvider>
    </React.StrictMode>,
    document.getElementById('root'),
)
