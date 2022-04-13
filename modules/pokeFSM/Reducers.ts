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
export type Reducer = (a: Action, s: State) => State;

export const fsmReducer: Reducer = (action, currentState) => {
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
      return reducePkmInfoToSearch(action, currentState);
    case "MapSectionScreen":
      return reduceMapSectionScreen(action, currentState);
    default:
      throw new TypeError("You cannot pass an invalid state!");
  }
};

// Each reducer handles the valid actions per state. So you cannot send an
// invalid action, ever. These are also pure functions.
export const reduceSearch: Reducer = (action, state) => {
  // Filter by action type
  switch (action.type) {
    case "ClickMap":
      // The action carries info about the map
      return { ...state, type: "MapScreen", mapId: action.mapId };
    case "ClickPkm":
      // The action carries info about the pokemon
      return { ...state, type: "PkmInfoScreen", pkmId: action.pkmId };
    default:
      return state;
  }
};
export const reduceMapToSearch: Reducer = (action, state) => {
  switch (action.type) {
    case "InputSearch":
      return {
        ...state,
        type: "Search",
        mapId: null,
        pkmId: null,
        sectionId: null,
      };
    case "ClickMap":
      return { ...state, type: "MapScreen", mapId: action.mapId };
    default:
      return state;
  }
};
export const reduceMapScreen: Reducer = (action, state) => {
  switch (action.type) {
    case "ClickSection":
      return {
        ...state,
        type: "MapSectionScreen",
        mapId: action.mapId,
        sectionId: action.sectionId,
      };
    case "ClickSearch":
      return { ...state, type: "MapToSearch" };
    default:
      return state;
  }
};
export const reducePkmInfoScreen: Reducer = (action, state) => {
  switch (action.type) {
    case "ClickMap":
      return { ...state, type: "MapScreen", mapId: action.mapId, pkmId: null };
    case "ClickSection":
      return {
        ...state,
        type: "MapSectionScreen",
        mapId: action.mapId,
        sectionId: action.sectionId,
        pkmId: null,
      };
    case "ClickSearch":
      return { ...state, type: "PkmInfoToSearch" };
    default:
      return state;
  }
};
export const reducePkmInfoToSearch: Reducer = (action, state) => {
  switch (action.type) {
    case "InputSearch":
      return {
        ...state,
        type: "Search",
        pkmId: null,
        mapId: null,
        sectionId: null,
      };
    case "ClickPkm":
      return {
        ...state,
        type: "PkmInfoScreen",
        pkmId: action.pkmId,
        mapId: null,
        sectionId: null,
      };
    case "ClickMap":
      return { ...state, type: "MapScreen", mapId: action.mapId };
    case "ClickSection":
      return {
        ...state,
        type: "MapSectionScreen",
        sectionId: action.sectionId,
        mapId: action.sectionId,
      };
    default:
      return state;
  }
};
export const reduceMapSectionScreen: Reducer = (action, state) => {
  switch (action.type) {
    case "ClickSection":
      return {
        ...state,
        type: "MapSectionScreen",
        mapId: action.mapId,
        sectionId: action.sectionId,
      };
    case "ClickPkm":
      return {
        ...state,
        type: "PkmInfoScreen",
        pkmId: action.pkmId,
        mapId: null,
        sectionId: null,
      };
    case "ClickSearch":
      return { ...state, type: "MapToSearch" };
    default:
      return state;
  }
};
