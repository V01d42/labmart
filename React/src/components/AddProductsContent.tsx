import {
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  VStack,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useState, useCallback } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  price: string;
  quantity: number;
  onAddProduct: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  productName,
  price,
  quantity,
  onAddProduct,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>確認</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <p>追加しますか？</p>
        <p>商品名: {productName}</p>
        <p>価格: {price}</p>
        <p>数量: {quantity}</p>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" mr={3} onClick={onClose}>
          キャンセル
        </Button>
        <Button
          colorScheme="blue"
          onClick={() => {
            onAddProduct();
            onClose();
          }}
        >
          追加
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

const AddProductsContent: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const handleProductNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setProductName(e.target.value);
    },
    []
  );

  const handlePriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPrice(e.target.value);
    },
    []
  );

  const handleQuantityChange = useCallback((valueString: string) => {
    setQuantity(Number(valueString));
  }, []);

  const handleAddProduct = useCallback(async () => {
    // APIを叩いて商品を追加する処理
    const productData = {
      name: productName,
      description: "",
      store_id: 1,
      price: Number(price),
      stock: quantity,
      admin_id: 1,
    };

    try {
      const response = await fetch("http://localhost:8000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      // レスポンスの処理
      if (!response.ok) {
        throw new Error("商品の追加に失敗しました");
      }

      const result = await response.json();
      console.log("商品が正常に追加されました:", result);

      // 入力フィールドをリセット
      setProductName("");
      setPrice("");
      setQuantity(1);
    } catch (error) {
      console.error(error);
    }
  }, [productName, price, quantity]);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Flex justifyContent="center" alignItems="center">
        <VStack justifyContent="center" alignItems="center" spacing={10}>
          <Input
            placeholder="商品名"
            type="text"
            value={productName}
            onChange={handleProductNameChange}
          />
          <Input
            placeholder="価格"
            type="number"
            value={price}
            onChange={handlePriceChange}
          />
          <NumberInput
            defaultValue={1}
            min={1}
            value={quantity}
            onChange={handleQuantityChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button colorScheme="blue" width="150px" onClick={onOpen}>
            追加
          </Button>
        </VStack>
      </Flex>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        productName={productName}
        price={price}
        quantity={quantity}
        onAddProduct={handleAddProduct}
      />
    </Box>
  );
};

export default AddProductsContent;
