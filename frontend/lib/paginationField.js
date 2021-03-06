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
      // If
      // There are items
      // AND there arent enough items to satisfy how many were requested
      // AND we are on the last page
      // THEN JUST SEND IT

      if (items.length && items.length !== first && page === pages) {
        return items;
      }

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
      // We can do either one of two things
      // First thing we can do is return the items because they are already in the cache
      // The other thing we can do is return false from here, (network request)
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // This runs when the apollo client comes back from the network with our product
      console.log(`Merging items from the network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; i++) {
        merged[i] = incoming[i - skip];
      }
      console.log(merged);
      // Finally return the merged items from the cache
      return merged;
    },
  };
}
