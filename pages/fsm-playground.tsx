import type { NextPage } from "next";
import { fsmReducer } from "../modules/pokeFSM/Reducers";
import type { Reducer } from "../modules/pokeFSM/Reducers";
import type { State } from "../modules/pokeFSM/States";
import type { Action, ClickPkm } from "../modules/pokeFSM/Actions";
import FSMGraph from "../components/FSMGraph";

import create from "zustand";

type FSMStore = State & {
  // syntax from Zustand's documentation
  dispatch: (a: Action) => void;
};
type FsmTypes =
  | "Search"
  | "MapToSearch"
  | "MapScreen"
  | "PkmInfoScreen"
  | "PkmInfoToSearch"
  | "MapSectionScreen";

type ActionTypes =
  | "InputSearch"
  | "ClickPkm"
  | "ClickMap"
  | "ClickSearch"
  | "ClickSection";

const useStore = create<FSMStore>((set) => ({
  type: "Search",
  pkmId: null,
  mapId: null,
  sectionId: null,
  dispatch: (action: Action) => set((state) => fsmReducer(action, state)),
}));

const Page: NextPage = () => {
  const fsm = useStore((state) => state.type);
  const dispatch = useStore((state) => state.dispatch);

  return (
    <div className="container sm:flex flex-col h-screen">
      <FsmPlayground state={fsm} dispatch={dispatch} />
      <FSMGraph />
    </div>
  );
};

type playgroudProps = {
  state: FsmTypes;
  dispatch: (a: Action) => void;
};
const FsmPlayground = ({ state, dispatch }: playgroudProps) => {
  // We will need an action creator...

  const createAction = (
    type: ActionTypes,
    pkmId: number = 1,
    mapId: number = 1,
    sectionId: number = 1
  ) => {
    return { type: type, pkmId, mapId, sectionId };
  };

  return (
    <div className="container my-3">
      <div className="container md:flex md:items-end justify-start md:mb-6">
        <h1 className="font-bold text-4xl mr-7">PokeDex FSM Visualization</h1>
        <h2 className="text-xl">Current state: {state}</h2>
      </div>
      <h2>Dispatch an action: </h2>
      <ul className="flex flex-row flex-wrap justify-center sm:justify-center">
        <li className="btn">
          <button onClick={() => dispatch(createAction("InputSearch"))}>
            "Input Search"
          </button>
        </li>
        <li className="btn">
          <button onClick={() => dispatch(createAction("ClickPkm"))}>
            "ClickPkm"
          </button>
        </li>
        <li className="btn">
          <button onClick={() => dispatch(createAction("ClickMap"))}>
            "ClickMap"
          </button>
        </li>
        <li className="btn">
          <button onClick={() => dispatch(createAction("ClickSearch"))}>
            "ClickSearch"
          </button>
        </li>
        <li className="btn">
          <button onClick={() => dispatch(createAction("ClickSection"))}>
            "ClickSection"
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Page;
