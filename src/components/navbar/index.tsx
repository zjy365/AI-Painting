import LoginComponent from '@/components/login'
import { useScreen } from '@/hooks/useScreen'
import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ImageList from '@/components/imagelist'

const Tabs = {
  community: 'community',
  painting: 'painting',
}

const Navbar = () => {
  const router = useRouter()
  const [active, setActive] = useState('community')
  const { isPC } = useScreen()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onChange = (id: string) => {
    if (id) {
      router.push({ pathname: id })
    }
    setActive(id)
  }

  useEffect(() => {
    if (router.pathname === '/') {
      setActive('community')
    } else {
      setActive(router.pathname.replace('/', ''))
    }
  }, [router.pathname])

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
      pr="40px"
      pl="24px">
      {isPC ? (
        <Text fontSize="xl" fontWeight="bold" onClick={() => router.push('/')}>
          AI
        </Text>
      ) : (
        <HamburgerIcon w="24px" h="24px" onClick={onOpen} />
      )}

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

      <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent maxW={'50vw'}>
          <DrawerHeader borderBottomWidth="1px">Image List</DrawerHeader>
          <DrawerBody>
            <ImageList isPhone />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}

export default Navbar
