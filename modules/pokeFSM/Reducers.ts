// We need to import the types and typeguards
import {
  Action,
  InputSearch,
  ClickPkm,
  ClickMap,
  ClickSearch,
  ClickSection,
} from "./Actions";
import * as Actions from "./Actions";

import {
  State,
  Search,
  MapToSearch,
  MapScreen,
  PkmInfoScreen,
  PkmInfoToSearch,
  MapSectionScreen,
} from "./States";
import * as States from "./States";

// Reducers are transition functions for the finite automata
type Reducer = (a: Action, s: State) => State;

export const reducer: Reducer = (action, currentState) => {
  switch (currentState.type) {
    // First, filter by state. So you cannot send actions to an invalid state.
    // But note that this is a pure function. So currentState is extenal.
    case "Search":
      return reduceSearch(action, currentState);
    case "MapToSearch":
      return reduceMapToSearch(action, currentState);
    case "MapScreen":
      return reduceMapScreen(action, currentState);
    case "PkmInfoScreen":
      return reducePkmInfoScreen(action, currentState);
    case "PkmInfoToSearch":
      return reducePkmInfoScreen(action, currentState);
    case "MapSectionScreen":
      return reduceMapSectionScreen(action, currentState);
    default:
      return currentState;
  }
};

// Each reducer handles the valid actions per state. So you cannot send an
// invalid action, ever. These are also pure functions.
export const reduceSearch: Reducer = (action, state) => {
  // Filter by action type
  switch (action.type) {
    case "ClickMap":
      // The action carries info about the map
      return <MapScreen>{ mapId: action.mapId };
    case "ClickPkm":
      // The action carries info about the pokemon
      return <PkmInfoScreen>{ pkmId: action.pkmId };
    default:
      return state;
  }
};
export const reduceMapToSearch: Reducer = (action, state) => {
  switch (action.type) {
    case "InputSearch":
      return <Search>{};
    case "ClickMap":
      return <MapScreen>{};
    default:
      return state;
  }
};
export const reduceMapScreen: Reducer = (action, state) => {
  switch (action.type) {
    case "ClickSection":
      return <MapSectionScreen>{
        mapId: action.mapId,
        sectionId: action.sectionId,
      };
    case "ClickSearch":
      return <Search>{};
    default:
      return state;
  }
};
export const reducePkmInfoScreen: Reducer = (action, state) => {
  switch (action.type) {
    case "ClickSearch":
    default:
      return state;
  }
};
export const reducePkmInfoToSearch: Reducer = (action, state) => {
  switch (action.type) {
    case "InputSearch":
      return <Search>{};
    case "ClickPkm":
      return <PkmInfoScreen>{ pkmId: action.pkmId };
    default:
      return state;
  }
};
export const reduceMapSectionScreen: Reducer = (action, state) => {
  switch (action.type) {
    case "ClickPkm":
      return <PkmInfoScreen>{ pkmId: action.pkmId };
    case "ClickSearch":
      return <MapToSearch>{};
    default:
      return state;
  }
};
