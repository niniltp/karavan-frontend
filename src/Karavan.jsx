import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import App from './App.jsx'
import '@mantine/notifications/styles.css';

// withGlobalStyles withNormalizeCSS 

const theme = createTheme({
  colors: {
    customDarkBlue: [
      '#CED8DE', // 50
      '#49616E', // 100
      '#415662', // 200
      '#394B56', // 300
      '#314049', // 400
      '#29363D', // 500
      '#212B31', // 600
      '#161d21', // 700 (Base)
      '#101518', // 800
      '#080B0C', // 900
    ],
  },
})

function Karavan() {
  return (
    <>
      <MantineProvider withNormalizeCSS withGlobalStyles defaultColorScheme="dark" theme={theme}>
        <Notifications position="bottom-right" zIndex={1000} limit={5}/>
        <App/>
      </MantineProvider>
    </>
  )
}

export default Karavan;
