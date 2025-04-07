// @ts-check
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';

import tailwindcss from '@tailwindcss/vite';
import icon from "astro-icon";

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()]
    },

    integrations: [icon({
        include: {
            mdi: ["*"]
        }
    }), svelte()],
    output: 'server',
    adapter: vercel(),
});