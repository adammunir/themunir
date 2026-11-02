import { Conviction } from "@/components/home/Conviction";
import { Hero } from "@/components/home/Hero";
import { IndexTable } from "@/components/home/IndexTable";
import { Pipeline } from "@/components/home/Pipeline";
import { Process } from "@/components/home/Process";
import { ProofBar } from "@/components/home/ProofBar";
import { index, projects, proof } from "@/content";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofBar metrics={proof} />
      <Pipeline projects={projects} />
      <Process />
      <Conviction />
      <IndexTable entries={index} />
    </>
  );
}
