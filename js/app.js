import page from "https://cdn.jsdelivr.net/npm/page@1.11.6/page.mjs";
import { render } from "https://cdn.jsdelivr.net/npm/lit-html@2.7.0/lit-html.js";
import { showHomeView } from "./view/home.js";
import { showGeneratorView } from "./view/generator.js";
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
