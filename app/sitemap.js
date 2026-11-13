import { INITIAL_PROJECTS } from "@/lib/siteData";

export default async function sitemap() {
  const baseUrl = "https://ayaadel.design";

  const projectRoutes = INITIAL_PROJECTS.map((proj) => ({
    url: `${baseUrl}/projects/${proj.slug || proj.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...projectRoutes,
  ];
}

