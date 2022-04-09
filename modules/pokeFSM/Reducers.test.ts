import {
  State,
  Search,
  MapToSearch,
  MapScreen,
  PkmInfoScreen,
  PkmInfoToSearch,
  MapSectionScreen,
} from "./States";

import {
  Action,
  InputSearch,
  ClickPkm,
  ClickMap,
  ClickSearch,
  ClickSection,
} from "./Actions";

import { reducer } from "./Reducers";

describe("Search State Transitions", () => {
  it("action 'ClickPkm' should transition to PkmScreen with pkmId", () => {});
  it("action 'ClickMap' should transition to MapScreen with mapId", () => {});
  it("should do nothing when given an invalid action", () => {});
});

describe("MapScreen State Transitions", () => {
  it("action 'ClickSearch' should transition to MapToSearch", () => {});
  it("action 'ClickSection' should transition to MapSection with mapId and sectionId", () => {});
  it("should do nothing when given an invalid action", () => {});
});

describe("MapToSearch State Transitions", () => {
  it("action 'InputSearch' should transition to Search", () => {});
  it("action 'ClickMap' should transition to MapScreen with mapId", () => {});
  it("should do nothing when given an invalid action", () => {});
});

describe("PkmInfoScreen State Transitions", () => {
  it("action 'ClickSearch' should transition to PkmInfoToSearch", () => {});
  it("action 'ClickMap' should transition to MapScreen with mapId ", () => {});
  it("action 'ClickSection' should transition to MapSectionScreen with mapId and sectionId", () => {});
  it("should do nothing when given an invalid action", () => {});
});

describe("PkmInfoToSearch State Transitions", () => {
  it("action 'InputSearch' should transition to Search", () => {});
  it("action 'ClickPkm' should transitio to PkmInfoScreen with pkmId", () => {});
  it("action 'ClickMap' should transition to MapScreen with mapId", () => {});
  it("action '' should transition to MapSectionScreen with mapId and sectionId", () => {});
  it("should do nothing when given an invalid action", () => {});
});

describe("MapSectionScreen State Transitions", () => {
  it("action 'ClickSection' should transition to MapSectionScreen with mapId and sectionId", () => {});
  it("action 'ClickPkm' should transition to PkmInfoScreen with pkmId", () => {});
  it("action 'ClickSearch' should transition to MapToSearch", () => {});
  it("action 'ClickMap' should transition to MapScreen with mapId", () => {});
  it("should do nothing when given an invalid action", () => {});
});

describe("Invalid States", () => {
  it("the reducer should do nothing when an invalid state is passed", () => {
    // const invalidState = { type: "IAmInvalid" };
  });
});

export {}; // This is just so typescript doesn't complain
