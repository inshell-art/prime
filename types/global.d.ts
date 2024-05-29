export {};

declare global {
  namespace NodeJS {
    interface Global {
      import: {
        meta: {
          env: {
            VITE_PORT: string;
          };
        };
      };
    }
  }
}
