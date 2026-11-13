import { notFound } from "next/navigation";
import { INITIAL_PROJECTS } from "@/lib/siteData";
import ProjectDetailClient from "./ProjectDetailClient";

export async function generateStaticParams() {
  const params = [];
  INITIAL_PROJECTS.forEach((proj) => {
    if (proj.id) params.push({ id: proj.id });
    if (proj.slug) params.push({ id: proj.slug });
    if (Array.isArray(proj.aliases)) {
      proj.aliases.forEach((alias) => params.push({ id: alias }));
    }
  });
  return params;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = INITIAL_PROJECTS.find(
    (p) => p.id === id || p.slug === id || (Array.isArray(p.aliases) && p.aliases.includes(id))
  );

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested design project could not be found."
    };
  }

  const title = `${project.title} | Aya Adel Portfolio`;
  const description = project.description || project.tagline;

  return {
    title,
    description,
    alternates: {
      canonical: `https://ayaadel.design/projects/${project.slug || project.id}`
    },
    openGraph: {
      title,
      description,
      url: `https://ayaadel.design/projects/${project.slug || project.id}`,
      type: "article",
      images: [
        {
          url: project.image || "/projectImage/lumina.webp",
          width: 1200,
          height: 675,
          alt: project.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.image || "/projectImage/lumina.webp"]
    }
  };
}

export default async function ProjectDetailPage({ params }) {
  const { id } = await params;
  const projectIndex = INITIAL_PROJECTS.findIndex(
    (p) => p.id === id || p.slug === id || (Array.isArray(p.aliases) && p.aliases.includes(id))
  );

  if (projectIndex === -1) {
    notFound();
  }

  const project = INITIAL_PROJECTS[projectIndex];
  const prevProject = projectIndex > 0 ? INITIAL_PROJECTS[projectIndex - 1] : null;
  const nextProject =
    projectIndex < INITIAL_PROJECTS.length - 1 ? INITIAL_PROJECTS[projectIndex + 1] : null;

  return (
    <ProjectDetailClient
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  );
}
