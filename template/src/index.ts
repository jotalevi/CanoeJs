import { Canoe, Router } from "canoejs";
import HomePage from "./pages/homePage";
import DocsPage from "./pages/docsPage";


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

// Register the routes
// The first argument is the path, the second is the component to render and the third is the name of the route (To be displayed in the address bar)
// TODO: Add the hability to have custom route names
Router.addRoute("/", HomePage, "CanoeJS - Home Page");
Router.addRoute("/docs", DocsPage, "CanoeJS - Documentation");

Canoe.buildApp("root", { url: window.location.pathname, showAlert: true }, Router.render).render();