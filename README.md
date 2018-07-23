# Modular 2
### Modular 2 is a very thin layer of automation in UI-creation.<br>
### It allows you to do many things that frameworks such as React allow you to do, just in a smaller form-factor.<br>
### Unlike Modular.js, Modular 2 does not require the explicit creation of components.

## Modular.el():
Modular.el() returns an object that can be transformed into an HTML-Sting by `Modular.render()`.<br>
It is used as a supplement to HTML in your code.
### Usage:
```js
Modular.el(TAGNAME, ATTRIBUTES, CONTENT);
```
- TAGNAME: The tag for your HTML-element ( e.g.: `h1`, `div`, `p`, `myComponent`, ... ).
- ATTRIBUTES: The attributes of the element. Has to be an object ( e.g.: `{ id: "test-el", style: "color: #fff" }` ).
- CONTENT: The innerHTML of your element. Can be a string, number, Modular.el(...) or an array containing any of the before mentioned. ( `e.g.: ["Hello", Modular.el("Haha"), 9, ["Test1", "Test2"]]` ).

### Example:
```js
let myElement = Modular.el("div", { style: "background-color: #9ff" }, "Hello World");
```
<hr>

## Modular.render()
Transforms the given modular element into a DOM-Element.
### Usage:
```js
Modular.render(
    MODULAR_ELEMENT,
    DOM_ELEMENT
);
```
- MODULAR_ELEMENT: A single modular element (created by Modular.el).
- DOM_ELEMENT: The element, the modular element will be inserted into.

### Example:
```js
Modular.render(
    Modular.el("h1", null, "Test"),
    document.getElementById("root");
);
```
<hr>

## Functions:
When a function's name is written in uppercase, (e.g. `function MyFunc () {}`) it qualifies as a "modular-function". If a modular element has the tagname of such a function, the elements content will be the functions returned value. There will be an object passed into the function, when it is called. The object contains all of the arguments of the modular element.
### Usage:
```js
function FUNCTION_NAME(ELEMENT_ARGUMENTS) {
    ...
    return CONTENT;
}

Modular.el(FUNCTION_NAME, ELEMENT_ARGUMENTS);
```

### Example:
```js
function MyElement(props) {
    return Modular.el("h1", null, props.value);
}

Modular.render(
    Modular.el("MyElement", { value: "My name is bob." }),
    document.getElemenById("root");
);
```
<hr>
<br>

### But why is this useful?
This allows you to create dynamic website content and to reuse parts of your code somewhere else without major modification.<br>
### Example use case:
You have a list of 1000 users. You want to display every user in a list (`<ul>` and `<li>`) and you want the number of the user next to the users name.
This can be done with something like PHP but it is very resource intensive for the server if this has to be done every single time someone looks at the page - why not do this work on the users computer?<br>
> A similar example can be found in /example.