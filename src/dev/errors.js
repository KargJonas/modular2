const errors = {
    0: ["Info",
        "You are using the development build of Modular-2. Make sure to use the production build when deploying this app."],

    1: ["Invalid Attribute",
        "Unable to create Modular element.",
        "Invalid attribute.",
        `The attribute "__config__" is reserved for Modular.`,
        "el"],

    2: ["Invalid Input",
        "An object, which is not a Modular-element, was passed into Modular.core.getHtml().",
        "( Modular.core.getHtml() was called by Modular.render() )",
        "Modular does not know how how to handle this.",
        "core.getHtml"],

    3: ["Invalid Input",
        "A value, which is not a [String], [Number], [Element] (html), [Function], [Object] or [Array], was passed into Modular.core.getHtml().",
        "( Modular.core.getHtml() was called by Modular.render() )",
        "This error might be caused by a invalid child-element in Modular.render() or Modular.el().",
        "Modular does not know how how to handle this.",
        "core.getHtml"],

    4: ["Invalid or Missing Input",
        "Unable to scan.",
        "A invalid value was passed into Modular.scan().",
        "Modular.scan() expects a [String].",
        "scan"],

    5: ["Missing TagName",
        "Unable to create Modular element.",
        "Missing tag.",
        "( The tag of a Modular-element is the first attribute of Modular.el() )",
        "el"],

    6: ["Invalid Style",
        "Unable to convert given value to inline style.",
        "A value passed into Modular.core.getStyle() could not be converted into inline style.",
        "Modular.core.getStyle() expects a [String] (already containing inline style), an [Object] (containing valid style) or a [Funtion] (returning an object that contains valid style)",
        "core.getStyle",
        "el"],

    7: ["Invalid Input",
        "Unable to render.",
        "Modular.render() is missing a root-element or a container-element",
        "( A root-element can be: a [Modular-element], [String], [Number], [Element] (html), [Array] (which conatins any of the mentioned) or [Function] (which returns any of the mentioned) )",
        "A container-element has to be an html-element or a valid CSS-selector ( [String] ).",
        "Keep in mind - if the container-element is not a child of the page, you propably won't be able to see much.",
        "render"],

    8: ["Invalid Render-Container",
        "Unable to render",
        "Modular.render() recieved an invalid container-element.",
        "A container-element has to be an html-element or a valid CSS-selector ( [String] ).",
        "Keep in mind - if the container-element is not a child of the page, you propably won't be able to see much.",
        "render"],

    9: ["Unknown Binding-Name",
        "Unable to set binding.",
        "Modular.setBinding() recieved an unknown binding-name.",
        "Bindings are created during render - maybe you should try setting the binding after Modular.render() is called.",
        `The "mRendered" event might help with timing.`,
        "setBinding"],

    10: ["Unknown Binding-Name",
        "Could not find binding.",
        "Modular.getBinding() recieved an unknown binding-name.",
        "Bindings are created during render - maybe you should try getting the binding after Modular.render() is called.",
        `The "mRendered" event might help with timing.`,
        "getBinding"],

    11: ["Unknown Binding-Name",
        "Could not find binding.",
        "Modular.listenBinding() recieved an unknown binding-name.",
        "Bindings are created during render - maybe you should try listening the binding after Modular.render() is called.",
        `The "mRendered" event might help with timing.`,
        "listenBinding"]
}

export default errors;