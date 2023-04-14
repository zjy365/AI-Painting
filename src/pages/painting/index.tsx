import { Box, Button, Flex, Select, Textarea, Text } from '@chakra-ui/react'
import { useState } from 'react'

function Painting() {
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePromp] = useState('')
  const [modal, setModal] = useState('')

  return (
    <Flex h="100%" w="100%">
      <Flex
        m="16px"
        p="14px"
        w="382px"
        flexDirection={'column'}
        alignItems={'center'}
        minH={'740px'}
        bg="primary_black.100"
        borderWidth={'1px'}
        borderColor={'primary_black.400'}
        borderRadius={'16px'}>
        <Textarea placeholder="Here is a sample placeholder" />
        <Textarea placeholder="Here is a sample placeholder" />
        <Box>
          <Select placeholder="Select option">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Box>
        <Button></Button>
        <Box></Box>
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
        w="120px"
        minW="120px"
        minH={'760px'}
        borderLeft={'1px solid #424242'}>
        <Text>记录</Text>
      </Flex>
    </Flex>
  )
}

export default Painting
