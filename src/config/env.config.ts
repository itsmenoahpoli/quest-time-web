export const getEnv = <T>(key: T): T => {
  return import.meta.env[`VITE_APP_${key}`];
};
