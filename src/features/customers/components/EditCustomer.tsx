import { Form } from "@/shared/forms/Form";
import { FormProvider, useForm } from "react-hook-form";
import CustomerForm from "./CustomerForm";
import { FormSubmit } from "@/shared/forms/FormSubmit";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomerUpdateSchema, type CustomerUpdateInput } from "../schemas/customerSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getCustomerById, updateCustomerById } from "../api/customerAPI";
import { useCustomerModalStore } from "../store/customer.store";
import ScreenSpinnerLoader from "@/shared/ui/ScreenSpinnerLoader";

export default function EditCustomer() {

  const closeModal = useCustomerModalStore(state => state.closeModal)!;
  const customerId = useCustomerModalStore(state => state.customerId)!;

  const { data, isLoading } = useQuery({
    queryFn: () => getCustomerById(customerId),
    queryKey: ['customer', customerId],
    refetchOnWindowFocus: false,
    retry: false
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: updateCustomerById,
    onError: ({ message }) => {
      toast.error(message);
    },
    onSuccess: ({ message }) => {
      toast.success(message);
      methods.reset();
      closeModal();
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customer', customerId] });
    }
  });

  const methods = useForm({
    resolver: zodResolver(CustomerUpdateSchema),
    mode: 'all'
  });

  const onSubmit = async (formData: CustomerUpdateInput) => {
    const data = {
      id: customerId,
      ...formData
    }
    mutate(data);
  }

  if (isLoading) return <ScreenSpinnerLoader subTitle="Obteniendo Cliente" />

  if (data) return (
    <FormProvider
      {...methods}
    >
      <Form
        className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <CustomerForm customer={data.data} />
        <FormSubmit
          value={isPending ? 'Guardando...' : 'Editar Cliente'}
          disabled={isPending}
          className="md:col-span-2"
        />
      </Form>
    </FormProvider>
  )
}
