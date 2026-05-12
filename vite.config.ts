import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Mấy cái plugin như react() đã có sẵn bên trong rồi, đại ca không cần add lại đâu
  vite: {
    base: '/', // Vì dùng domain riêng nên để là root luôn đại ca ạ
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});