type TaggedAction<A extends string> = { type: A };

// Actions
export type InputSearch = TaggedAction<"InputSearch">;
export type ClickPkm = TaggedAction<"ClickPkm"> & { pkmId: number };
export type ClickMap = TaggedAction<"ClickMap"> & { mapId: number };
export type ClickSearch = TaggedAction<"ClickSearch">;
export type ClickSection = TaggedAction<"ClickSection"> & {
  mapId: number;
  sectionId: number;
};

// Action type
export type Action =
  | InputSearch
  | ClickPkm
  | ClickMap
  | ClickSearch
  | ClickSection;
