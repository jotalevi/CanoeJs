import { Div, H, TextInput, Canoe } from "./canoe";

const state = {
  text: "Initial Text"
};

const render = (state) => {
  return new Div({
    children: [
      new H({
        text: state.text,
      }),
      new TextInput({
        value: state.text,
        callbacks: [
          {
            key: "keyup",
            value: (e: Event) => {
              console.log(e);
              Canoe.setState({ text: (e.target as HTMLInputElement).value });
            },
          },
        ],
      }),
    ],
  });
};

Canoe.buildApp("root", state, render).render();