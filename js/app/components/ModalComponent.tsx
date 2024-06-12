import { useState } from 'react';
import React from 'react';

export default function ModalComponent({show, onClose, children}: {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(show);

  if (!visible)
    return;

  return (
    <div className="fixed inset-0 bg-blur flex items-center justify-center z-50">
      <div className="bg-zinc-700 p-8 rounded shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => {
            onClose();
            setVisible(false);
          }}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};