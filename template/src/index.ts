import { Canoe, Router } from "canoejs";
import HomePage from "./pages/HomePage";
import DocsPage from "./pages/DocsPage";

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
  console.log("State: ", state);
  return new Router({
    routes: [
      {
        route: '/',
        widget: new HomePage({})
      },
      {
        route: '/docs',
        widget: new DocsPage()
      }
    ],
    currentRoute: state.url ?? '/',
  });
}).render();