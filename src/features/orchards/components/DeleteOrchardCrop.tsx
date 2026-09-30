import { Form } from "@/shared/forms/Form";
import FormCancelButton from "@/shared/forms/FormCancelButton";
import { FormSubmit } from "@/shared/forms/FormSubmit";
import { useModalStore } from "@/shared/store/modalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrchardCropById } from "../api/OrchardCropAPI";
import toast from "react-hot-toast";

export default function DeleteOrchardCrop() {

  const closeModal = useModalStore(state => state.closeModal);
  const id = useModalStore(state => state.id)!;

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteOrchardCropById,
    onError: ({ message }) => {
      toast.error(message)
    },
    onSuccess: ({ message }) => {
      toast.success(message);
      closeModal();
      queryClient.invalidateQueries({ queryKey: ['orchards'] });
    }
  });

  const onSubmit = async ( e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(id);
  }

  return (
    <Form
      onSubmit={onSubmit}
    >
      <FormSubmit
        type="submit"
        value='Eliminar Cultivo'
      />

      <FormCancelButton
        onClick={closeModal}
      >
        Cancelar
      </FormCancelButton>
    </Form>
  )
}
