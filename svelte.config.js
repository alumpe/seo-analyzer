import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    scss: {
      renderSync: true,
      prependData: "@use 'src/styles/abstracts' as *;",
    },
  }),

  kit: {
    adapter: adapter(),
    alias: {
      $lib: "src/lib",
      $routes: "src/routes",
    },
  },
};

export default config;
