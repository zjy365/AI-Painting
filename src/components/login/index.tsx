import request from '@/service/request'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { SetStateAction, useState } from 'react'
import { setToken } from '@/utils/auth'

function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
    } catch (error) {}
  }

  const checkLoginStatus = async () => {
    try {
      const res = await request.get('/api/login_status')
      console.log(res)
    } catch (error) {}
  }

  //   function () {
  //     $.ajax({
  //         url: 'https://zbvrsg.laf.dev/login_status',
  //         type: 'GET',
  //         headers: {
  //             'jwt-token': document.cookie.replace(/(?:(?:^|.*;\s*)jwt-token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
  //         },
  //         success: function (response) {
  //             if (response.loggedIn) {
  //                 $('#user_name').text(response.username).show();
  //                 $('#login_button').hide();
  //                 getPreImages();
  //             } else {
  //                 $('#user_name').hide();
  //                 $('#login_button').show();
  //             }
  //         }
  //     });
  // }

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="blue"
        size="sm"
        w="80px"
        borderRadius={'24px'}>
        登录
      </Button>
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
              colorScheme="blue"
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
