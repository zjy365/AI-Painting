import NavBar from '@/components/navbar'
import { Box, useColorMode } from '@chakra-ui/react'
import { useEffect } from 'react'

function Layout({ children }: { children: any }) {
  const { colorMode, toggleColorMode, setColorMode } = useColorMode()

  useEffect(() => {
    if (colorMode !== 'dark') {
      setColorMode('dark')
    }
  }, [colorMode, setColorMode])

  return (
    <>
      <NavBar></NavBar>
      {/* <Box
        position={'relative'}
        bg={'#262626'}
        w="100%"
        h="100vh"
        pt="61px"
        overflow={'auto'}>
      </Box> */}
      {children}
    </>
  )
}

export default Layout
