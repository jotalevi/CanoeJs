import { Canoe, Col,  FlexAlignContent, FlexAlignItems, FlexJustify, FlexWrap, H, Link, Row, TextInput, Widget } from "canoejs";
import Image from "../widgets/Image";

export default class DocsPage implements Widget {
    id: string

    constructor() {
        this.id = "docs-page";
    }

    render(): HTMLElement {
        return new Col({
            alignContent: FlexAlignContent.CENTER,
            alignItems: FlexAlignItems.START,
            justify: FlexJustify.START,
            wrap: FlexWrap.NOWRAP,
            gap: "0px",
            style: {
                width: "100%",
                height: "100%",
            },
            children: [
                new Row({
                    alignContent: FlexAlignContent.BETWEEN,
                    alignItems: FlexAlignItems.CENTER,
                    justify: FlexJustify.BETWEEN,
                    wrap: FlexWrap.NOWRAP,
                    style: {
                        width: "100%",
                        paddingTop: "0px",
                    },
                    children: [
                        new Row({
                            alignItems: FlexAlignItems.CENTER,
                            style: {
                                paddingLeft: "15px",
                            },
                            children: [
                                new Image({
                                    id: "logo",
                                    src: "favicon.ico",
                                    alt: "CanoeJS Logo",
                                    fit: "cover",
                                    width: "52px",
                                    height: "52px",
                                }),
                                new H({
                                    size: 2,
                                    text: "CanoeJS",
                                }),
                            ]
                        }),
                        new Row({
                            alignItems: FlexAlignItems.CENTER,
                            style: {
                                paddingRight: "15px",
                            },
                            children: [
                                new Link({
                                    to: "https://github.com/jotalevi/CanoeJs",
                                    children: [
                                        new H({
                                            size: 3,
                                            text: "GitHub",
                                            style: {
                                                color: "rgb(32 118 139)",
                                                textAlign: "center",
                                            },
                                        }),
                                    ]
                                }),
                                new H({
                                    size: 3,
                                    text: "Documentation",
                                    style: {
                                        color: "rgb(148 190 200)",
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
                                                color: "rgb(32 118 139)",
                                                textAlign: "center",
                                            },
                                        }),
                                    ]
                                }),
                            ]
                        })
                    ]
                })
            ]
        }).render();
    }
}