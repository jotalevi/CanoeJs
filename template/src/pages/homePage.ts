import { Col, FlexAlignContent, FlexAlignItems, FlexJustify, FlexWrap, H, Link, Router, Row } from "canoejs";
import Logo from "../widgets/Logo";

const HomePage = () => {
    return new Col({
        css: {
            width: "100%",
            height: "100%",
            background: "linear-gradient(to top, rgba(135, 135, 250, 0.05), rgba(25, 25, 180, 0.1))",
        },
        flexAlignContent: FlexAlignContent.CENTER,
        flexAlignItems: FlexAlignItems.CENTER,
        flexJustify: FlexJustify.CENTER,
        flexWrap: FlexWrap.NOWRAP,
        children: [
            new Logo({}),
            new H({
                size: 1,
                text: "CanoeJS",
            }),
            new H({
                size: 3,
                text: "A lightweight framework for building web applications",
            }),
            new Row({
                flexAlignContent: FlexAlignContent.CENTER,
                flexAlignItems: FlexAlignItems.CENTER,
                flexJustify: FlexJustify.CENTER,
                flexWrap: FlexWrap.NOWRAP,
                children: [
                    new Link({
                        text: "GitHub",
                        to: "https://github.com/jotalevi/CanoeJs",
                    }),
                    new H({
                        size: 5,
                        text: "|",
                    }),
                    new Link({
                        text: "Documentation",
                        to: "/docs"
                    }),
                    new H({
                        size: 5,
                        text: "|",
                    }),
                    new Link({
                        text: "Examples",
                        to: "/examples"
                    }),
                ]
            }),
        ]
    });
}

export default HomePage;