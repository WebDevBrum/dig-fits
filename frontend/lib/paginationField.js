import { PAGINATION_QUERY } from "../components/Pagination";

export default function paginationField() {
  return {
    keyargs: false, // tells apollo that we will take care of everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      // Read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      console.log(data);
      // First is ask the read function for those items
    },
    merge() {},
  };
}
