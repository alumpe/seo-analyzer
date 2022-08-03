import { ParsedPageEntry } from "$lib/stores/PageEntry";
import type { TableEntry } from "$lib/stores/sitemap";
import * as PIXI from "pixi.js";
import type Graph from "./Graph";

export default class Node extends PIXI.Graphics {
  graph: Graph;
  radius: number;
  entry: TableEntry;

  constructor(graph: Graph, entry: TableEntry) {
    super();

    this.graph = graph;
    this.entry = entry;

    this.x = 0;
    this.y = 0;

    this.interactive = true;
    this.buttonMode = true;

    this.radius = 30;
    this.hitArea = new PIXI.Circle(0, 0, this.radius);

    this.redraw();
  }

  // Redraws the node with its correct color
  redraw() {
    this.clear();

    this.beginFill(this.entry instanceof ParsedPageEntry ? 0x666666 : 0xbbbbbb);

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
