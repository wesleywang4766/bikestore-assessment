import { useState, useEffect } from 'react';
import { newProduct, editProduct } from '../app/(dashboard)/actions';
import { useModal } from '@/providers/context/modal-context';

export const useProductForm = () => {
  const { isOpen, modalContent, closeModal } = useModal();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [isDraft, setIsDraft] = useState(false);

  useEffect(() => {
    if (modalContent) {
      setName(modalContent.name || '');
      setPrice(modalContent.price || 0);
      setStock(modalContent.stock || 0);
      setIsDraft((modalContent.status || 'active') === 'inactive' ? false : true);
    }
  }, [modalContent]);

  const modalType = modalContent?.type || 'create';

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const numericValue = Number(value);
    const numericFields = ['price', 'stock'];

    if (name === 'name') {
      setName(value);
      setIsDraft(value !== '');
    } else if (numericFields.includes(name)) {
      setPrice(name === 'price' ? numericValue : price);
      setStock(name === 'stock' ? numericValue : stock);
      setIsDraft(numericValue !== 0);
    }
  };

  const saveProduct = () => {
    const status: "inactive" | "active" | "archived" = isDraft ? 'active' : 'inactive';
    const availableAt = new Date();
    const imageUrl = '';

    if (modalType === 'create') {
      newProduct({ name, price: price.toString(), stock, status, availableAt, imageUrl });
    } else {
      editProduct(modalContent.id, { name, price: price.toString(), stock, status });
    }
    closeModal();
  }

  return {
    isOpen,
    name,
    price,
    stock,
    isDraft,
    modalType,
    handleInputChange,
    saveProduct,
    closeModal
  };
};