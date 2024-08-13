export const getEnv = <T>(key: T): T => {
	// @ts-ignore
	return import.meta.env[`VITE_APP_${key}`];
};
