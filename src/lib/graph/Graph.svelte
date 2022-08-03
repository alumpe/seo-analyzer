<script lang="ts">
import { onMount } from "svelte";
import type Graph from "./Graph";

let div: HTMLDivElement;
let graphy: Graph;

onMount(async () => {
  const Graph = (await import("$lib/graph/Graph")).default;
  graphy = new Graph(div, [], window.devicePixelRatio);
  graphy.updateDimensions();
});
</script>

<svelte:window on:resize={() => graphy.updateDimensions()} />

<div class="node" bind:this={div} />

<style lang="scss">
.node {
  width: 100%;
  height: 500px;
}
</style>
