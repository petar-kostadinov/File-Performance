import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { showGeneratorView } from "./view/generator.js";
import { showHomeView } from "./view/home.js";

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