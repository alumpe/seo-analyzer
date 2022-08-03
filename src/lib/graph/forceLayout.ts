import { forceManyBody, forceSimulation, forceX, forceY } from "d3";
import type Graph from "./Graph";

const FORCE_LAYOUT_NODE_REPULSION_STRENGTH = -500; // negative value for repulsion
const FORCE_LAYOUT_ITERATIONS = 100;

export const forceLayout = (graph: Graph) => {
  forceSimulation(graph.nodes)
    .force("charge", forceManyBody().strength(FORCE_LAYOUT_NODE_REPULSION_STRENGTH))
    .force(
      "x",

      forceX()
        .x(graph.width / 2)
        .strength(0.2)
    )
    .force("y", forceY(graph.height / 2).strength(0.2))
    // .force(
    //   "link",
    //   d3
    //     .forceLink(this.links)
    //     .id((linkData) => linkData.value)
    //     .distance(20)
    //     .strength(0.2)
    // )
    .stop()
    .tick(FORCE_LAYOUT_ITERATIONS);
};
