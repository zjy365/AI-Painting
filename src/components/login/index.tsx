import { useCustomToast } from '@/hooks/useCustomToast';
import request from '@/service/request';
import { removeToken, setToken } from '@/utils/auth';
import {
  Box,
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';

function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const { toast } = useCustomToast();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors }
  } = useForm<{ email: string; code: string; pass: string }>();
  const router = useRouter();

  const handleUsernameChange = (event: { target: { value: SetStateAction<string> } }) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: SetStateAction<string> } }) => {
    setPassword(event.target.value);
  };

  const login = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const res = await request.post('/user_login', {
        username,
        password
      });
      let token = res.data.data.access_token;
      setToken(token);
      onClose();
      refetch();
      if (res.data.code !== 200) {
        toast({ title: res.data.data, status: 'error' });
      }
    } catch (error) {}
  };

  const logOut = () => {
    router.push('/community');
    removeToken();
    refetch();
  };

  const { data, refetch, isSuccess } = useQuery(['getLoginStatus'], () =>
    request.get('/login_status')
  );

  const getEmailCode = async () => {
    const email = getValues('email');
    const res = await request.post('/send_email', { email: email });
    if (res.data.code === 200) {
      toast({ title: '发送成功' });
    } else {
      toast({ title: res.data?.message });
    }
    // 禁用发送按钮并开始倒计时
    const sendBtn: HTMLButtonElement = document.getElementById('sendBtn') as HTMLButtonElement;
    sendBtn.disabled = true;
    let count = 60;
    const timer = setInterval(() => {
      count--;
      if (count === 0) {
        clearInterval(timer);
        sendBtn.disabled = false;
        sendBtn.innerText = '发送验证码';
      } else {
        sendBtn.innerText = `重新发送 (${count}s)`;
      }
    }, 1000);
  };
  const registerUser = async () => {
    handleSubmit(
      async (data) => {
        const res = await request.post('/user_register', {
          username: data.email,
          code: data.code,
          password: data.pass
        });
        if (res.data?.code === 200) {
          toast({ description: '请前往登录' });
          setIsRegister(false);
        } else {
          toast({ title: res.data?.message });
        }
      },
      (err) => {
        toast({
          title: 'form error'
        });
      }
    )();
  };

  return (
    <>
      {data?.data?.loggedIn ? (
        <Menu>
          <MenuButton as={Button} justifyContent={'center'}>
            {data?.data?.data?.username}
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
          <ModalHeader color={'#fff'}>{isRegister ? '注册账号' : '登录'}</ModalHeader>
          <ModalBody p={'5px 20px'}>
            {isRegister ? (
              <Box>
                <form autoComplete="off">
                  <Input
                    type="text"
                    placeholder="请输入邮箱"
                    {...register('email', {
                      required: true,
                      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                    })}
                  />
                  <Flex my="20px">
                    <Input
                      w="200px"
                      type="text"
                      placeholder="请输入验证码"
                      {...register('code', {
                        required: true,
                        pattern: /^\d{6}$/
                      })}
                    />
                    <Button id="sendBtn" ml="auto" onClick={getEmailCode}>
                      获取验证码
                    </Button>
                  </Flex>

                  <Input
                    type="password"
                    placeholder="请输入密码"
                    {...register('pass', {
                      required: '密码不能为空'
                    })}
                  />
                </form>
              </Box>
            ) : (
              <form autoComplete="off">
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
              </form>
            )}
            <Flex ml={'auto'} m="30px 5px" justifyContent={'end'}>
              <Button
                mr="8px"
                borderRadius={'24px'}
                onClick={() => {
                  if (isRegister) {
                    onClose();
                    reset();
                  }
                  setIsRegister(!isRegister);
                }}
              >
                {isRegister ? '取消' : '注册'}
              </Button>
              <Button borderRadius={'24px'} onClick={isRegister ? registerUser : login}>
                {isRegister ? '确定' : '登录'}
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Login;
