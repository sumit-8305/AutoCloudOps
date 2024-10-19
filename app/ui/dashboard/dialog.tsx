import { useState } from 'react';

interface DialogProps {
  message: string;
  isError: boolean;
}

const DialogBox = ({ message, isError }: DialogProps) => {
  if (!message) return null;

  return (
    <div className={`fixed top-5 right-5 p-4 rounded shadow-md ${isError ? 'bg-red-500' : 'bg-green-500'} text-white`}>
      <p>{message}</p>
    </div>
  );
};

export default DialogBox;
