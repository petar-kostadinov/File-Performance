const { html, render } = window.litHtml;

const homeTemp = () => html``

let context = null;
export function showHomeView(ctx) {
    context = ctx;
    context.showSlider()
    context.render(homeTemp());
}
