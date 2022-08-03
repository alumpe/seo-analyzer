import type { TableEntry } from "$lib/stores/sitemap";
import type Graph from "./Graph";
import Node from "./Node";

// The Array of graph nodes in the tree
export default class NodeArray extends Array<Node> {
  graph: Graph;

  constructor(graph: Graph) {
    super();
    this.graph = graph;
  }

  // Removes all nodes and references
  clearAllNodes() {
    this.forEach((node) => {
      this.graph.nodeLayer.removeChild(node);
      node.clear();
      node.destroy();
    });
  }

  // Initializes node array from given node data
  initNodesFromData(data: TableEntry[]) {
    data.forEach(() => {
      const nodeObject = new Node(this.graph);

      this.graph.nodeLayer.addChild(nodeObject);
      this.push(nodeObject);
    });
  }
}
