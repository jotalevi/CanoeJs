import { Canoe, Col, FlexAlignContent, FlexAlignItems, FlexJustify, FlexWrap, Row } from "canoejs";
import Logo from "./widgets/Logo";
import TempText from "./widgets/TempText";

// This runs before every render cycle, here you should only add elements to the head of the document, the document itself and window.
Canoe.preBuild(() => {
  // This is how you can measure the time it takes to render the page
  window['timeStart'] = performance.now();

  document.body.style.background = "linear-gradient(to top, rgba(135, 135, 250, 0.05), rgba(25, 25, 180, 0.1))";
});

// Here you can start adding elements to the page, it runs after every render cycle and here you should refer to any member of document or window
Canoe.postBuild(() => {
  // This is how you can measure the time it takes to render the page
  console.log("Execution time: " + (performance.now() - window['timeStart']) + "ms");
})

Canoe.buildApp("root", { url: '/' }, (state) => {
  return new Col({
    flexAlignContent: FlexAlignContent.CENTER,
    flexAlignItems: FlexAlignItems.CENTER,
    flexJustify: FlexJustify.CENTER,
    flexWrap: FlexWrap.NOWRAP,
    children: [
      new Logo({}),
      new TempText({
        id: "title",
        text: "CanoeJS",
        css: {
          fontSize: "20px",
          color: "black",
          marginTop: "20px",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
        }
      }),
      new TempText({
        id: "title",
        text: "A lightweight framework for building web applications",
        css: {
          fontSize: "16px",
          color: "black",
          marginTop: "10px",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
        }
      }),
      new Row({
        flexAlignContent: FlexAlignContent.CENTER,
        flexAlignItems: FlexAlignItems.CENTER,
        flexJustify: FlexJustify.CENTER,
        flexWrap: FlexWrap.NOWRAP,
        children: [
          new TempText({
            id: "l1",
            text: "GitHub",
            css: {
              fontSize: "16px",
              color: "black",
              marginTop: "10px",
              fontFamily: "Arial, sans-serif",
              textAlign: "center",
            }
          }),
          new TempText({
            id: "s1",
            text: "|",
            css: {
              fontSize: "16px",
              color: "black",
              marginTop: "10px",
              fontFamily: "Arial, sans-serif",
              textAlign: "center",
            }
          }),
          new TempText({
            id: "l2",
            text: "Documentation",
            css: {
              fontSize: "16px",
              color: "black",
              marginTop: "10px",
              fontFamily: "Arial, sans-serif",
              textAlign: "center",
            }
          }),
          new TempText({
            id: "s2",
            text: "|",
            css: {
              fontSize: "16px",
              color: "black",
              marginTop: "10px",
              fontFamily: "Arial, sans-serif",
              textAlign: "center",
            }
          }),
          new TempText({
            id: "l3",
            text: "Examples",
            css: {
              fontSize: "16px",
              color: "black",
              marginTop: "10px",
              fontFamily: "Arial, sans-serif",
              textAlign: "center",
            }
          })
        ]
      })
    ]
  })
}).render();