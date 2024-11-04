import React from 'react';

interface Props {
  name: string;
  image: string;
}

export const CategoryCard = ({ name, image }: Props) => {
  return (
    <div className="relative group flex flex-col items-center cursor-pointer overflow-hidden rounded-lg shadow-md bg-white">
      {/* Fondo oscuro y efecto hover en toda la tarjeta */}
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

      {/* Imagen */}
      <div className="relative w-40 h-40 overflow-hidden"> {/* Tamaño fijo para la imagen */}
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105" 
        />
      </div>
      
      {/* Nombre de la categoría */}
      <h3 className="mt-2 text-center text-lg font-semibold text-green-600">{name}</h3>
    </div>
  );
};
