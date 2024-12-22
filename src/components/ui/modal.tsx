import { ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close the modal if the overlay is clicked
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50" onClick={handleOverlayClick}>
      <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onClose}
            className="text-xl font-semibold text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
