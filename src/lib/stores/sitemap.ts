import SegmentedUrl from "$lib/SegmentedUrl.svelte";
import type { ParseResult } from "$routes/api/parse-url/_metadataScraper/types";
import {
  createColumnHelper,
  createSvelteTable,
  getCoreRowModel,
  renderComponent,
  type TableOptions,
} from "@tanstack/svelte-table";
import { derived, writable } from "svelte/store";
import { PageEntry } from "./PageEntry";

export const addPageEntry = (result: ParseResult) => {
  const { parsedUrl, internalLinks } = result;

  tableData.update((data) => {
    const url = new PageEntry(parsedUrl);
    data.set(url.uniqueKey, url);

    internalLinks.forEach((link) => {
      const pe = new PageEntry(`${url.protocol}//${url.hostname}${link}`);
      data.set(pe.uniqueKey, pe);
    });

    return data;
  });
};

const columnHelper = createColumnHelper<PageEntry>();

const defaultColumns = [
  columnHelper.accessor(
    (entry) => ({
      hostname: entry.hostname,
      pathAsArray: entry.pathAsArray,
      url: entry.toString(),
    }),
    {
      cell: (info) => renderComponent(SegmentedUrl, { ...info.getValue() }),
      header: "URL",
    }
  ),
];

const tableData = writable(new Map<PageEntry["uniqueKey"], PageEntry>());

const tableOptions = writable<Omit<TableOptions<PageEntry>, "data">>({
  columns: defaultColumns,
  getCoreRowModel: getCoreRowModel(),
});

const combinedOptions = derived([tableData, tableOptions], ([tableData, tableOptions]) => ({
  ...tableOptions,
  data: Array.from(tableData.values()).sort(PageEntry.comparePageEntries),
}));

export const table = createSvelteTable(combinedOptions);
