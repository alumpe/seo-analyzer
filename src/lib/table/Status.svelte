<script lang="ts">
export let statusCode: number | undefined;

const getColor = () => {
  if (statusCode === undefined) {
    return "transparent";
  }
  if (statusCode >= 200 && statusCode < 300) {
    return "#00c1005e";
  }
  if (statusCode >= 300 && statusCode < 400) {
    return "#c16d005e";
  }
  if (statusCode >= 400 && statusCode < 500) {
    return "#c100005e";
  }
  return "#bbbbbb";
};
</script>

{#if statusCode !== undefined}
  <span style:--bg-color={getColor()}>{statusCode}</span>
{/if}

<style lang="scss">
span {
  background-color: var(--bg-color);
  padding: 0.1em 0.5em;
  border-radius: 100vmax;
}
</style>
