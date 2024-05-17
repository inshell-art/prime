// Abstraction for accessing environment variables
const getEnv = (key: string): string | undefined => {
  return import.meta.env[key];
};

export default {
  get VITE_APP_API_BASE_URL() {
    return getEnv("VITE_APP_API_BASE_URL");
  },
};
