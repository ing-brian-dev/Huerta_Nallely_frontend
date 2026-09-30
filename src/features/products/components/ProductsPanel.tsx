
import ButtonAction from "@/shared/ui/ButtonAction";
import ScreenSpinnerLoader from "@/shared/ui/ScreenSpinnerLoader";
import { useModalStore } from "@/shared/store/modalStore";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api/ProductAPI";
import ProductCard from "./ProductCard";
import CreateProduct from "./CreateProduct";

export default function ProductsPanel() {

  const openModal = useModalStore(state => state.openModal);

  const { data, isLoading } = useQuery({
    queryFn: getAllProducts,
    queryKey: ["products"],
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (isLoading) return <ScreenSpinnerLoader subTitle="Obteniendo Productos" />;

  return (
    <>
      <div className="mb-2 flex justify-end">
        <ButtonAction
          type="button"
          onClick={() => openModal({
            title: 'Nuevo Producto',
            content: <CreateProduct />
          })}
        >
          Nuevo Producto
        </ButtonAction>
      </div>
      {data && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {data.data.map(product =>
            <ProductCard
              key={product.id}
              product={product}
            />
          )}
        </div>
      )}
    </>
  );
}
