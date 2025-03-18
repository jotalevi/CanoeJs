import { Div, H, TextInput, Canoe, Card, Row, Col, Button, row } from "../src/canoe";
import FlexAlignContent from "../src/core/enum/FlexAlignContent";
import FlexAlignItems from "../src/core/enum/FlexAlignItems";
import FlexJustify from "../src/core/enum/FlexJustify";

const state = {
  selected: 1,
  data: [
    {
      id: 1,
      name: "John",
      surname: "Doe",
      email: "jdoe@canoe.com",
      age: 30,
      role: "Developer"
    },
    {
      id: 2,
      name: "Jane",
      surname: "Smith",
      email: "jsmith@canoe.com",
      age: 28,
      role: "Designer"
    },
    {
      id: 3,
      name: "Michael",
      surname: "Brown",
      email: "mbrown@canoe.com",
      age: 35,
      role: "Project Manager"
    },
    {
      id: 4,
      name: "Emily",
      surname: "Davis",
      email: "edavis@canoe.com",
      age: 25,
      role: "QA Engineer"
    },
    {
      id: 11,
      name: "Eros",
      surname: "Talevi",
      email: "etalevi@canoe.com",
      age: 24,
      role: "Software Engineer"
    },
    {
      id: 5,
      name: "Christopher",
      surname: "Wilson",
      email: "cwilson@canoe.com",
      age: 42,
      role: "Product Manager"
    },
    {
      id: 6,
      name: "Sarah",
      surname: "Johnson",
      email: "sjohnson@canoe.com",
      age: 27,
      role: "Front-End Developer"
    },
    {
      id: 7,
      name: "David",
      surname: "Garcia",
      email: "dgarcia@canoe.com",
      age: 38,
      role: "Database Administrator"
    },
    {
      id: 8,
      name: "Laura",
      surname: "Martinez",
      email: "lmartinez@canoe.com",
      age: 31,
      role: "Scrum Master"
    },
    {
      id: 9,
      name: "Robert",
      surname: "Taylor",
      email: "rtaylor@canoe.com",
      age: 29,
      role: "DevOps Engineer"
    },
    {
      id: 10,
      name: "Olivia",
      surname: "Anderson",
      email: "oanderson@canoe.com",
      age: 33,
      role: "Back-End Developer"
    }
  ]
};

Canoe.buildApp("root", state, (state) => {
  return new Col({
    alignItems: FlexAlignItems.CENTER,
    alignContent: FlexAlignContent.CENTER,
    style: {
      width: "100%",
    },
    children: [
      new H({
        style: {
          margin: "0px",
          marginTop: "50px",
        },
        size: 1,
        text: `Editando ${state.data.find((item: any) => item.id === state.selected).name} ${state.data.find((item: any) => item.id === state.selected).surname}`,
      }),
      new Row({
        children: [
          new Card({
            style: {
              padding: "15px",
              backgroundColor: "#FFFFFFFF",
              margin: "5px",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
            },
            children: [
              new Col({
                gap: "5px",
                children: [
                  new Row({
                    children: [
                      new Col({
                        gap: "0px",
                        children: [
                          new H({
                            size: 4,
                            text: "Name",
                            style: {
                              margin: "0px",
                              padding: "0px",
                            }
                          }),
                          new TextInput({
                            value: state.data.find((item: any) => item.id === state.selected).name,
                            callbacks: [
                              {
                                key: "input",
                                value: (e: any) => {
                                  let item = state.data.find((item: any) => item.id === state.selected);
                                  item.name = e.target.value;
                                  Canoe.setState({ data: state.data });
                                },
                              },
                            ],
                          }),
                        ]
                      }),
                      new Col({
                        gap: "0px",
                        children: [
                          new H({
                            size: 4,
                            text: "Surname",
                            style: {
                              margin: "0px",
                              padding: "0px",
                            }
                          }),
                          new TextInput({
                            value: state.data.find((item: any) => item.id === state.selected).surname,
                            callbacks: [
                              {
                                key: "input",
                                value: (e: any) => {
                                  let item = state.data.find((item: any) => item.id === state.selected);
                                  item.surname = e.target.value;
                                  Canoe.setState({ data: state.data });
                                },
                              },
                            ],
                          }),
                        ]
                      }),
                    ]
                  }),
                  new Row({

                    children: [
                      new Col({
                        style: {
                          width: "10%",
                        },
                        gap: "0px",
                        children: [
                          new H({
                            size: 4,
                            text: "Age",
                            style: {
                              margin: "0px",
                              padding: "0px",
                            }
                          }),
                          new TextInput({
                            style: {
                              width: "75%",
                            },
                            value: state.data.find((item: any) => item.id === state.selected).age,
                            callbacks: [
                              {
                                key: "input",
                                value: (e: any) => {
                                  let item = state.data.find((item: any) => item.id === state.selected);

                                  // TODO: Fix this state bug
                                  item.age = e.target.value;
                                  Canoe.setState({ data: state.data });
                                  item.age = e.target.value.replace(/\D/g, "");
                                  Canoe.setState({ data: state.data });
                                },
                              },
                            ],
                          }),
                        ]
                      }),
                      new Col({
                        style: {
                          width: "87%",
                        },
                        gap: "0px",
                        children: [
                          new H({
                            size: 4,
                            text: "Mail",
                            style: {
                              margin: "0px",
                              padding: "0px",
                            }
                          }),
                          new TextInput({
                            style: {
                              width: "98%",
                            },
                            value: state.data.find((item: any) => item.id === state.selected).email,
                            callbacks: [
                              {
                                key: "input",
                                value: (e: any) => {
                                  let item = state.data.find((item: any) => item.id === state.selected);
                                  item.email = e.target.value;
                                  Canoe.setState({ data: state.data });
                                },
                              },
                            ],
                          }),
                        ]
                      }),
                    ],
                  }),
                  new Row({
                    style: {
                      width: "100%",
                    },
                    children: [
                      new Col({
                        style: {
                          width: "100%",
                        },
                        gap: "0px",
                        children: [
                          new H({
                            size: 4,
                            text: "Role",
                            style: {
                              margin: "0px",
                              padding: "0px",
                            }
                          }),
                          new TextInput({
                            style: {
                              width: "98%",
                            },
                            value: state.data.find((item: any) => item.id === state.selected).role,
                            callbacks: [
                              {
                                key: "input",
                                value: (e: any) => {
                                  // TODO: Create a select input custom widget with multiselect options
                                  let item = state.data.find((item: any) => item.id === state.selected);
                                  item.role = e.target.value;
                                  Canoe.setState({ data: state.data });
                                },
                              },
                            ],
                          }),
                        ]
                      }),
                    ]
                  }),
                ],
              }),
            ],
          },
            true
          ),
        ],
      }),
      new Button({
        style: {
        },
        callbacks: [
          {
            key: "click",
            value: () => {
              Canoe.setState({ data: [...state.data, { id: state.data.length + 1, name: "New", surname: "User", email: "nuser@company.net", age: 0, role: "Role" }] });
            },
          }
        ],
        children: [
          new H({
            size: 3,
            text: "Add new",
            style: {
              margin: "0px",
              padding: "0px",
            }
          }),
        ]
      }),
      new Row({
        justify: FlexJustify.CENTER,
        gap: "0px",
        style: {
          width: "80%",
        },
        children: state.data.map((item: any) => {
          return new Card({
            style: {
              padding: "15px",
              margin: "5px",
            },
            callbacks: [
              {
                key: "click",
                value: () => {
                  Canoe.setState({ selected: item.id });
                },
              },
            ],
            children: [
              new Col({
                gap: "2px",
                children: [
                  new Row({
                    children: [
                      new H({
                        size: 4,
                        text: `${item.name} ${item.surname}`,
                        style: {
                          margin: "0px",
                          padding: "0px",
                          fontWeight: "500",
                        }
                      }),
                      new H({
                        size: 4,
                        text: `${item.age}`,
                        style: {
                          margin: "0px",
                          padding: "0px",
                          fontWeight: "600",
                        }
                      }),
                    ]
                  }),
                  new H({
                    size: 5,
                    text: `${item.role}`,
                    style: {
                      margin: "0px",
                      padding: "0px",
                      fontWeight: "500",

                    }
                  }),
                  new H({ 
                    size: 5, 
                    text: `${item.email}`, 
                    style: { 
                      margin: "0px", 
                      padding: "0px", 
                      opacity: "0.9",
                      fontWeight: "500",
                    } 
                  }),
                ]
              }),
            ],
          });
        }),
      }),
    ],
  });
}).render();