import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

import notifyReducer from './redurcers/notifyReducer';
import settingsReducer from './redurcers/settingsReducer';

/* Firebase config */
const firebaseConfig = {
  /+ Your firebase key goes here */
};

/* react-redux-firebase config */
const rrfConfig = {
  userProfile: 'users',
  userFirestoreForProfile: true
};

/* Init firebase instance */
firebase.initializeApp(firebaseConfig);

/* init firestore */
const firestore = firebase.firestore();

/* Add reactReduxFirebase enhancer when making store creator */
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

/* Add firebase to reducers */
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
});

/* Check for settings in localStorage */
if (localStorage.getItem('settings') == null) {
  /* Set default settings */
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };

  /* Set to localStorage */
  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

/* Create initial state */
const initialState = {
  settings: JSON.parse(localStorage.getItem('settings'))
};

/* Create store */
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
