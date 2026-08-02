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

export function useCreateProperty(): UseMutationResult<
  PropertyResponse,
  AxiosError<ServerErrorResponse>,
  CreatePropertyInput
> {
  const router = useRouter();

  return useMutation<
    PropertyResponse,
    AxiosError<ServerErrorResponse>,
    CreatePropertyInput
  >({
    mutationFn: (data: CreatePropertyInput) => propertyService.createProperty(data),
    onSuccess: (data) => {
      toast.success(data?.message || "Property created successfully!");
      router.push("/dashboard/landlord/properties");
    },
    onError: (error) => {
      const serverMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to create property. Please try again.";
      toast.error(serverMessage);
    },
  });
}
