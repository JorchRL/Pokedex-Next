type TaggedState<S extends string> = { type: S };

// States
export type Search = TaggedState<"Search">;
export type MapToSearch = TaggedState<"MapToSearch">;
export type MapScreen = TaggedState<"MapScreen"> & {
  mapId: number;
};
export type PkmInfoScreen = TaggedState<"PkmInfoScreen"> & {
  pkmId: number;
};
export type PkmInfoToSearch = TaggedState<"PkmInfoToSearch">;
export type MapSectionScreen = TaggedState<"MapSectionScreen"> & {
  mapId: number;
  sectionId: number;
};

// State type
export type State =
  | Search
  | MapToSearch
  | MapScreen
  | PkmInfoScreen
  | PkmInfoToSearch
  | MapSectionScreen;
