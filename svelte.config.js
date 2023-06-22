import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess({
    scss: {
      renderSync: true,
      prependData: "@use 'src/styles/abstracts' as *;",
    },
  }),

  kit: {
    adapter: adapter(),
    alias: {
      $routes: "src/routes",
    },
  },
};

export default config;
