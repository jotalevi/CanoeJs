import Widget from "./core/Widget";
import Div from "./core/Div";
import H from "./core/H";
import Render from "./core/Render";
import TextInput from "./core/TextInput";

class Canoe {
  private static rootId: string = "";
  private static state: any;
  private static renderer: Render;
  private static render: (state) => Widget;

  static setState = (newState: any, rebuild = true) => {
    let trState = { ...this.state, ...newState };

    for (let key in this.state) delete this.state[key];
    for (let key in trState) this.state[key] = trState[key];

    this.state = trState;

    if (rebuild) {
      new Render(this.rootId, this.render(this.state)).render();
    }
  }

  static buildApp(
    rootId: string,
    state: any,
    render: (state) => Widget
  ) {
    this.rootId = rootId;
    this.state = state;
    this.render = render;
    this.setState(state, false);

    this.renderer = new Render(rootId, render(state));
    return this.renderer;
  }
}

export {
  Widget,
  TextInput,
  Div,
  H,
  Render,
  Canoe
};


