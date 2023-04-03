/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REQUESTER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
