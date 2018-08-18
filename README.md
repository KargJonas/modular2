## Modular-2 is a tool for dynamic, component-based page-generation.<br>
### <b>"A little (more than a) temlating system."</b>

## Some neat stuff:
- A friendly [error system](#The&nbsp;error&nbsp;system) 🚨
- Only 7.3 KB 💾
- Fast [rendering](#Modular.render) ⏱️
- [Data-binding](#bindings) ⛓
- Intuitive [syntax](#example) 👩🏻‍💻
- A rigid [router](#the-router) 📡

## Table of Contents
- [Example](#example)
- [Error System](#the-error-system)
- [Modular.el()](#modularel)
- [Modular.render()](#modularrender)
- [Style](#style)
- [Bindings](#bindings)
- [Modular.getBinding()](#modulargetbinding)
- [Modular.setBinding()](#modularsetbinding)
- [Modular.listenBinding()](#modularlistenbinding)
- [Modular.scan()](#modularscan)
- [Components](#components)
- [The router](#the-router)
- [Modular.router.navigate()](#modularrouternavigate)
- [\_\_config\_\_](#\_\_config\_\_)
- [Why is this useful?](#but-why-is-this-useful)

### Example:
```html
<div id="root"></div>
<script src="modular-2.js"></script>
<script>

    let users = ["Bill", "Hopper", "Mark", "Linus"];
    const userStyle = {
        borderBottom: "2px solid #333333",
        paddingRight: "5px",
        width: "max-content"
    };

    function User(name) {
        return Modular.el(
            "li",
            { style: userStyle },
            name
        );
    }

    function List() {
        return users.map(user => User(user));
    }

    Modular.render(List, "#root");

</script>
```
```
     []
     []
   \\\///
    \\//
     ''
```
![Example](https://github.com/KargJonas/random/blob/master/modular2/example.png)

<hr>

## The error system
The development-build of modular (modular-2.dev.js) has a friendly error system built in. An error might look like this:

![Error](https://github.com/KargJonas/random/blob/master/modular2/error.png)
<hr>

## Modular.el:
Returns a `Modular-element`, that can be transformed into a `DOM-element` with `Modular.render()`.

## Usage:
```js
Modular.el(TAGNAME, ATTRIBUTES, CONTENT, CONTENT, ...);
```

- <b>TAGNAME</b> <i>(String)</i>:<br>The element's `tagName`.<br>( e.g.: `h1`, `div`, `p`, `mycustomtagname`, ... ).

- <b>ATTRIBUTES</b> <i>(Object | Null)</i>:<br>The attributes of the element. <br>There are some special attributes such as [style](#Style), [$bind](#Bindings) and [\_\_config\_\_](#__config__).

- <b>CONTENT</b> <i>[ String | Number | Array | Object (Modlar-element) | Function | Element (html) | Null ]</i>:<br>The content of the element. You can use basically anything as content.

## Example:
```js
let myElement = Modular.el(
    "div",
    { style: "background-color: #9ff" },
    "Hello World"
);
```
or
```js
let myOtherElement = Modular.el("input", {
    type: "text",
    style: {
        outline: "none",
        border: "none",
        backgroundColor: "#bfbfc9"
    }
});
```

![example](https://github.com/KargJonas/random/blob/master/modular2/el.gif)
<hr>

## Events
| Event-Name   | Info                                    |
| ------------ | --------------------------------------- |
| `prerender`  | Called before render                    |
| `postrender` | Called after render                     |
| `newroute`   | Called after a route-change has occured |
<hr>

## Modular.render
Converts a value into a DOM-Element and inserts it into another element.

## Usage:
```js
Modular.render(VALUE, ELEMENT/SELECTOR);
```
- VALUE <i>[ String | Number | Array | Object (Modlar-element) | Function | Element (html) | Null ]</i>:<br>The element that will be "rendered"
- ELEMENT/SELECTOR <i>(Element | String)</i>: The parent/container-element or it's selector.

## Example:
```js
Modular.render(
    Modular.el("h1", null, "Test"),
    document.getElementById("root");
);
```
or
```js
Modular.render(
    Modular.el("h1", null, "Test"),
    "#root"
);
```
<hr>

## Style
Modular has some stuff to offer that might help you with dynamic styles:
- If you want, you can use style-objects. Style objects will be transformed into inline-style, when the element is rendered.
  
- You can use functions as style. This might seem silly but it makes your code more readable.<br><i>Remember: Style functions must return either a string or an Object.</i>
<hr>

## Bindings
Bindings are a way to "tie" an element's properties to a value. You could even tie an element's properties to the ones of another element.<br>

To define a Modular-element's bindings, you can use the `$bind`-attribute. The attribute's value must be an object. Each key in the object correnponds to a property of the DOM-element, that is created from Modular.el() and each value is the name of a binding, the property will be bound to. (<b>The $bind-attribute will be removed upon render, so your DOM-elements stay nice and clean.</b>)<br>

Every time any changes occur in either in the binding or any of the elements, everything is updated (<b>But not re-rendered!</b>).
### Example
```js
// An input, that is bound to "myBinding"
let myInput = Modular.el("input", {
    type: "text",
    style: "outline: none",

    // This is where the magic happens
    $bind: {
        value: "myBinding"
    }
});

// A paragraph that is also bound to "myBinding"
let myParagraph = Modular.el("p", {
    $bind: {
        innerHTML: "myBinding"
    }
}, "This is just a placeholder!");

// Rendering everything
Modular.render(
    [myInput, myParagraph],
    "#myContainerElement" // This in in your HTML
);
```
<hr>

## Modular.getBinding
Allows you to get the current value of a binding.
### Example
```js
let myVariable = Modular.getBinding("myFirstBinding");
```
<hr>

## Modular.setBinding
Allows you to set the current value of a binding.
### Example
```js
Modular.setBinding("mySecondBinding", "This is the binding's new content.");
```
<hr>

## Modular.listenBinding
Runs the provided function every time a change occurs in the specified binding. (You can have as many of these as you want.)
### Example
```js
Modular.listenBinding("myOtherBinding", (newValue, event) => {
    console.log("myOtherBinding just changed to " + newValue);
});
```
<hr>

## Modular.scan
Converts an html-string into an array of Modular-elements. (<b>Comments are handeled as text.</b>)

### Example
```js
let myModularElement = Modular.scan(`
    <h1 id="test-header">This is a test-header</h1>
    <p>Test</p>
    Text-node

    <div>
        Test
    </div>
`);
```
<hr>

## Components:
A component could be a method, an element, an array of methods, strings, arrays, ... whatever. It's your choice.

A good practice however would be to put major parts of your page into functions. For example, you could put the topbar of a page into a Function:
```js
// This is your topbar
function Topbar() {
    return Modular.el(...);
}

// Rendering the topbar
Modular.render(Topbar, "#rootElement");
```

Also, it's a good idea to put elements, that you commonly use into a function and use arguments to customize the element's properties.
```js
// This is just some style.
let myButtonStyle = {
    outline: "none"
}

// This is your Button-component
function Button(text, callback) {
    return Modular.el("button", {
        style: myButtonStyle,
        onclick: callback
    }, text);
}
```
This has the benefit of reducing code. Now you can have a million buttons if you like and you will still know, what is gong on.
```js
Modular.render(
    // This is an array with some buttons
    [
        Button("This is my first button.",
        () => console.log("Button 1 was pressed.")),

        Button("This is my second button.",
        () => console.log("Button 2 was pressed.")),
    ],
    "#rootElement"
);
```
<hr>

## The router
Modular-2 has a minimalist router built in. There are four major steps to implement it into your page.
### 1.) Configure the routes
#### Usage:
```js
Modular.router.routes = {
    "PAGE_PATH": PAGE_VALUE
};
```

#### Example:
```js
Modular.router.routes = {
    "path/to/your/page": Value,
    "users/**": OtherValue,
    "**": YetAnotherValue
};
```

The routes are checked one after the other. When a perfect match to `window.location.pathname` is found, `Modular.router.element` is set to the corresponding element and the `newroute`-event is dispatched (See: [Events](#events)). (Router-Elements could be anything. It's up to you what you want to do with them. See [Modular.render](#modularrender)). `**` matches anything.

### 2.) Respond to route-changes
Inorder to change the content on the page, you need to set up a system, that renders the desired content, when a change in the route occurs.
#### Example.
```js
window.addEventListener("newroute", () => {
    Modular.render(
        Modular.router.page,
        "#root"
    );
});
```

#### Notice:
If you have elements, that you want to show up on any page, it would be very annoying to add your topbar-element to each value in `Modular.router.routes`. An easier way would be to add the element directly the element in `Modular.render`:
```js
window.addEventListener("newroute", () => {
    Modular.render(
        [
            Topbar, // The topbar
            Modular.router.page // The page
        ],
        "#root"
    );
});
```

### 3.) Server
If you use the router to build a singlepage-app, you have to tell the server to ignore all request for subpages and only respons with your main file. (`index.html`)

#### Apache:
If you are using Apache, you can just create a file inside your website's folder called "`.htaccess`" containig the following code.

```apache
<IfModule mod_rewrite.c>
    RewriteEngine on
    RewriteCond %{REQUEST_FILENAME} -f [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]
    RewriteRule ^ index.html [L]
</IfModule>
```

This snippet uses the Apache's RewriteEngine, you can enable it using these commands:

```bash
sudo a2enmod rewrite
sudo service apache2 restart
```

### 4.) Navigate
You can use [Modular.router.navigate](#modularrouternavigate) to switch to the desired url. This can be implemented into a link.

<hr>

## Modular.router.navigate
Navigates the [router](#the-router) to the provided url.
### Usage
```js
Modular.router.navigate(PATH);
```

### Example
```js
Modular.router.navigate("/users/premium/john_doe");
```
<hr>

## \_\_config\_\_
Every modular element is an object, which contains the attributes of the corresponding DOM-element and a special `__config__` attribute. `__config__` contains the `tagName` and the `content` of the element but also some other stuff such as the type of the Modular-element, the render method, the element's bindings, the DOM-element and the element's render-method itself. (<b>The $bind-attribute will be removed upon render.</b>)
<hr>

## But why is this useful?
Frameworks like Modular-2 allow you to create dynamic website content and to reuse parts of your page (as components) without major modification.<br>

### Example use-case:
You have an array of 1000 users. You want to display every user in a list and you want to be able to delete and add users in that list dynamically. Also you want that all premium users have a shared tag.