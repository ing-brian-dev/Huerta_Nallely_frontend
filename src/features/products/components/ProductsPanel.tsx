
import ButtonAction from "@/shared/ui/ButtonAction";
import Modal from "@/shared/ui/Modal";
import ScreenSpinnerLoader from "@/shared/ui/ScreenSpinnerLoader";
import { useModalStore } from "@/shared/store/modalStore";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api/ProductAPI";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import ProductCard from "./ProductCard";

export default function ProductsPanel() {
  
  const open = useModalStore(state => state.open);
  const id = useModalStore(state => state.id);
  const openModal = useModalStore(state => state.openModal);
  const closeModal = useModalStore(state => state.closeModal);

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
          onClick={() => openModal()}
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
      <Modal
        open={open}
        onClose={closeModal}
        title={id !== null ? "Editar Producto" : "Crear Producto"}
        description={id !== null ? "Actualiza la información del producto" : "Ingresa la información del nuevo producto"}
      >
        {id !== null ? <EditProduct /> : <CreateProduct />}
      </Modal>
    </>
  );
}
