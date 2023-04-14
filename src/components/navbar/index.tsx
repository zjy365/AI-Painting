import { Flex, Text, Button, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from './index.module.scss'
import LoginComponent from '@/components/login'

const Tabs = {
  community: 'community',
  painting: 'painting',
}

const Navbar = () => {
  const [active, setActive] = useState(Tabs.community)
  const router = useRouter()
  const onChange = (id: string) => {
    if (id) {
      router.push({ pathname: id })
    }
    setActive(id)
  }

  return (
    <Flex
      position={'fixed'}
      zIndex={100}
      top="0"
      w="100%"
      h={'60px'}
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      bg="#2d2d2d"
      color="#e6e6e6"
      borderBottom={'1px solid #424242'}
      px="60px">
      <Text fontSize="xl" fontWeight="bold">
        AI
      </Text>
      <Flex cursor={'pointer'}>
        <Text
          px="18px"
          color={active === Tabs.community ? '#e6e6e6' : '#595959'}
          fontWeight={600}
          fontSize={20}
          onClick={() => onChange(Tabs.community)}>
          社区
        </Text>
        <Text
          px="18px"
          color={active === Tabs.painting ? '#e6e6e6' : '#595959'}
          fontWeight={600}
          fontSize={20}
          onClick={() => onChange(Tabs.painting)}>
          绘画
        </Text>
      </Flex>
      <LoginComponent />
    </Flex>
  )
}

export default Navbar
