import {
  defineCustomElement as VueDefineCustomElement,
  createApp,
  getCurrentInstance,
  h,
} from "vue";
import { createWebComponent } from "vue-web-component-wrapper"; // Import from vue-web-component-wrapper
import RuleBuilder from "./RuleBuilder.vue"; // Root Vue component
import { registerPlugins } from "./plugins"; // Register Vue plugins (Vuetify, etc.)
import style from "./style.css?inline"; // Inline CSS styles for the web component

// Create the custom web component with callback support
createWebComponent({
  rootComponent: RuleBuilder, // The main Vue component (RuleBuilder)
  elementName: "rule-builder", // The custom element's tag name
  plugins: registerPlugins, // Register Vue plugins (like Vuetify)
  VueDefineCustomElement, // Define custom element using Vue 3's method
  cssFrameworkStyles: style, // Styles to apply to the web component
  h, // Vue's render function
  createApp, // Vue's createApp method for bootstrapping
  getCurrentInstance, // Get Vue instance (optional, if needed)
  // Registering a callback
  registerCallback(element, instance) {
    // Provide a method to set a custom callback like 'this.send' from Node-RED
    element.setCallback = function (callback) {
      instance.exposed.sendCallback = callback; // Expose the callback in the Vue instance
    };
  },
});
