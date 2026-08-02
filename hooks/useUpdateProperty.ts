import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { propertyService } from "@/services/property.service";
import { CreatePropertyInput, PropertyResponse } from "@/types/property";
import { AxiosError } from "axios";

interface ServerErrorResponse {
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

interface UpdatePropertyVariables {
  id: string;
  payload: CreatePropertyInput;
}

export function useUpdateProperty(): UseMutationResult<
  PropertyResponse,
  AxiosError<ServerErrorResponse>,
  UpdatePropertyVariables
> {
  const router = useRouter();

  return useMutation<
    PropertyResponse,
    AxiosError<ServerErrorResponse>,
    UpdatePropertyVariables
  >({
    mutationFn: ({ id, payload }: UpdatePropertyVariables) =>
      propertyService.updateProperty(id, payload),
    onSuccess: (data) => {
      toast.success(data?.message || "Property updated successfully!");
      router.push("/dashboard/landlord/properties");
    },
    onError: (error) => {
      const serverMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to update property. Please try again.";
      toast.error(serverMessage);
    },
  });
}
