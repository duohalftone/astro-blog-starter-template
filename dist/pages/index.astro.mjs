/* empty css                                 */
import { c as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../chunks/astro/server_B8iQNJEo.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_MHh92wPL.mjs';
import '@astrojs/internal-helpers/path';
import { p as posts, $ as $$Image } from '../chunks/posts_pboh59Uf.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const title = "Stein Chong";
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": title, "description": "Gallery test" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col md:flex-row min-h-screen"> <div class="sidebar bg-transparent p-8 md:fixed md:top-0 md:left-0 md:h-full md:w-[350px] md:overflow-auto"> <header> <h3>Stein <br>Chong</h3> <h4 class="mt-6 leading-tight text-base"> <span class="welcome">Welcome!</span><br>There are no follows, no likes, no comments and no algorithms, you came here because you want to. Just take a stroll whenever you like.
</h4> <p class="mt-6 text-sm italic text-white/80">
Sorry for not feeding Meta anymore. <br>You can still contact me on Instagram <a href="https://www.instagram.com/steinstreet/">@steinstreet</a>.
</p> <a href="/about" class="inline-block mt-8"> <h3>About Me</h3> </a> <p class="mt-4 text-sm italic text-white/80">
Website in progress, changes will be made randomly.<br>Posts will upload periodically.
</p> </header> </div> <div class="content md:ml-[380px] p-10 flex-1"> <div class="search-bar"> <input id="post-search" type="search" placeholder="Search posts..." aria-label="Search posts" class="w-full rounded-2xl border border-white/35 bg-white/8 px-4 py-3 text-white outline-none transition duration-200 focus:border-[#f04e30] focus:bg-white/12"> </div> <main id="post-main" class="grid gap-8 md:grid-cols-2"> ${posts.map((post) => renderTemplate`<a${addAttribute(`/posts/${post.slug}`, "href")} class="relative overflow-hidden block"> ${renderComponent($$result2, "Image", $$Image, { "src": post.cover, "alt": post.coverAlt, "inferSize": true, "widths": [400, 800, 1200], "sizes": "(min-width: 768px) 50vw, 100vw", "class": "w-full h-auto block", "loading": "lazy" })} <p class="absolute inset-x-0 bottom-0 m-0 p-5 font-bold text-[#dadadae1] text-[clamp(1.3rem,1.5vw,1.4rem)] leading-none text-left shadow-[2px_0_5px_rgba(0,0,0,0.8)]"> ${post.title} </p> </a>`)} </main> <nav id="pagination" class="page-links mt-10" aria-label="Post pagination"></nav> </div> </div> <footer>Made by Stein - All rights reserved.</footer> ` })}`;
}, "J:/my website BU/astro migrate test/src/pages/index.astro", void 0);

const $$file = "J:/my website BU/astro migrate test/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
