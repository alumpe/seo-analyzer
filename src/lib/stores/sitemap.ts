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
import { PageEntry, ParsedPageEntry } from "./PageEntry";

export const addPageEntry = (result: ParseResult) => {
  const { parsedUrl, internalLinks, metaTags, siteTitle } = result;

  tableData.update((data) => {
    const parsedUrlEntry = new ParsedPageEntry(parsedUrl, internalLinks, metaTags, siteTitle);
    data.set(parsedUrlEntry.uniqueKey, parsedUrlEntry);

    internalLinks.forEach((link) => {
      const pe = new PageEntry(link);
      if (!data.has(pe.uniqueKey)) data.set(pe.uniqueKey, pe);
    });

    return data;
  });
};

export type TableEntry = ParsedPageEntry | PageEntry;
const columnHelper = createColumnHelper<TableEntry>();

const defaultColumns = [
  columnHelper.accessor(
    (entry) => ({
      entry,
    }),
    {
      cell: (info) => renderComponent(SegmentedUrl, { ...info.getValue() }),
      header: "URL",
    }
  ),
];

export const hoveredRowKey = writable<TableEntry["uniqueKey"] | undefined>();

const tableData = writable(new Map<TableEntry["uniqueKey"], TableEntry>());

export const highlightedRows = derived([hoveredRowKey, tableData], ([key, tableData]) => {
  if (!key) return [];
  const hoveredRowEntry = tableData.get(key);
  if (!(hoveredRowEntry instanceof ParsedPageEntry)) return [];
  return hoveredRowEntry.internalLinks.map((link) => link.uniqueKey);
});

const tableOptions = writable<Omit<TableOptions<TableEntry>, "data">>({
  columns: defaultColumns,
  getCoreRowModel: getCoreRowModel(),
});

const combinedOptions = derived([tableData, tableOptions], ([tableData, tableOptions]) => ({
  ...tableOptions,
  data: Array.from(tableData.values()).sort(PageEntry.comparePageEntries),
}));

export const table = createSvelteTable(combinedOptions);
