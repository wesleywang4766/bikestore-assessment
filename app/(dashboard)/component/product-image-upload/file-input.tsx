import React from 'react';

interface FileInputProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileInput: React.FC<FileInputProps> = ({ fileInputRef, handleFileChange }) => (
  <input
    type="file"
    accept="image/*"
    ref={fileInputRef}
    onChange={handleFileChange}
    className="hidden"
  />
);