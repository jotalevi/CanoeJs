import { Col, FlexAlignContent, FlexAlignItems, FlexJustify, H, Link, Row, Widget } from "canoejs";
import Logo from "../widgets/Logo";

export default class HomePage implements Widget {
    id: string

    constructor(opts: any) {
        this.id = opts.id;
    }

    render (): HTMLElement {
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
                new Logo({
                    id: "logo",
                    width: "500px",
                    height: "500px",
                }),
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
                            to: "https://github.com/jotalevi/CanoeJs",
                            children: [
                                new H({
                                    size: 3,
                                    text: "GitHub",
                                    style: {
                                        color: "rgb(32 118 139)",
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
                            to: "/docs",
                            children: [
                                new H({
                                    size: 3,
                                    text: "Documentation",
                                    style: {
                                        color: "rgb(32 118 139)",
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
                            to: "/docs",
                            children: [
                                new H({
                                    size: 3,
                                    text: "Examples",
                                    style: {
                                        color: "rgb(32 118 139)",
                                        fontSize: "20px",
                                        textAlign: "center",
                                    },
                                }),
                            ]
                        }),
                    ]
                })
            ]
        }).render();
    }
}