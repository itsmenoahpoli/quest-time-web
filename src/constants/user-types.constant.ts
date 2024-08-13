import { useAuthStore } from "~/store";

export enum USER_TYPES {
	TEACHER = "teacher",
	STUDENT = "student",
	ADMIN = "admin",
}

export const CURRENT_USER_TYPE = () => {
	const { user } = useAuthStore();

	return user?.account_type;
};
