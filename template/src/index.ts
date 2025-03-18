import { Canoe } from "canoejs";
import { H } from "canoejs";

Canoe.buildApp("root", {}, (state) => {
  return new H({
    size: 1,
    text: "CanoeJs App",
    style: {
      fontSize: "50px",
      fontWeight: "900",
      margin: "0px",
      padding: "0px",
      color: "#000000FF",
    },
  })
}).render();