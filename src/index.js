import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers/index'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk))
  // applyMiddleware(thunk),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const theme = createTheme({
  palette: {
    primary: {
      // main: "#333333" // nice black
      // main: "#2196f3" // blue

      // main: "#33435F" // dark blue
      main: '#2196f3', // graph blue
      dark: '#0C60A6',
      // main: "#6D84AB" // dark blue complementary color
      // main: "#4B6EAB" // dark blue complementary color

      // main: "#43a047" // green
      // main: "#80deea" // turqoise
      // main: "#757575" // gray
    },
    secondary: {
      // main: "#fca21c" // orange
      main: '#F2A122', // complementary orange
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
    },
  },
  props: {
    // Name of the component
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application!
    },
  },
})

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
