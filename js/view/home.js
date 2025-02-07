import { html } from "../../node_modules/lit-html/lit-html.js";

const homeTemp = () => html``

let context = null;
export function showHomeView(ctx) {
    context = ctx;
    context.showSlider()
    context.render(homeTemp());
}