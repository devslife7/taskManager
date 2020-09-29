import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"

const theme = createMuiTheme({
  palette: {
    primary: {
      // main: "#2196f3" // blue
      // main: "#43a047" // green
      main: "#80deea" // turqoise
    }
    // secondary: {
    //   main: '#10D92E'
    // }
  }
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
)
