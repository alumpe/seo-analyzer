<script lang="ts">
import PageTable from "$lib/PageTable.svelte";
import FacebookCard from "$lib/snippets/FacebookCard.svelte";
import GoogleSnippet from "$lib/snippets/GoogleSnippet.svelte";
import { fetchMetaData } from "$lib/stores/parsedResult";

let inputValue: string = "https://nodejs.org";
</script>

<div class="layout">
  <div class="table-container">
    <div class="search-bar">
      <input type="text" bind:value={inputValue} />
      <button on:click={() => fetchMetaData(inputValue)}>Fetch website</button>
    </div>

    <PageTable />
  </div>

  <div class="snippet-container">
    <GoogleSnippet />
    <FacebookCard />
  </div>
</div>

<style lang="scss">
.layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
}

.table-container {
  display: flex;
  flex-direction: column;
  height: 80vh;
}

.search-bar {
  display: flex;

  input {
    padding: 0.5rem;
    flex-grow: 1;
  }
}
</style>
