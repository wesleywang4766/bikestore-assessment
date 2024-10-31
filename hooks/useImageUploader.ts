import { useState, useRef, useEffect } from 'react';
import { uploadProductImage } from '../app/(dashboard)/actions';

export const useImageUploader = (productId: number) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [canvasData, setCanvasData] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleOpenFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setSelectedImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!canvasRef.current || !selectedImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.src = selectedImage;
    image.onload = () => {
      const canvasAspectRatio = canvas.width / canvas.height;
      const imageAspectRatio = image.width / image.height;

      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let drawX = 0;
      let drawY = 0;

      if (canvasAspectRatio > imageAspectRatio) {
        drawHeight = canvas.height;
        drawWidth = drawHeight * imageAspectRatio;
        drawX = (canvas.width - drawWidth) / 2;
      } else {
        drawWidth = canvas.width;
        drawHeight = drawWidth / imageAspectRatio;
        drawY = (canvas.height - drawHeight) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
      setCanvasData(canvas.toDataURL('image/png'));
    };
  }, [selectedImage]);

  const handleUpload = async () => {
    if (!canvasData) return;
    const imageData = canvasData.replace(/^data:image\/png;base64,/, '');
    await uploadProductImage(productId, imageData);
    alert('image uploaded!');
  };

  return {
    selectedImage,
    fileInputRef,
    canvasRef,
    handleOpenFileDialog,
    handleFileChange,
    handleUpload,
  };
};