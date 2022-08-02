<script lang="ts">
import PageTable from "$lib/PageTable.svelte";
import FacebookCard from "$lib/snippets/FacebookCard.svelte";
import GoogleSnippet from "$lib/snippets/GoogleSnippet.svelte";
import { fetchMetaData } from "$lib/stores/parsedResult";
import { unparsedPageEntries } from "$lib/stores/sitemap";

let inputValue: string = "https://nodejs.org";

const handleFetchSingle = async () => {
  const urlAfterRedirect = await fetchMetaData(inputValue);
  inputValue = urlAfterRedirect;
};

const handleFetchAll = async () => {
  $unparsedPageEntries.forEach(async (entry) => {
    await fetchMetaData(entry.href);
  });
};
</script>

<div class="layout">
  <div class="table-container">
    <div class="search-bar">
      <input
        type="text"
        bind:value={inputValue}
        on:keydown={(e) => e.key === "Enter" && handleFetchSingle()}
      />
      <button on:click={handleFetchSingle}>Fetch website</button>
    </div>
    <button on:click={handleFetchAll}>Fetch all unparsed entries</button>

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
