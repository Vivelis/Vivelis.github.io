import { defineCollection, defineContentConfig, z } from "@nuxt/content";
export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: "data",
      source: "projects/*.json",
      schema: z.object({
        en: z.object({
          id: z.string(),
          title: z.string(),
          description: z.string(),
          image: z.string().optional(),
          link: z.string().url(),
        }),
        fr: z.object({
          id: z.string(),
          title: z.string(),
          description: z.string(),
          image: z.string().optional(),
          link: z.string().url(),
        }),
      }),
    }),
    technos: defineCollection({
      type: "data",
      source: "technos/*.json",
      schema: z.object({
        en: z.object({
          id: z.string(),
          title: z.string(),
          description: z.string(),
          image: z.string().optional(),
          link: z.string().url(),
        }),
        fr: z.object({
          id: z.string(),
          title: z.string(),
          description: z.string(),
          image: z.string().optional(),
          link: z.string().url(),
        }),
      }),
    }),
  },
});
