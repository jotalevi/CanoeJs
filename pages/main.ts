import { Div, H, TextInput, Canoe, Card, Row, Col } from "../src/canoe";

const state = {
  text: "Initial Text",
  "data": [
    {
      "name": "John",
      "surname": "Doe",
      "email": "jdoe@company.com",
      "age": 30,
      "role": "Developer"
    },
    {
      "name": "Jane",
      "surname": "Smith",
      "email": "jsmith@company.com",
      "age": 28,
      "role": "Designer"
    },
    {
      "name": "Michael",
      "surname": "Brown",
      "email": "mbrown@company.com",
      "age": 35,
      "role": "Project Manager"
    },
    {
      "name": "Emily",
      "surname": "Davis",
      "email": "edavis@company.com",
      "age": 25,
      "role": "QA Engineer"
    },
    {
      "name": "Christopher",
      "surname": "Wilson",
      "email": "cwilson@company.com",
      "age": 42,
      "role": "Product Manager"
    },
    {
      "name": "Sarah",
      "surname": "Johnson",
      "email": "sjohnson@company.com",
      "age": 27,
      "role": "Front-End Developer"
    },
    {
      "name": "David",
      "surname": "Garcia",
      "email": "dgarcia@company.com",
      "age": 38,
      "role": "Database Administrator"
    },
    {
      "name": "Laura",
      "surname": "Martinez",
      "email": "lmartinez@company.com",
      "age": 31,
      "role": "Scrum Master"
    },
    {
      "name": "Robert",
      "surname": "Taylor",
      "email": "rtaylor@company.com",
      "age": 29,
      "role": "DevOps Engineer"
    },
    {
      "name": "Olivia",
      "surname": "Anderson",
      "email": "oanderson@company.com",
      "age": 33,
      "role": "Back-End Developer"
    }
  ]
};

Canoe.buildApp("root", state, (state) => {
  return new Div({
    children: [
      new H({ size: 1, text: state.text }),
      new TextInput({
        value: state.text,
        callbacks: [
          {
            key: "keyup",
            value: (e: any) => {
              Canoe.setState({ text: e.target.value });
            },
          },
        ]
      }),
      new Row({
        children: state.data.map((item: any) => {
          return new Card({
            style: {
              padding: "15px",

            },
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