import { data } from "./data";
import { err, getAttr, getHtml } from "./core";

// Set the value of a binding
function setBinding( binding, value ) {
    if ( !data.bindings[binding] ) {
        data.bindings[binding] = {
            elements: [],
            lastValue: undefined,
            value: undefined,
            listeners: []
        };
    }

    data.bindings[binding].lastValue = data.bindings[binding].value;
    data.bindings[binding].value = value;
    data.bindings[binding].elements.map( element => {
        element.element[element.value] = data.bindings[binding].value;
    } );
}

// Get the value of a binding
function getBinding( binding ) {
    if ( !data.bindings[binding] ) return undefined;
    return data.bindings[binding].value;
}

// Add a listener to a binding
function listenBinding( binding, func ) {
    if ( !data.bindings[binding] ) setBinding( binding, undefined );
    data.bindings[binding].listeners.push( func );
}

// Converts a (html) string into a Modular-element
function scan( val ) {
    if ( val.constructor !== String ) throw new Error( err( 4 ) );
    let wrapper = document.createElement( "div" );
    wrapper.innerHTML = val.trim();

    const res = Array.from( wrapper.childNodes ).map( node => {
        if ( node instanceof Element ) {
            return el( node.tagName, getAttr( node.attributes ), scan( node.innerHTML ) );
        } else return node.textContent;
    } );

    return res;
}

// The entry-point for rendering stuff
function render( element, _container ) {
    data.tempStyle = "";
    data.elCount = 0;
    window.dispatchEvent( data.preRender );

    if ( !element || !_container ) throw new Error( err( 7 ) );
    let container;

    if ( _container.constructor === String ) {
        container = document.querySelector( _container );
    } else container = _container;

    if ( !( container instanceof Element ) ) throw err( 8 );

    container.innerHTML = "";
    container.appendChild( getHtml( element ) );

    const styleEl = document.createElement( "style" );
    styleEl.innerHTML = data.tempStyle;
    document.head.appendChild( styleEl );

    window.dispatchEvent( data.postRender );
}

export {
    getBinding,
    setBinding,
    listenBinding,
    scan,
    render
};