import { useMemo } from "react";
import Fuse from "fuse.js";
import { UserVariable } from "../../../digitalTwinApi";

const useVariablesSearch = (variables: UserVariable[], searchText: string): UserVariable[] => {
  const fuse = useMemo(
    () =>
      new Fuse(variables, {
        keys: ['name', 'description', 'synonyms'],
        // https://fusejs.io/api/options.html#threshold
        // Very naive explanation: threshold represents how accurate the search results should be. The default is 0.6
        // I tested it and found it to make the search results more accurate when the threshold is 0.2
        // 0 - 1, where 0 is the exact match and 1 matches anything
        threshold: 0.2,
        findAllMatches: true,
      }),
    [variables],
  )

  return useMemo(
    () => (searchText ? fuse.search(searchText).map((result) => {
      return result.item;
    }) : variables),
    [fuse, variables, searchText],
  )
}

export { useVariablesSearch }
