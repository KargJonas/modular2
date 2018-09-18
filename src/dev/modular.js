import {
  err,
  getAttr,
  getHtml,
  getStyle,
  makeEl
} from "./core.js";

import {
  getBinding,
  setBinding,
  listenBinding,
  scan,
  render
} from "./methods";

import { data } from "./data";
import el from "./el";
import router from "./router";

const Modular = {
  // Events, bindings and error-messages
  data: data,

  // The core
  core: {
    err: err,
    getAttr: getAttr,
    getHtml: getHtml,
    getStyle: getStyle,
    makeEl: makeEl
  },

  // Methods
  getBinding: getBinding,
  setBinding: setBinding,
  listenBinding: listenBinding,
  scan: scan,
  el: el,
  render: render,
  router: router
};

if ( Modular.data.errors ) {
  console.warn( Modular.core.err( 0 ) );
}

document.head.appendChild( Modular.data.styleElement );

// Making Modular a global constant (webpack)
Object.defineProperty( window, "Modular", {
  value: Modular,
  writable: false,
  enumerable: true,
  configurable: false
} );