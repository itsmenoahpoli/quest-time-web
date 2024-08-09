import { toast } from "vue3-toastify";

export const handleError = (error: unknown, message: string) => {
	console.log({ error, message });
	toast.error(message);
};
