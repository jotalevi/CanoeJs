import { Canoe, Col, H, Row, Link, FlexAlignContent, FlexAlignItems, FlexJustify } from "canoejs";
import Logo from "./widgets/Logo";

// This runs before every render cycle, here you should only add elements to the head of the document, the document itself and window.
Canoe.preBuild(() => {
  // This is how you can measure the time it takes to render the page
  window['timeStart'] = performance.now();
});

// Here you can start adding elements to the page, it runs after every render cycle and here you should refer to any member of document or window
Canoe.postBuild(() => {
  // This is how you can measure the time it takes to render the page
  console.log("Execution time: " + (performance.now() - window['timeStart']) + "ms");
})

Canoe.buildApp("root", {}, (state) => {
  return new Col({
    alignContent: FlexAlignContent.CENTER,
    justify: FlexJustify.CENTER,
    alignItems: FlexAlignItems.CENTER,
    style: {
      width: "100%",
      height: "100%",
    },
    gap: "0px",
    children: [
      new Logo(),
      new H({
        size: 1,
        text: "CanoeJS",
        style: {
          margin: "0px",
          color: "#000",
          fontSize: "50px",
          textAlign: "center",
        },
      }),
      new H({
        size: 2,
        text: "A JavaScript framework for building web applications",
        style: {
          margin: "0px",
          color: "#000",
          fontSize: "20px",
          textAlign: "center",
        },
      }),
      new Row({
        alignContent: FlexAlignContent.CENTER,
        justify: FlexJustify.CENTER,
        alignItems: FlexAlignItems.CENTER,
        children: [
          new Link({
            to: "https://www.github.com/jotalevi/CanoeJs",
            children: [
              new H({
                size: 3,
                text: "GitHub",
                style: {
                  color: "rgb(148 190 200)",
                  fontSize: "20px",
                  textAlign: "center",
                },
              }),
            ]
          }),
          new H({
            size: 2,
            text: "|",
            style: {
              color: "#000",
              fontSize: "20px",
              textAlign: "center",
            },
          }),
          new Link({
            to: "https://github.com/jotalevi/CanoeJs",
            children: [
              new H({
                size: 3,
                text: "Documentation",
                style: {
                  color: "rgb(148 190 200)",
                  fontSize: "20px",
                  textAlign: "center",
                },
              }),
            ]
          }),
          new H({
            size: 2,
            text: "|",
            style: {
              color: "#000",
              fontSize: "20px",
              textAlign: "center",
            },
          }),
          new Link({
            to: "https://github.com/jotalevi/CanoeJs",
            children: [
              new H({
                size: 3,
                text: "Examples",
                style: {
                  color: "rgb(148 190 200)",
                  fontSize: "20px",
                  textAlign: "center",
                },
              }),
            ]
          }),
        ]
      })
    ]
  });
}).render();