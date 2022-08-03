import * as PIXI from "pixi.js";
import type Graph from "./Graph";

export default class Node extends PIXI.Graphics {
  private graph: Graph;
  private radius: number;

  constructor(graph: Graph) {
    super();

    this.graph = graph;

    this.interactive = true;
    this.buttonMode = true;

    this.radius = 30;
    this.hitArea = new PIXI.Circle(0, 0, this.radius);

    this.redraw();
  }

  // Redraws the node with its correct color
  redraw() {
    this.clear();

    this.beginFill(0x666666);
    this.drawCircle(0, 0, this.radius);
    this.endFill();
  }

  // Sets the postion of the node and its attached label
  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  setRadius(r: number) {
    this.radius = r;
    this.hitArea = new PIXI.Circle(0, 0, r);
  }
}
