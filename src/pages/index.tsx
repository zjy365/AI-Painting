import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function Index() {
  const router = useRouter()

  useEffect(() => {
    router.push('community')
  }, [router])

  return <Box>index</Box>
}

export default Index
