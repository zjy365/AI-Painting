import NavBar from '@/components/navbar'
import { Box } from '@chakra-ui/react'

function Layout({ children }: { children: any }) {
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
