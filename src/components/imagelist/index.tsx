import request from '@/service/request';
import { Box, Flex, Link, ListItem, Spinner, Text, UnorderedList } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

function ImageList({ isPhone = false }: { isPhone?: boolean }) {
  const { data: Images } = useQuery(['getImages'], () => request('/images'), {
    refetchInterval: 10000
  });

  if (isPhone) {
    return (
      <UnorderedList>
        {Array.isArray(Images?.data?.data) &&
          Images?.data?.data?.map((item: any) => {
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
                    {item?.status === 'completed' ? '✓' : <Spinner speed="1s" size={'xs'} />}
                  </Box>
                </Flex>
              </ListItem>
            );
          })}
      </UnorderedList>
    );
  }

  return (
    <Flex
      m="16px"
      p="24px"
      w="382px"
      flexDirection={'column'}
      bg="primary_black.100"
      borderWidth={'1px'}
      borderColor={'primary_black.400'}
      borderRadius={'16px'}
      overflowY={'auto'}
    >
      <UnorderedList>
        {Array.isArray(Images?.data?.data) &&
          Images?.data?.data?.map((item: any) => {
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
                    {item?.status === 'completed' ? '✓' : <Spinner speed="1s" size={'xs'} />}
                  </Box>
                </Flex>
              </ListItem>
            );
          })}
      </UnorderedList>
    </Flex>
  );
}

export default ImageList;
