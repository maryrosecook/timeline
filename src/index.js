import React from "react";
import { render } from "react-dom";

import timelineItems from "./timelineItems";
import Timeline from "./timeline";

render(<Timeline items={timelineItems} />, document.getElementById("root"));
