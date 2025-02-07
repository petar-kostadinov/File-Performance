import { html, render } from "https://cdn.jsdelivr.net/npm/lit-html@2.5.0/lit-html.js";

const homeTemp = () => html``;

let context = null;
export function showHomeView(ctx) {
    context = ctx;
    context.showSlider();
    context.render(homeTemp());
    
       window.addEventListener('popstate', function () {
        document.querySelectorAll('img').forEach(function(img) {
            img.src = img.src.split('?')[0] + '?' + new Date().getTime();
        });
    });
}
