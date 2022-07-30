<script lang="ts">
import FacebookCard from "$lib/snippets/FacebookCard.svelte";
import GoogleSnippet from "$lib/snippets/GoogleSnippet.svelte";
import { fetchMetaData } from "$lib/store";

let inputValue: string = "https://nodejs.org";
</script>

<div class="container">
  <input type="text" bind:value={inputValue} />
  <button on:click={() => fetchMetaData(inputValue)}>Fetch website</button>

  <GoogleSnippet />
  <FacebookCard />
</div>

<style lang="scss">
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

input {
  width: 40rem;
  padding: 0.5rem;
}
</style>
