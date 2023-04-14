import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Index(props: any) {
  const router = useRouter()

  // useEffect(() => {
  //   router.replace('/community')
  // }, [router])

  return props.children
}
