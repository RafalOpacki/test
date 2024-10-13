import { defineCustomElement } from "vue";
import RuleBuilder from "./RuleBuilder.vue";

const RuleBuilderElement = defineCustomElement(RuleBuilder);

customElements.define("rule-builder", RuleBuilderElement);
