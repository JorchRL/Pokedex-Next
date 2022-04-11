type TaggedState<S extends string> = { type: S } & StateInfo;

type StateInfo = {
  mapId: number | null;
  pkmId: number | null;
  sectionId: number | null;
};

// States
export type Search = TaggedState<"Search">;
export type MapToSearch = TaggedState<"MapToSearch">;
export type MapScreen = TaggedState<"MapScreen">;
export type PkmInfoScreen = TaggedState<"PkmInfoScreen">;
export type PkmInfoToSearch = TaggedState<"PkmInfoToSearch">;
export type MapSectionScreen = TaggedState<"MapSectionScreen">;

// State type
export type State =
  | Search
  | MapToSearch
  | MapScreen
  | PkmInfoScreen
  | PkmInfoToSearch
  | MapSectionScreen;
