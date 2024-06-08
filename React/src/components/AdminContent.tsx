import { Box, Button, Flex, VStack } from "@chakra-ui/react";

const AdminContent = () => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Flex justifyContent="center" alignItems="center">
        <VStack justifyContent="center" alignItems="center" spacing={10}>
          <Button colorScheme="blue" width="150px">
            商品の追加
          </Button>
          <Button colorScheme="blue" width="150px">
            在庫の確認
          </Button>
          <Button colorScheme="blue" width="150px">
            請求金額の確認
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
};

export default AdminContent;
