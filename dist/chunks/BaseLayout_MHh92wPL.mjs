import { c as createComponent, d as renderTemplate, k as renderSlot, l as renderHead, f as addAttribute, e as createAstro } from './astro/server_B8iQNJEo.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                         */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title, description } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="utf-8"><title>', '</title><link rel="icon" type="image/x-icon" href="/stein-favicon.png"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description"', '><script type="module" src="/gallery.js" defer><\/script>', "</head> <body> ", " </body></html>"])), title, addAttribute(description || "Gallery test", "content"), renderHead(), renderSlot($$result, $$slots["default"]));
}, "J:/my website BU/astro migrate test/src/components/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
