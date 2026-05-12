import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Mấy cái plugin như react() đã có sẵn bên trong rồi, đại ca không cần add lại đâu
  vite: {
    base: '/haokaida-global-trade/', // Chèn base vào trong mục vite này mới chuẩn
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});