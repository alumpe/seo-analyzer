import { forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation } from "d3";
import type Graph from "./Graph";
import type Node from "./Node";

const FORCE_LAYOUT_NODE_REPULSION_STRENGTH = -1; // negative value for repulsion
const FORCE_LAYOUT_ITERATIONS = 50;

export const forceLayout = (graph: Graph) => {
  forceSimulation(graph.nodes)
    .force("charge", forceManyBody().strength(FORCE_LAYOUT_NODE_REPULSION_STRENGTH))
    .force("center", forceCenter(graph.width / 2, graph.height / 2).strength(0.1))
    .force("collide", forceCollide((n: Node) => n.radius).strength(0.7))
    // .force(
    //   "link",
    //   forceLink(graph.links)
    //     .id((node: Node) => node.entry!.uniqueKey)
    //     .distance(200)
    //     .strength(2)
    // )
    .stop()
    .tick(FORCE_LAYOUT_ITERATIONS);
};
