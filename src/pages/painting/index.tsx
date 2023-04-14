import request from '@/service/request'
import { Box, Button, Flex, Select, Textarea, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { debounce } from 'lodash'

function Painting() {
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [modal, setModal] = useState('None')
  const [modalList, setModalList] = useState([])

  const getModalList = async () => {
    try {
      const res = await request('/api/model_list')
      setModalList(res.data.models)
    } catch (error) {}
  }

  const generImage = () => {
    console.log(modal, prompt, negativePrompt)
  }

  const onChangePrompt = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
  }

  const onNegativePrompt = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNegativePrompt(e.target.value)
  }

  useEffect(() => {
    getModalList()
  }, [])

  return (
    <Flex h="100%" w="100%" bg={'#262626'} pt="61px">
      <Flex
        m="16px"
        p="14px"
        pt="24px"
        w="382px"
        flexDirection={'column'}
        alignItems={'center'}
        minH={'740px'}
        bg="primary_black.100"
        borderWidth={'1px'}
        borderColor={'primary_black.400'}
        borderRadius={'16px'}>
        <Textarea
          placeholder="prompt"
          onChange={debounce((e) => onChangePrompt(e), 500)}
        />
        <Textarea
          mt="20px"
          placeholder="negative_prompt"
          onChange={debounce((e) => onNegativePrompt(e), 500)}
        />
        <Box w="100%" mt="20px">
          <Select onChange={(e) => setModal(e.target.value)}>
            {modalList &&
              modalList?.map((item: any) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                )
              })}
          </Select>
        </Box>
        <Button mt="20px" w="100%" onClick={generImage}>
          生成
        </Button>
      </Flex>
      <Box
        flexGrow={1}
        minH={'740px'}
        position={'relative'}
        alignItems="cneter"
        justifyContent={'center'}>
        center
      </Box>

      <Flex
        w="140px"
        minW="120px"
        minH={'760px'}
        borderLeft={'1px solid #424242'}>
        <Text>记录</Text>
      </Flex>
    </Flex>
  )
}

export default Painting
