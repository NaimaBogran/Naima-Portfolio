import { DEFAULT_AUTO_RESET_SECONDS } from "@shared/constants";

export const AUTO_RESET_SECONDS: number =
  Number(import.meta.env.VITE_CONTACT_RESET_SECONDS) || DEFAULT_AUTO_RESET_SECONDS;
