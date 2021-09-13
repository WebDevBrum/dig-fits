import { PAGINATION_QUERY } from "../components/Pagination";

export default function paginationField() {
  return {
    keyargs: false, // tells apollo that we will take care of everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      // Read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      if (items.length !== first) {
        // we dont have any items, we must go to the network to fetch them
        return false;
      }

      // if there are items, just return them from the cache, and we dont need to go to the network
      if (items.length) {
        console.log(
          `there are ${items.length} items in the cache! Gonna send them to apollo`
        );
        return items;
      }

      return false; // fallback to network
      // First is ask the read function for those items
    },
    merge(existing, incoming, { args }) {
      // This runs when the apollo client comes back from the network with our product
      console.log(`Merging items from the network ${incoming.length}`);
    },
  };
}
