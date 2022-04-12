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

import { fsmReducer } from "./Reducers";

// The Tests will "codify" the FSM diagram
// of the app. So I can implement it on the Reducers.ts file.

// Note that I am explicitly testing for the cases where invalid states or actions
// are passed as input. The FSM should handle those without any error.

describe("Search State Transitions", () => {
  const initialState: Search = {
    type: "Search",
    pkmId: null,
    mapId: null,
    sectionId: null,
  };

  it("action 'ClickPkm' should transition to PkmInfoScreen with pkmId", () => {
    const expectedState: PkmInfoScreen = {
      type: "PkmInfoScreen",
      pkmId: 1,
      mapId: null,
      sectionId: null,
    };
    const action: Action = {
      type: "ClickPkm",
      pkmId: 1,
    };

    expect(fsmReducer(action, initialState)).toEqual(expectedState);
  });
  it("action 'ClickMap' should transition to MapScreen with mapId", () => {
    const expectedState: MapScreen = {
      type: "MapScreen",
      pkmId: null,
      mapId: 1,
      sectionId: null,
    };
    const action: ClickMap = {
      type: "ClickMap",
      mapId: 1,
    };
    expect(fsmReducer(action, initialState)).toEqual(initialState);
  });
  it("should do nothing when given an invalid action", () => {
    const invalidAction = {
      type: "IamInvalid",
      pkmId: "nope",
      nonExistentId: 5,
    };
    // This test will run in JavaScript. But TypeScript will complain,
    // which is exatly what I want. I shouldn't be able to run this in the app
    expect(fsmReducer(invalidAction, initialState)).toEqual(initialState);
  });
});

describe("MapScreen State Transitions", () => {
  const initialState: MapScreen = {
    type: "MapScreen",
    mapId: 1,
    pkmId: null,
    sectionId: null,
  };
  it("action 'ClickSearch' should transition to MapToSearch", () => {
    // The reducer must preserve mapId here
    const expectedState: MapToSearch = {
      type: "MapToSearch",
      mapId: 1,
      pkmId: null,
      sectionId: null,
    };
    const action: ClickSearch = {
      type: "ClickSearch",
    };
    expect(fsmReducer(action, initialState)).toEqual(expectedState);
  });
  it("action 'ClickSection' should transition to MapSectionScreen with mapId and sectionId", () => {
    // The reducer must preserve mapId (?)
    const expectedState: MapSectionScreen = {
      type: "MapSectionScreen",
      mapId: 1,
      sectionId: 1,
      pkmId: null,
    };
    const action: ClickSection = {
      type: "ClickSection",
      sectionId: 1,
      mapId: 1,
    };
    expect(fsmReducer(action, initialState)).toEqual(expectedState);
  });
  it("should do nothing when given an invalid action", () => {
    const invalidAction = {
      type: "IamInvalid",
      pkmId: "nope",
      nonExistentId: 5,
    };
    // This test will run in JavaScript. But TypeScript will complain,
    // which is exatly what I want. I shouldn't be able to run this in the app
    expect(fsmReducer(invalidAction, initialState)).toEqual(initialState);
  });
});

describe("MapToSearch State Transitions", () => {
  const initialState: MapToSearch = {
    type: "MapToSearch",
    mapId: 1,
    pkmId: null,
    sectionId: null,
  };
  it("action 'InputSearch' should transition to Search", () => {
    const expectedState: Search = {
      type: "Search",
      mapId: null, // the reducer should clear this field
      pkmId: null,
      sectionId: null,
    };
    const action: InputSearch = {
      type: "InputSearch",
    };
    expect(fsmReducer(action, initialState)).toEqual(expectedState);
  });
  it("action 'ClickMap' should transition to MapScreen with mapId", () => {
    const expectedState: MapScreen = {
      type: "MapScreen",
      mapId: 1,
      pkmId: null,
      sectionId: null,
    };
    const action: ClickMap = {
      type: "ClickMap",
      mapId: 1,
    };
    expect(fsmReducer(action, initialState)).toEqual(expectedState);
  });
  it("should do nothing when given an invalid action", () => {
    const invalidAction = {
      type: "IamInvalid",
      pkmId: "nope",
      nonExistentId: 5,
    };
    // This test will run in JavaScript. But TypeScript will complain,
    // which is exatly what I want. I shouldn't be able to run this in the app
    expect(fsmReducer(invalidAction, initialState)).toEqual(initialState);
  });
});

describe("PkmInfoScreen State Transitions", () => {
  const initialState: PkmInfoScreen = {
    type: "PkmInfoScreen",
    mapId: null,
    sectionId: null,
    pkmId: 1,
  };
  it("action 'ClickSearch' should transition to PkmInfoToSearch", () => {
    const expectedState: PkmInfoToSearch = {
      type: "PkmInfoToSearch",
      pkmId: null,
      mapId: null,
      sectionId: null,
    };
    const action: ClickSearch = {
      type: "ClickSearch",
    };

    expect(fsmReducer(action, initialState)).toEqual(initialState);
  });
  it("action 'ClickMap' should transition to MapScreen with mapId ", () => {
    const expectedState: MapScreen = {
      type: "MapScreen",
      pkmId: null,
      mapId: 1,
      sectionId: null,
    };

    const action: ClickMap = {
      type: "ClickMap",
      mapId: 1,
    };

    expect(fsmReducer(action, initialState)).toEqual(initialState);
  });
  it("action 'ClickSection' should transition to MapSectionScreen with mapId and sectionId", () => {
    const expectedState: MapSectionScreen = {
      type: "MapSectionScreen",
      pkmId: null,
      mapId: 1,
      sectionId: 1,
    };
    const action: ClickSection = {
      type: "ClickSection",
      sectionId: 1,
      mapId: 1,
    };
    expect(fsmReducer(action, initialState)).toEqual(initialState);
  });
  it("should do nothing when given an invalid action", () => {
    const invalidAction = {
      type: "IamInvalid",
      pkmId: "nope",
      nonExistentId: 5,
    };
    // This test will run in JavaScript. But TypeScript will complain,
    // which is exatly what I want. I shouldn't be able to run this in the app
    expect(fsmReducer(invalidAction, initialState)).toEqual(initialState);
  });
});

describe("PkmInfoToSearch State Transitions", () => {
  const initialState: PkmInfoToSearch = {
    type: "PkmInfoToSearch",
    pkmId: 1,
    mapId: null,
    sectionId: null,
  };
  it("action 'InputSearch' should transition to Search", () => {
    const expectedState: Search = {
      type: "Search",
      pkmId: null,
      mapId: null,
      sectionId: null,
    };
    const action: InputSearch = {
      type: "InputSearch",
    };

    expect(fsmReducer(action, initialState)).toEqual(initialState);
  });
  it("action 'ClickPkm' should transitio to PkmInfoScreen with pkmId", () => {
    const expectedState: PkmInfoScreen = {
      type: "Search",
      pkmId: null,
      mapId: null,
      sectionId: null,
    };

    const action: ClickPkm = {
      type: "ClickPkm",
      pkmId: 1,
    };
    expect(fsmReducer(action, initialState)).toEqual(initialState);
  });
  it("action 'ClickMap' should transition to MapScreen with mapId", () => {
    const expectedState: MapScreen = {
      type: "Search",
      pkmId: null,
      mapId: 1,
      sectionId: null,
    };
    const action: ClickMap = {
      type: "ClickMap",
      mapId: 1,
    };

    expect(fsmReducer(action, initialState)).toEqual(initialState);
  });
  it("action 'ClickSection' should transition to MapSectionScreen with mapId and sectionId", () => {
    const expectedState: MapSectionScreen = {
      type: "MapSectionScreen",
      pkmId: null,
      mapId: 1,
      sectionId: 1,
    };
    const action: ClickSection = {
      type: "ClickSection",
      mapId: 1,
      sectionId: 1,
    };

    expect(fsmReducer(action, initialState)).toEqual(initialState);
  });
  it("should do nothing when given an invalid action", () => {
    const invalidAction = {
      type: "IamInvalid",
      pkmId: "nope",
      nonExistentId: 5,
    };
    // This test will run in JavaScript. But TypeScript will complain,
    // which is exatly what I want. I shouldn't be able to run this in the app
    expect(fsmReducer(invalidAction, initialState)).toEqual(initialState);
  });
});

describe("MapSectionScreen State Transitions", () => {
  const initialState: MapSectionScreen = {
    type: "MapSectionScreen",
    mapId: 1,
    sectionId: 1,
    pkmId: null,
  };
  it("action 'ClickSection' should transition to MapSectionScreen with mapId and sectionId", () => {
    const expectedState: MapSectionScreen = {
      type: "MapSectionScreen",
      mapId: 2,
      sectionId: 2,
      pkmId: null,
    };

    const action: ClickSection = {
      type: "ClickSection",
      mapId: 2,
      sectionId: 2,
    };
    expect(fsmReducer(action, initialState)).toEqual(initialState);
  });
  it("action 'ClickPkm' should transition to PkmInfoScreen with pkmId", () => {
    const expectedState: PkmInfoScreen = {
      type: "PkmInfoScreen",
      pkmId: 1,
      mapId: null,
      sectionId: null,
    };
    const action: ClickPkm = {
      type: "ClickPkm",
      pkmId: 1,
    };

    expect(fsmReducer(action, initialState)).toEqual(initialState);
  });
  it("action 'ClickSearch' should transition to MapToSearch", () => {
    const expectedState: MapToSearch = {
      type: "MapToSearch",
      pkmId: null,
      mapId: 1,
      sectionId: 1,
    };
    const action: ClickSearch = {
      type: "ClickSearch",
    };

    expect(fsmReducer(action, initialState)).toEqual(initialState);
  });

  it("should do nothing when given an invalid action", () => {
    const invalidAction = {
      type: "IamInvalid",
      pkmId: "nope",
      nonExistentId: 5,
    };

    expect(fsmReducer(invalidAction, initialState)).toEqual(initialState);
  });
});

describe("Invalid States", () => {
  it("the reducer should throw a TypeError when an invalid state is passed", () => {
    const initialState: Search = {
      type: "Search",
      pkmId: 1,
      mapId: 1,
      sectionId: 1,
    };
    const invalidState = { type: "IAmInvalid" };
    const action: ClickPkm = {
      type: "ClickPkm",
      pkmId: 1,
    };
    // To check for throwing errors, you need to wrap fsmReducer in a function
    expect(() => {
      fsmReducer(action, invalidState);
    }).toThrowError();
  });
});

export {}; // This is just so typescript doesn't complain
