import { Canoe, Col, H, Row, Link, FlexAlignContent, FlexAlignItems, FlexJustify } from "canoejs";
import Logo from "./widgets/Logo";

Canoe.onLoad(() => {
  // Here you can add custom CSS or js event listeners to the page, it runs once and here you should only refer to document, document.head and window
  document.head.innerHTML += ".gaze-container{position:relative;height:100%;background:#111}.gaze-container:hover .gaze{opacity:1}.gaze{--size:250px;position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;background:radial-gradient(circle var(--size) at var(--x,50%) var(--y,50%),rgba(100,200,255,.15),transparent 60%);opacity:0;transition:opacity .3s}"
  document.addEventListener('mousemove', (e) => {
    const gaze = document.querySelector('.gaze') as HTMLElement;
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    gaze.style.setProperty('--x', `${x}%`);
    gaze.style.setProperty('--y', `${y}%`);
  });
});

Canoe.preBuild(() => {
  // This runs before every render cycle, here you should only add elements to the head of the document, the document itself and window.

  // This is how you can measure the time it takes to render the page
  window['timeStart'] = performance.now();

  document.head.innerHTML += "<link href='https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap' rel='stylesheet'>"
});

Canoe.postBuild(() => {
  // Here you can start adding elements to the page, it runs after every render cycle and here you should refer to any member of document or window
  document.body.classList.add('gaze-container');
  document.body.innerHTML += "<div class='gaze'></div>"

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