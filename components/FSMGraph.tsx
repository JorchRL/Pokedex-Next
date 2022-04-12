import React, { useEffect, useState } from "react";
import Graph from "react-graph-vis";
import { v4 as uuidv4 } from "uuid";

const FSMGraph = () => {
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
      smooth: true,
    },
    height: "800px",
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

  const events = {
    select: function (event) {
      console.log("hey");
    },
  };

  const [live, setLive] = useState(false);
  useEffect(() => {
    // react-graph-viz doesn't work well with
    // next's SSR. So we opt out of SSR
    setLive(true);
  }, []);

  return (
    <div className="container mx-auto flex-grow">
      <h2>FSM Graph</h2>
      {live && (
        <Graph graph={graph} options={options} events={events} key={uuidv4()} />
      )}
    </div>
  );
};

export default FSMGraph;
