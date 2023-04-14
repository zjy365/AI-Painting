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
      <Box
        bg={'#2b2b2b'}
        w="100%"
        h="100%"
        overflowX={'hidden'}
        overflowY={'auto'}>
        {children}
      </Box>
    </>
  )
}

export default Layout
