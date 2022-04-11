import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Graph from "react-graph-vis";
import { fsmReducer } from "../modules/pokeFSM/Reducers";
import type { Reducer } from "../modules/pokeFSM/Reducers";
import type { State } from "../modules/pokeFSM/States";
import type { Action, ClickPkm } from "../modules/pokeFSM/Actions";

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
      <FSMGraph state={fsm} />
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
    mapId = 1,
    sectionId = 1
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

const FSMGraph = ({ state }: playgroudProps) => {
  const graph = {
    nodes: [
      { id: 1, label: "1 Search", title: "node 1 tootip text" },
      { id: 2, label: "2 MapToSearch", title: "node 2 tootip text" },
      { id: 3, label: "3 MapScreen", title: "node 3 tootip text" },
      { id: 4, label: "4 PkmInfoScreen", title: "node 4 tootip text" },
      { id: 5, label: "5 PkmInfoToSearch", title: "node 5 tootip text" },
      { id: 6, label: "6 MapSectionScreen", title: "" },
    ],
    edges: [
      { from: 1, to: 4 },
      { from: 1, to: 3 },
      { from: 2, to: 1 },
      { from: 3, to: 2 },
      { from: 3, to: 6 },
      { from: 4, to: 5 },
      { from: 5, to: 1 },
      { from: 6, to: 4 },
      { from: 6, to: 2 },
    ],
  };

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "#000000",
      selfReference: {
        angle: 0.7853981633974483,
      },
      smooth: {
        forceDirection: "none",
      },
    },
    // height: "800px",
    physics: {
      minVelocity: 0.04,
      timestep: 0.5,
      solver: "repulsion",
      repulsion: {
        nodeDistance: 150,
        springLength: 230,
        springConstant: 0.02,
        damping: 0.6,
      },
    },
  };

  // const events = {
  //   select: function (event) {
  //     console.log("hey");
  //   },
  // };

  const [live, setLive] = useState(false);
  useEffect(() => {
    // react-graph-viz doesn't work well with
    // next's SSR. So we opt out of SSR
    setLive(true);
  }, []);

  return (
    <div className="container mx-auto flex-grow sm:bg-slate-600">
      <h2>Grap</h2>
      {/* {live && <Graph graph={graph} options={options} events={events} />} */}
    </div>
  );
};

export default Page;
