import { Conviction } from "@/components/home/Conviction";
import { Hero } from "@/components/home/Hero";
import { IndexTable } from "@/components/home/IndexTable";
import { Pipeline } from "@/components/home/Pipeline";
import { Process } from "@/components/home/Process";
import { index, projects } from "@/content";

export default function Home() {
  return (
    <>
      <Hero />
      <Pipeline projects={projects.filter((p) => ["icentral", "lynx", "onehubtv"].includes(p.slug))} />
      <Process />
      <Conviction />
      <IndexTable entries={index} />
    </>
  );
}
