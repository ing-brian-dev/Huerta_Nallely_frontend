import { Form } from "@/shared/forms/Form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { GetOrchardCropById, UpdateOrchardCrop } from "../api/OrchardCropAPI";
import OrchardCropForm from "./OrchardCropForm";
import Spinner from "@/shared/ui/Spinner";
import { FormSubmit } from "@/shared/forms/FormSubmit";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateOrchardCropSchema, type CreateOrchardCropInput } from "../schemas/orchardCropSchema";
import toast from "react-hot-toast";
import { useModalStore } from "@/shared/store/modalStore";

export default function EditOrchardCrop() {

  const closeModal = useModalStore(state => state.closeModal);
  const id = useModalStore(state => state.id)!;

  const { data, isLoading } = useQuery({
    queryFn: () => GetOrchardCropById(id),
    queryKey: ['orchardCrop', id],
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: UpdateOrchardCrop,
    onError: ({ message }) => {
      toast.error(message);
    },
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ['orchards'] });
      queryClient.invalidateQueries({ queryKey: ['orchardCrop', id] });
      closeModal();
    }
  })

  const methods = useForm({
    resolver: zodResolver(CreateOrchardCropSchema)
  });

  const onSubmit = async (formData: CreateOrchardCropInput) => {
    const orchardCrop = {
      ...formData,
      id,
    }
    mutate(orchardCrop);
  }

  if (isLoading) return <Spinner />

  if (data) return (
    <FormProvider
      {...methods}
    >
      <Form
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <OrchardCropForm orchardCrop={data.data} />
        <FormSubmit
          value="Guardar Cultivo"
        />
      </Form>
    </FormProvider>
  )
}
