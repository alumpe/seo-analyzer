import { table, tableData, type TableEntry } from "$lib/stores/sitemap";
import { Viewport } from "pixi-viewport";
import * as PIXI from "pixi.js";
import { forceLayout } from "./forceLayout";
import NodeArray from "./NodeArray";

const config = {
  width: 500,
  height: 500,
  backgroundAlpha: 0,
  backgroundColor: 0xffff00,
};

export default class Graph {
  node: HTMLElement;
  data: TableEntry[];
  app: PIXI.Application;
  viewport: Viewport;
  width: number;
  height: number;
  nodeLayer: PIXI.Container;

  nodes: NodeArray = new NodeArray(this);

  constructor(node: HTMLElement, data: TableEntry[], devicePixelRatio: number) {
    this.node = node;
    this.data = data;

    this.width = 500;
    this.height = 500;

    this.app = new PIXI.Application({
      width: config.width,
      height: config.height,
      resolution: devicePixelRatio || 1,
      backgroundAlpha: config.backgroundAlpha,
      backgroundColor: config.backgroundColor,
      resizeTo: this.node,
      antialias: true,
      autoStart: true,
    });

    this.node.appendChild(this.app.view);

    this.viewport = new Viewport({
      screenWidth: this.width,
      screenHeight: this.height,
      worldWidth: this.width,
      worldHeight: this.height,
      interaction: this.app.renderer.plugins.interaction,
    });

    this.app.renderer.plugins.interaction.autoPreventDefault = true;

    this.app.stage.addChild(this.viewport);

    this.viewport.drag().pinch().wheel();

    // prevent body scrolling
    this.app.view.addEventListener("wheel", (event) => {
      event.preventDefault();
    });

    // prevent browser context menu on canvas
    this.app.view.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });

    this.nodeLayer = new PIXI.Container();
    this.viewport.addChild(this.nodeLayer);

    this.updateData(data);

    tableData.subscribe((data) => {
      this.updateData(Array.from(data.values()));
    });
  }

  // updates GraphData, FilterState, mode etc... and usually results in a rerender of the graph
  updateData(data: TableEntry[]) {
    // 5.
    this.nodes.clearAllNodes();
    this.nodes = new NodeArray(this);
    this.nodes.initNodesFromData(data);

    forceLayout(this);
  }

  // Updates dimensions of the view
  updateDimensions() {
    this.width = this.node.clientWidth;
    this.height = this.node.clientHeight;
    this.app.resize();
    this.viewport.resize(this.width, this.height, this.width, this.height);
  }
}
