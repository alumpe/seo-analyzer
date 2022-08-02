<script lang="ts">
import { fetchMetaData } from "./stores/parsedResult";

// export let hostname: string;
export let pathAsArray: string[];
export let url: string;
</script>

<div class="container">
  <a href={url} target="_blank" class="external-link">🌍</a>
  <button class="path" on:click={() => fetchMetaData(url)}>
    {#each pathAsArray as segment}
      <span class="slash">/</span><span class="segment">{segment}</span>
    {/each}
  </button>
</div>

<style lang="scss">
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-block: 0.1rem;
}

button.path {
  background: none;
  border: none;
  cursor: pointer;
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
