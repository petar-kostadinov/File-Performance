import { showHomeView } from "./view/home.js";

const { html, render } = window.litHtml;
const page = window.page;
const root = document.getElementById('app');
const slider = document.querySelector('.slider');

page(decorationContext)
page("/", showHomeView)
page("/generator", showGeneratorView)
//page("/login",)
//page("/rollers",)
//page("/faq",)
//page("/contacts",)



page.start();

function renderer(template) {
    render(template, root)
}

function goTo(path) {
    page(path)
}

function decorationContext(ctx, next) {
    ctx.render = renderer;
    ctx.showSlider = () => slider.style.display = 'block'
    ctx.hideSlider = () => slider.style.display = 'none'
    ctx.goTo = goTo;
    next();
}
