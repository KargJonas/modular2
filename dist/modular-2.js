const Modular = {
    data: {
        wrapper: document.createElement("div"),
        ERRORS: {
            00: "Unknown Error",
            01: "Syntax Error",
            10: "Invalid/Missing configuration",
            11: "Invalid insert",
            12: "Invalid component",
            13: "Invalid component-instance",
            14: "Invalid element-content",
            15: "Invalid passed-in value"
        }
    },

    core: {
        err() {
            let args = Array.from(arguments);
            let type = "";
            let position = "";
            let error;

            if (args[0].constructor === Number) {
                type = ` [${Modular.data.ERRORS[args[0]]}]`;
                args.shift();
            }

            if (args.length > 1) {
                position = `\n--> @ Modular.${args.pop()}()`;
            }

            error = args.map(arg => {
                return `\n--> ${arg}`;
            });

            return new Error(`(Modular)${type}:${error}\n${position}\n`);
        },

        info() {
            let args = Array.from(arguments);
            let inf = "Info: (Modular):\n";

            for (let i = 0; i < arguments.length - 1; i++) inf += `--> ${args[i]}\n`;
            inf += `\n--> @ ${args[args.length - 1]}()`;

            return inf;
        },

        isElement(obj) {
            try { return obj instanceof HTMLElement }
            catch (e) {
                return (typeof obj === "object") &&
                    (obj.nodeType === 1) && (typeof obj.style === "object") &&
                    (typeof obj.ownerDocument === "object");
            }
        },

        getProps(arr) {
            let obj = {};

            arr.map(el => {
                let temp = el.split("=");
                let key = temp[0];
                let val = temp[1];
                if (val[0] == "\"" || val[0] == "'") val = val.substring(1, val.length - 1);
                else if (val[0] == "{") val = eval(val.substring(1, val.length - 1));
                obj[key] = val;
            });

            return obj;
        },

        toHtml(el) {
            Modular.data.wrapper.innerHTML = null;
            Modular.data.wrapper.appendChild(el);
            return Modular.data.wrapper.innerHTML;
        },

        // Gets a variables' content by its name
        getVariable(name) {
            if (!/[^0-9]\w*/.test(name)) return undefined;
            let value = window[name];

            if (!value) {
                try {
                    value = eval(name);
                } catch (e) {
                    return undefined;
                }
            }

            return value;
        },

        // Transforms given element content (innerHTML) to string
        getStr(value) {
            if (!value) return null;
            if (value.constructor === String || value.constructor === Number) return value;
            if (value instanceof Element) return value.outerHTML;
            if (value.constructor === Object) {
                if (value.type === "modular-element") return Modular.core.renderElement(value);
                else throw Modular.core.err(15, "core.getValue");
            }
            if (value.constructor === Array) return value.map(arrEl => Modular.core.getStr(arrEl)).join("");
            throw Modular.core.err(15, "Value must be of type String, Number or Object", "core.getValue");
        },

        renderElement(context) {
            if (context.constructor !== Object || context.type !== "modular-element") throw Modular.core.err(
                10, "Invalid element.", "Must be of type Object.", "Create with Modular.el()", "core.renderElement");

            let rendered = "";
            let tagVal;

            if (context.tag[0] == context.tag[0].toUpperCase()) {
                tagVal = Modular.core.getVariable(context.tag);
            }

            if (tagVal) {
                if (tagVal.constructor === Function) {
                    rendered = Modular.core.getStr(tagVal(context.attributes || {}) || "");
                } else rendered = Modular.core.getStr(tagVal) || "";

            } else rendered = Modular.core.tag(context.tag, context.attributes, Modular.core.getStr(context.innerHTML) || "");

            return rendered;
        },

        tag(elementTag, elementArguments, elementInnerHTML) {
            let elArgsConverted = "";
            if (elementArguments) elArgsConverted = " " + Object.entries(elementArguments).map(entry => `${entry[0]}="${entry[1]}"`).join(" ");
            element = `<${elementTag}${elArgsConverted}>${elementInnerHTML}</${elementTag}>`;

            return element;
        }
    },

    el(tag, attributes, innerHTML) {
        if (typeof tag !== "string") throw Modular.core.err(10, "Invalid or missing tag attibute.", "el");
        if (innerHTML && innerHTML.constructor !== Array) innerHTML = [innerHTML];

        return {
            type: "modular-element",
            tag: tag,
            attributes: attributes || {},
            innerHTML: innerHTML
        };
    },

    render(element, container) {
        if (!element || !container) throw Modular.core.err(
            10, "Missing element or container.", "render");

        if (!Modular.core.isElement(container)) throw Modular.core.err(
            10, "Invalid container",
            "Container must be an HTML-element.",
            "render");

        if (!element.constructor === Object || element.type !== "modular-element") throw Modular.core.err(
            10, "Invalid element.", "Must be of type Object.", "Create with Modular.el()", "render");

        container.innerHTML = Modular.core.renderElement(element);
    }
};