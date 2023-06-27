import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    appDir: "s",
    adapter: adapter({
      pages: "build",
      assets: "build",
      precompress: true,
      strict: true,
    }),
    prerender: {
      handleHttpError: ({ path, referrer, message }) => {
        if (path === "/404" && referrer === "/privacy/") {
          return;
        }
        throw new Error(message);
      },
    },
  },
  preprocess: vitePreprocess(),
};

export default config;
