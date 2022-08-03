import * as PIXI from "pixi.js";
import type Graph from "./Graph";
import type Node from "./Node";

type LinkData = {
  sourceNode: Node;
  targetNode: Node;
};

export default class Link extends PIXI.Graphics {
  graph: Graph;
  source: Node;
  target: Node;

  constructor(graph: Graph, linkData: LinkData) {
    super();

    this.graph = graph;

    this.source = linkData.sourceNode;
    this.target = linkData.targetNode;

    this.draw();
  }

  // Redraws the link
  draw() {
    this.clear();

    this.alpha = 1;
    this.lineStyle(3, 0x555555);
    this.moveTo(this.source.x, this.source.y);
    this.lineTo(this.target.x, this.target.y);
    this.endFill();
    this.visible = true;
  }
}
