import { defineConfig, type Plugin } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [react() as unknown as Plugin],
});
