import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      Web3: "web3/dist/web3.min.js",
    },

    // or
    // alias: [
    //   {
    //     find: "Web3",
    //     replacement: "web3/dist/web3.min.js",
    //   },
    // ],
  },
  plugins: [
    react(),
    tsconfigPaths({
      parseNative: false,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/styles/mixins/index.scss";
        `,
      },
    },
  },
  server: {
    port: 5020,
  },
});
