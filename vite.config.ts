import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  // Relative asset paths work on a project Pages URL and a custom domain.
  base: './',
  plugins: [svelte()],
});
