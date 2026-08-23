import { defineCollection, defineContentConfig, z } from "@nuxt/content";
export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: "data",
      source: "projects/*.json",
      schema: z.object({
        id: z.string(),
        order: z.number().optional(),
        image: z.string().optional(),
        images: z.array(z.string()).optional(),
        link: z.string().url(),
        demo: z.string().url().optional(),
        video: z.string().url().optional(),
        en: z.object({
          title: z.string(),
          description: z.string(),
        }),
        fr: z.object({
          title: z.string(),
          description: z.string(),
        }),
      }),
    }),
    technologies: defineCollection({
      type: "data",
      source: "technologies/*.json",
      schema: z.object({
        id: z.string(),
        icon: z.string().optional(),
        image: z.string().optional(),
        link: z.string().url(),
        en: z.object({
          title: z.string(),
          description: z.string(),
        }),
        fr: z.object({
          title: z.string(),
          description: z.string(),
        }),
      }),
    }),
  },
});
