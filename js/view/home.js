import { html } from "https://cdn.jsdelivr.net/npm/lit-html@2.7.0/lit-html.js";

const homeTemp = () => html``

let context = null;
export function showHomeView(ctx) {
    context = ctx;
    context.showSlider()
    //context.render(homeTemp());
}
