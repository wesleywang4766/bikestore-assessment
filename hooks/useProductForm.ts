import { useState, useEffect } from 'react';
import { newProduct, editProduct } from '../app/(dashboard)/actions';
import { useModal } from '@/providers/context/modal-context';

export const useProductForm = () => {
  const { isOpen, modalContent, closeModal } = useModal();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [type, setType] = useState('road bike');
  const [isDraft, setIsDraft] = useState(false);

  useEffect(() => {
    if (modalContent) {
      setName(modalContent.name || '');
      setDescription(modalContent.description || '');
      setType(modalContent.type || '');
      setRating(modalContent.rating || 0);
      setPrice(modalContent.price || 0);
      setQuantity(modalContent.quantity || 0);
      setIsDraft((modalContent.status || 'active') === 'draft' ? false : true);
    }
  }, [modalContent]);

  const modalType = modalContent?.modalType || 'create';

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, value } = event.target;
    const numericFields = ['rating', 'price', 'quantity'];

    console.log(fieldName, value);

    if (numericFields.includes(fieldName)) {
      const numericValue = Number(value);
      setRating(fieldName === 'rating' ? numericValue : rating);
      setPrice(fieldName === 'price' ? numericValue : price);
      setQuantity(fieldName === 'quantity' ? numericValue : quantity);
      setIsDraft(numericValue !== 0);
    } else {
      setName(fieldName === 'name' ? value : name);
      setDescription(fieldName === 'description' ? value : description);
      setType(fieldName === 'type' ? value : type);
      setIsDraft(value !== '');
    }
  };

  const saveProduct = async () => {
    const status: "draft" | "active" | "archived" = isDraft ? 'active' : 'draft';
    const productType = type as "road bike" | "mountain bike" | "racing bike";
    const availableAt = new Date();
    const imageUrl = '';

    if (modalType === 'create') {
      newProduct({
        name,
        description,
        type: productType,
        rating: rating.toString(),
        price: price.toString(),
        quantity,
        status,
        availableAt,
        imageUrl
      }).then(() => alert('created!'));
    } else {
      editProduct(modalContent.id, {
        name,
        description,
        type: productType,
        rating: rating.toString(),
        price: price.toString(),
        quantity,
        status
      }).then(() => alert('updated!'));
    }
    closeModal();
  }

  return {
    isOpen,
    name,
    description,
    type,
    rating,
    price,
    quantity,
    isDraft,
    modalType,
    handleInputChange,
    saveProduct,
    closeModal
  };
};