<script lang="ts">
import { table as sitemap } from "$lib/stores/sitemap";
import { flexRender } from "@tanstack/svelte-table";
</script>

<div class="table-container">
  <table>
    <thead>
      {#each $sitemap.getHeaderGroups() as headerGroup}
        <tr>
          {#each headerGroup.headers as header}
            <th>
              <svelte:component
                this={flexRender(header.column.columnDef.header, header.getContext())}
              />
            </th>
          {/each}
        </tr>
      {/each}
    </thead>

    <tbody>
      {#each $sitemap.getRowModel().rows as row}
        <tr>
          {#each row.getVisibleCells() as cell}
            <td>
              <svelte:component this={flexRender(cell.column.columnDef.cell, cell.getContext())} />
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style lang="scss">
.table-container {
  overflow-y: auto;
}
</style>
