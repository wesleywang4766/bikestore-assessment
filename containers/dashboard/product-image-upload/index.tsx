import React from 'react';
import { UploadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useImageUploader } from '@/hooks/useImageUploader';
import { FileInput } from './FileInput';
import { ImageCanvas } from './ImageCanvas';

interface ImageUploaderProps {
  productId: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ productId }) => {
  const {
    selectedImage,
    fileInputRef,
    canvasRef,
    handleOpenFileDialog,
    handleFileChange,
    handleUpload,
  } = useImageUploader(productId);

  return (
    <div className="flex flex-col gap-4 relative">
      <FileInput fileInputRef={fileInputRef} handleFileChange={handleFileChange} />
      <ImageCanvas canvasRef={canvasRef} selectedImage={selectedImage} handleOpenFileDialog={handleOpenFileDialog} />
      {selectedImage && (
        <Button
          onClick={handleUpload}
          className="absolute ml-[42px] mt-[40px] px-3 py-1 bg-primary/50 text-white rounded hover:bg-primary"
        >
          <UploadIcon className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
};

export default ImageUploader;