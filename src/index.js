import React from "react";
import { render } from "react-dom";

import timelineItems from "./timelineItems";
import Timeline from "./timeline";

const App = () => (
  <div>
    <Timeline items={timelineItems} />
  </div>
);

render(<App />, document.getElementById("root"));
