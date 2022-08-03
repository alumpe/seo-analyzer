import { ParsedPageEntry } from "$lib/stores/PageEntry";
import type Graph from "./Graph";
import Link from "./Link";

// The array of graph links between nodes in the tree
export default class LinkArray extends Array<Link> {
  graph: Graph;

  constructor(graph: Graph) {
    super();
    this.graph = graph;
  }

  // Redraw all links
  redrawAllLinks() {
    this.forEach((link) => link.draw());
  }

  // Clears all PIXI references of links and the links themselves
  clearAllLinks() {
    this.forEach((link) => {
      link.clear();
      this.graph.linkLayer.removeChild(link);
      link.destroy();
    });
  }

  // Initializes the array from new link data
  initLinksFromNodes() {
    this.graph.nodes.forEach((node) => {
      const entry = node.entry;

      if (entry instanceof ParsedPageEntry) {
        entry.internalLinks.forEach((link) => {
          const dest = this.graph.nodes.find((n) => n.entry.uniqueKey === link.uniqueKey);
          if (!dest) return;

          const linkData = {
            sourceNode: node,
            targetNode: dest,
          };

          const linkObject = new Link(this.graph, linkData);

          this.graph.linkLayer.addChild(linkObject);
          this.push(linkObject);
        });
      }
    });
  }
}
