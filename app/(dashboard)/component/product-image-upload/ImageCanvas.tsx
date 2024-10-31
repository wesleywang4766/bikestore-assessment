import React from 'react';
import { CirclePlusIcon } from 'lucide-react';

interface ImageCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  selectedImage: string | null;
  handleOpenFileDialog: () => void;
}

export const ImageCanvas: React.FC<ImageCanvasProps> = ({ canvasRef, selectedImage, handleOpenFileDialog }) => (
  <div
    className="aspect-square w-32 h-32 rounded-md bg-gray-100 cursor-pointer flex items-center justify-center"
    onClick={() => handleOpenFileDialog()}
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
);