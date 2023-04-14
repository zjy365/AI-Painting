import request from '@/service/request'
import {
  Box,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { SetStateAction, useEffect, useState } from 'react'
import { setToken, removeToken } from '@/utils/auth'

function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userInfo, setUserInfo] = useState('')
  const [isLogin, setIsLogin] = useState(false)

  const handleUsernameChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    try {
      const res = await request.post('/api/login', {
        username,
        password,
      })
      //@ts-ignore
      let token = res.data['jwt-token']
      setToken(token)
      onClose()
      checkLoginStatus()
    } catch (error) {}
  }

  const checkLoginStatus = async () => {
    try {
      const res = await request.get('/api/login_status')
      setIsLogin(res.data.loggedIn)
      setUserInfo(res.data.username)
    } catch (error) {}
  }

  const logOut = () => {
    removeToken()
    checkLoginStatus()
  }

  useEffect(() => {
    checkLoginStatus()
  }, [])

  return (
    <>
      {isLogin ? (
        <Menu>
          <MenuButton as={Button} justifyContent={'center'}>
            {userInfo}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={logOut}>退出</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button onClick={onOpen} size="sm" w="80px" borderRadius={'24px'}>
          登录
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor={'#2b2b2b'}>
          <ModalHeader color={'#fff'}>登录</ModalHeader>
          <ModalCloseButton color={'#e6e6e6'} />
          <ModalBody p={'5px 20px'}>
            <Input
              color={'#fff'}
              border={'0'}
              bgColor={'#212121'}
              m={'5px'}
              placeholder="输入账号"
              onChange={handleUsernameChange}
            />
            <Input
              type="password"
              color={'#fff'}
              border={'0'}
              bgColor={'#212121'}
              m={'5px'}
              placeholder="输入密码"
              onChange={handlePasswordChange}
            />
            <Button
              m={'30px 5px'}
              w={'100%'}
              borderRadius={'24px'}
              // colorScheme="blue"
              onClick={handleSubmit}>
              登录
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Login
