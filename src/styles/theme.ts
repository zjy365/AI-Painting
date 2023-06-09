import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  styles: {
    global: {
      body: {
        bg: '#262626',
      },
    },
  },
  colors: {
    primary_black: {
      100: '#2d2d2d',
      200: '#262626',
      300: '#252525',
      400: '#424242',
    },
  },
})

export default theme
