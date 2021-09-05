import { memo, useState } from 'react'
import { AddProductToWishlistProps } from "./AddProductToWishlist"
import dynamic from 'next/dynamic'

// import { AddProductToWishlistProps } from './AddProductToWishlist';

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
  return import("./AddProductToWishlist").then(mod => mod.AddProductToWishlistProps)
},{
  // eslint-disable-next-line react/display-name
  loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
  product: {
    id: number;
    title: string;
    price: number;
    priceFormatted: string;
  },
  onAddToWishList: (id: number) => void;
}


function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)} >Adiconar aos favoritos</button>

      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}

    </div>
  );
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product);
})