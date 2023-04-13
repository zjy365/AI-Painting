import { Flex, Text } from '@chakra-ui/react'

const Navbar = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="teal.500"
      color="white">
      <Text fontSize="xl" fontWeight="bold">
        My Website
      </Text>
    </Flex>
  )
}

export default Navbar
