import ExternalLink from "$lib/table/ExternalLink.svelte";
import SegmentedUrl from "$lib/table/SegmentedUrl.svelte";
import Status from "$lib/table/Status.svelte";
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
  const { parsedUrl, statusCode, internalLinks, metaTags, siteTitle } = result;

  tableData.update((data) => {
    const parsedUrlEntry = new ParsedPageEntry(
      parsedUrl,
      statusCode,
      internalLinks,
      metaTags,
      siteTitle
    );
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
      url: entry.href,
    }),
    {
      cell: (info) => renderComponent(ExternalLink, { ...info.getValue() }),
      header: undefined,
      id: "web",
      size: 10,
    }
  ),
  columnHelper.accessor(
    (entry) => ({
      statusCode: entry instanceof ParsedPageEntry ? entry.statusCode : undefined,
    }),
    {
      cell: (info) => renderComponent(Status, { ...info.getValue() }),
      header: undefined,
      id: "status",
      size: 10,
    }
  ),
  columnHelper.accessor(
    (entry) => ({
      entry,
    }),
    {
      cell: (info) => renderComponent(SegmentedUrl, { ...info.getValue() }),
      header: "URL",
      size: 9999,
    }
  ),
];

export const hoveredRowKey = writable<TableEntry["uniqueKey"] | undefined>();

export const tableData = writable(new Map<TableEntry["uniqueKey"], TableEntry>());

export const highlightedRows = derived([hoveredRowKey, tableData], ([key, tableData]) => {
  if (!key) return [];
  const hoveredRowEntry = tableData.get(key);
  if (!(hoveredRowEntry instanceof ParsedPageEntry)) return [];
  return hoveredRowEntry.internalLinks.map((link) => link.uniqueKey);
});

export const unparsedPageEntries = derived(tableData, (tableData) => {
  const arr = Array.from(tableData.values());
  return arr.filter((entry) => !(entry instanceof ParsedPageEntry));
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
