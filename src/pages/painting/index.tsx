import request from '@/service/request'
import {
  Box,
  Button,
  Flex,
  Select,
  Textarea,
  Text,
  Spinner,
  ListItem,
  UnorderedList,
  Link,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { useMutation, useQuery } from '@tanstack/react-query'

function Painting() {
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [model, setModel] = useState('None')

  const { data } = useQuery(['getModalList'], () => request('/model_list'))

  const { data: Images } = useQuery(['getImages'], () => request('/images'), {
    refetchInterval: 10000,
  })

  const onChangePrompt = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
  }

  const onNegativePrompt = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNegativePrompt(e.target.value)
  }

  const imageMutation = useMutation(['generImage'], () =>
    request.post('/generate', {
      prompt: prompt,
      negative_prompt: negativePrompt,
      model: model,
    })
  )

  const sliceImageName = (str: string) => {
    try {
      const str = '736188cc-084d-4601-9eeb-344bfcbb6049.jpg'
      const fileName = str.substring(str.lastIndexOf('-') + 1)
      return fileName
    } catch (error) {
      return ''
    }
  }
  const generImage = () => {
    imageMutation.mutate()
  }

  console.log(data?.data?.models)

  return (
    <Flex
      h="100%"
      w="1200px"
      justifyContent={'center'}
      bg={'#262626'}
      pt="61px"
      mx={'auto'}>
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
          <Select onChange={(e) => setModel(e.target.value)}>
            {!!data?.data?.models &&
              data?.data?.models?.map((item: any) => {
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
      <Flex
        m="16px"
        p="24px"
        w="382px"
        flexDirection={'column'}
        // alignItems={'center'}
        minH={'740px'}
        bg="primary_black.100"
        borderWidth={'1px'}
        borderColor={'primary_black.400'}
        borderRadius={'16px'}
        overflowY={'auto'}>
        <UnorderedList>
          {Array.isArray(Images?.data) &&
            Images?.data?.map((item: any) => {
              return (
                <ListItem key={item?._id} py="4px">
                  <Flex alignItems="center">
                    {item?.status === 'completed' ? (
                      <Link href={item?.link} isExternal>
                        {item?.name}
                      </Link>
                    ) : (
                      <Text>{item?.name}</Text>
                    )}

                    <Box ml="auto">
                      {item?.status === 'completed' ? (
                        '✓'
                      ) : (
                        <Spinner speed="1s" size={'xs'} />
                      )}
                    </Box>
                  </Flex>
                </ListItem>
              )
            })}
        </UnorderedList>
      </Flex>
      {/* <Flex
        p={100}
        flexGrow={1}
        flexShrink={1}
        position={'relative'}
        alignItems="center"
        justifyContent={'center'}>
        <Flex
          maxW={700}
          maxH={700}
          minW={200}
          minH={200}
          w={'100%'}
          h={'100%'}
          alignItems="center"
          justifyContent={'center'}
          border={'1px dashed hsla(0,0%,100%,.15)'}>
          {imageMutation?.data?.data?.image?.status === 'pending' ? (
            <Spinner thickness="4px" w={'60px'} h={'60px'} speed="1s" />
          ) : (
            <Box fontSize={'12px'} color={'white.200'}>
              快去左侧创造吧
            </Box>
          )}
        </Flex>
      </Flex>
      <Flex
        w="160px"
        minW="120px"
        minH={'760px'}
        borderLeft={'1px solid #424242'}>
        <Text>记录</Text>
      </Flex> */}
    </Flex>
  )
}

export default Painting
