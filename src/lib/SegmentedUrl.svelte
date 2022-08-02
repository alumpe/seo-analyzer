<script lang="ts">
import { highlightedRows, type TableEntry } from "$lib/stores/sitemap";
import { onDestroy } from "svelte";
import { ParsedPageEntry } from "./stores/PageEntry";
import { fetchMetaData } from "./stores/parsedResult";

export let entry: TableEntry;

let isHighlighted: boolean = false;
$: isParsedEntry = entry instanceof ParsedPageEntry;
const unsubsribe = highlightedRows.subscribe((rows) => {
  isHighlighted = rows.includes(entry.uniqueKey);
});

onDestroy(unsubsribe);
</script>

<div class="container" class:highlighted={isHighlighted}>
  <a href={entry.href} target="_blank" class="external-link">🌍</a>
  <button
    class="path"
    on:click={() => fetchMetaData(entry.href)}
    class:deemphasized={!isParsedEntry}
  >
    {#if entry.pathAsArray.length === 0}
      <span class="segment">🏠</span>
    {:else}
      {#each entry.pathAsArray as segment}
        <span class="slash">/</span><span class="segment">{segment}</span>
      {/each}
    {/if}
  </button>
</div>

<style lang="scss">
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-block: 0.1rem;

  /* &.highlighted {
    background-color: rgb(190, 207, 255);
  } */
}

button.path {
  background: none;
  border: none;
  cursor: pointer;
  &.deemphasized {
    opacity: 0.5;
  }
}

.external-link {
  text-decoration: none;
}
.slash {
  margin-inline: 0.2em;
}

.segment {
  --segment-color: rgb(184, 184, 184);
  padding: 0.1em 0.5em;
  background-color: var(--segment-color);
  border-radius: 100vmax;
}
</style>
