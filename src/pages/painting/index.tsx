import ImageList from '@/components/imagelist'
import { useCustomToast } from '@/hooks/useCustomToast'
import { useScreen } from '@/hooks/useScreen'
import request from '@/service/request'
import { Box, Button, Flex, Select, Textarea } from '@chakra-ui/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { debounce } from 'lodash'
import { useState } from 'react'

function Painting() {
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [model, setModel] = useState('None')
  const { toast } = useCustomToast()
  const { isPC } = useScreen()

  const { data } = useQuery(['getModalList'], () => request('/model_list'))

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
    toast({ title: '已加入队列', status: 'success' })
  }

  return (
    <Flex
      h="100%"
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
      {isPC ? <ImageList /> : null}
    </Flex>
  )
}

export default Painting
