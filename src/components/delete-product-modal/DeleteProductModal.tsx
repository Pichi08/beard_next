import React from "react";

interface DeleteProductModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({ open, onClose, onConfirm, productName }) => {
  if (!open) return null; // No renderizar el modal si no está abierto

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-4 bg-white rounded-lg shadow-lg ">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
          aria-label="Cerrar modal"
        >
          <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 6l8 8m0-8L6 14" />
          </svg>
        </button>
        <div className="text-center p-5">
          <svg
            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-red-700"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="mb-5 text-lg font-medium text-black">
            ¿Está seguro de que desea eliminar el producto <span className="font-bold">"{productName}"</span>?
          </h3>
          <p className="mb-5 text-lg font-medium text-red-500" >Esta accion no se puede deshacer</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              No, cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
            >
              Sí, eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
