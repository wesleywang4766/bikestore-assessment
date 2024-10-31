import { useState, useRef, useEffect } from 'react';
import { uploadProductImage } from './actions';
import { Button } from '@/components/ui/button';
import { UploadIcon, CirclePlusIcon } from 'lucide-react';

interface ImageUploaderProps {
  productId: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ productId }) => {
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
      const squareSize = 128;
      const x = (canvas.width - squareSize) / 2;
      const y = (canvas.height - squareSize) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, x, y, squareSize, squareSize, 0, 0, canvas.width, canvas.height);
      setCanvasData(canvas.toDataURL('image/png'));
    };
  }, [selectedImage]);

  const handleUpload = async () => {
    if (!canvasData) return;
    const imageData = canvasData.replace(/^data:image\/png;base64,/, '');
    await uploadProductImage(productId, imageData);
    alert('Image uploaded successfully');
  };

  return (
    <div className="flex flex-col gap-4 relative">
      <div
        className="aspect-square w-32 h-32 rounded-md bg-gray-100 cursor-pointer flex items-center justify-center"
        onClick={handleOpenFileDialog}
      >
        {selectedImage ? (
          <canvas
            ref={canvasRef}
            width={128}
            height={128}
            className="rounded"
          />
        ) : (
          <CirclePlusIcon className="h-8 w-8 text-gray-400" />
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

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