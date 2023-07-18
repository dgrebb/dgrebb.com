import fs from "fs";
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
    https: {
      key: fs.readFileSync("local.dgrebb.com.key"),
      cert: fs.readFileSync("local.dgrebb.com.crt"),
    },
  },
});
