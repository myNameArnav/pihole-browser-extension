import "../general/general.scss";
import Vue from "vue";
import {BIconClipboard, BIconEye, BIconEyeSlash, BIconPlusCircle, BIconXCircle, BootstrapVue} from "bootstrap-vue";
import OptionComponent from "./vue/OptionComponent.vue";

/**
 * Main Init function for the popup
 */
function init(): void {
    const option_vue_component = {
        el: "#main",
        render: (h: any) => h(OptionComponent)
    };

    Vue.use(BootstrapVue);
    Vue.component('BIconPlusCircle', BIconPlusCircle);
    Vue.component('BIconXCircle', BIconXCircle);
    Vue.component('BIconClipboard', BIconClipboard);
    Vue.component('BIconEye', BIconEye);
    Vue.component('BIconEyeSlash', BIconEyeSlash);
    new Vue(option_vue_component);
}

document.addEventListener('DOMContentLoaded', () => init());
