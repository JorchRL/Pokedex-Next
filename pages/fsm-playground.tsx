import type { NextPage } from "next"
import { useEffect, useState } from "react"
import Graph from "react-graph-vis"
import { fsmReducer } from "../modules/pokeFSM/Reducers";
import type { State } from "../modules/pokeFSM/States";
import type { Action, ClickPkm } from "../modules/pokeFSM/Actions";



const Page: NextPage = () => {
  return (
    <div>
    <FsmPlayground />
    <FSMGraph />
    </div>
  )
}

const FsmPlayground = () => {

  const [fsmState, setFsmState] = useState<State>({
    type: "Search",
    pkmId: null,
    mapId: null,
    sectionId: null,
  })

  const dispatchClickPkm = () => {
    const action: ClickPkm = {type: "ClickPkm", pkmId:1}
    setFsmState(fsmReducer(action, fsmState))
  }


  return <div>
  <h1>FSM Visualization</h1>
  <h2>Current state: {fsmState.type}</h2>
  <button onClick={dispatchClickPkm}>dispatch "ClickPkm"</button>
  </div>
}

const FSMGraph = () => {
  const graph = {
    nodes: [
      { id: 1, label: "1 Search", title: "node 1 tootip text" },
      { id: 2, label: "2 MapToSearch", title: "node 2 tootip text" },
      { id: 3, label: "3 MapScreen", title: "node 3 tootip text" },
      { id: 4, label: "4 PkmInfoScreen", title: "node 4 tootip text" },
      { id: 5, label: "5 PkmInfoToSearch", title: "node 5 tootip text" },
      { id: 6, label: "6 MapSectionScreen", title: ""},
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
      { from: 6, to: 2 }
    ]
  }

  const options = {
    layout: {
      hierarchical:false
    },
    edges: {
      
      color: "#000000",
      "selfReference": {
        "angle": 0.7853981633974483
      },
      "smooth": {
        "forceDirection": "none"
      },
    },
    height : "800px",
    physics: {
      "minVelocity":0.04,
      "timestep":0.5,
      "solver":"repulsion",
      "repulsion" : {
        "nodeDistance": 150,
        springLength:230,
        springConstant:0.02,
        damping: 0.6
      }
    }
  }

  const events = {
    select: function(event) {
      console.log("hey")
    }
  };

  const [live, setLive] = useState(false)
  useEffect(() => {
    // react-graph-viz doesn't work well with 
    // next's SSR. So we opt out of SSR
    setLive(true)
  }, [])

  return (
    <div>
    {live && <Graph graph={graph} options={options} events={events} /> }
    </div>)
}

export default Page