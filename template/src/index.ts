import { Alert, Canoe, Col, DefaultStyles, FlexAlignContent, FlexAlignItems, FlexJustify, FlexWrap, H, Link, Row } from "canoejs";
import Logo from "./widgets/Logo";

// This runs before every render cycle, here you should only add elements to the head of the document, the document itself and window.
Canoe.preBuild(() => {
  // This is how you can measure the time it takes to render the page
  window['timeStart'] = performance.now();

  document.body.style.height = "100%";
  document.body.style.width = "100%";
  document.body.style.margin = "0";
  document.body.style.padding = "0";
});

// Here you can start adding elements to the page, it runs after every render cycle and here you should refer to any member of document or window
Canoe.postBuild(() => {
  // This is how you can measure the time it takes to render the page
  console.log("Execution time: " + (performance.now() - window['timeStart']) + "ms");
})

Canoe.buildApp("root", { url: '/' }, (state) => {
  return new Col({
    css: {
      width: "100%",
      height: "100%",
      background: "linear-gradient(to top, rgba(135, 135, 250, 0.05), rgba(25, 25, 180, 0.1))",
    },
    flexAlignContent: FlexAlignContent.CENTER,
    flexAlignItems: FlexAlignItems.CENTER,
    flexJustify: FlexJustify.CENTER,
    flexWrap: FlexWrap.NOWRAP,
    children: [
      new Logo({}),
      new H({
        size: 1,
        text: "CanoeJS",
      }),
      new H({
        size: 3,
        text: "A lightweight framework for building web applications",
      }),
      new Row({
        flexAlignContent: FlexAlignContent.CENTER,
        flexAlignItems: FlexAlignItems.CENTER,
        flexJustify: FlexJustify.CENTER,
        flexWrap: FlexWrap.NOWRAP,
        children: [
          new Link({
            text: "GitHub",
            to: "https://github.com/jotalevi/CanoeJs",
          }),
          new H({
            size: 5,
            text: "|",
          }),
          new Link({
            text: "Documentation",
            to: "/docs",
          }),
          new H({
            size: 5,
            text: "|",
          }),
          new Link({
            text: "Examples",
            to: "/Examples",
          }),
        ]
      }),
      new Alert({
        text: "This version is deprecated, please use the latest version of CanoeJS.",
        style: DefaultStyles.WARNING,
        isClosable: true,
      })
    ]
  })
}).render();