import { Canoe, Router } from "canoejs";
import HomePage from "./pages/HomePage";
import DocsPage from "./pages/DocsPage";

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