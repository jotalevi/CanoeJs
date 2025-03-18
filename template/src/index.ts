import { Canoe, Col, H, Row, Link, FlexAlignContent, FlexAlignItems, FlexJustify } from "canoejs";
import Logo from "./widgets/Logo";

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
            to: "github.com/jotalevi/canoe",
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
            to: "github.com/jotalevi/canoe",
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
            to: "github.com/jotalevi/canoe",
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