import fs from "fs";
import path from "path";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import Icons from "unplugin-icons/vite";

export default defineConfig({
  plugins: [
    sveltekit(),
    Icons({
      compiler: "svelte",
    }),
  ],
  optimizeDeps: {
    include: ["highlight.js/lib/core"],
  },
  server: {
    proxy: {
      "^/uploads/.*": {
        target: "http://local.cms.dgrebb.com:1337/uploads",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/uploads/, ""),
      },
    },
    https: {
      key: fs.readFileSync("local.dgrebb.com.key"),
      cert: fs.readFileSync("local.dgrebb.com.crt"),
    },
    port: 443,
  },
});
