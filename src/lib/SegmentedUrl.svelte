<script lang="ts">
import { fetchMetaData } from "./stores/parsedResult";

// export let hostname: string;
export let pathAsArray: string[];
export let url: string;
</script>

<div class="container">
  <a href={url} target="_blank" class="external-link">🌍</a>
  {#each pathAsArray as segment}
    <span class="slash">/</span><span class="segment">{segment}</span>
  {/each}
  <button on:click={() => fetchMetaData(url)}>Fetch</button>
</div>

<style lang="scss">
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
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
