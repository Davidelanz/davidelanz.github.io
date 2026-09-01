import type { Metadata } from "next";
import { metadata as prototypingWorkspace } from "./creating-the-best-prototyping-workspace/page";
import { metadata as dockerOverSsh } from "./docker-over-ssh/page";
import { metadata as neo4jWithDocker } from "./neo4j-with-docker/page";
import { metadata as rGettingStarted } from "./r-getting-started/page";
import { metadata as visualizingNeo4j } from "./visualizing-neo4j-with-gephi/page";

function post(slug: string, metadata: Metadata) {
  return {
    slug,
    title: metadata.title as string,
    description: metadata.description as string,
    date: metadata.other?.date as string,
    tags: metadata.other?.tags as string[],
  };
}

// Posts are authored in their route files; this array only controls listing order.
export const posts = [
  post("r-getting-started", rGettingStarted),
  post("visualizing-neo4j-with-gephi", visualizingNeo4j),
  post("neo4j-with-docker", neo4jWithDocker),
  post("docker-over-ssh", dockerOverSsh),
  post("creating-the-best-prototyping-workspace", prototypingWorkspace),
] as const;
