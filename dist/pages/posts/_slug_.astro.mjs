/* empty css                                    */
import { c as createComponent, r as renderComponent, d as renderTemplate, e as createAstro, m as maybeRenderHead, f as addAttribute } from '../../chunks/astro/server_B8iQNJEo.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_MHh92wPL.mjs';
import '@astrojs/internal-helpers/path';
import { p as posts, $ as $$Image } from '../../chunks/posts_pboh59Uf.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  return posts.map((post) => ({ params: { slug: post.slug } }));
}
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) {
    throw new Error(`Post not found: ${slug}`);
  }
  const postIndex = posts.findIndex((item) => item.slug === slug);
  const previousPost = posts[postIndex - 1] ?? null;
  const nextPost = posts[postIndex + 1] ?? null;
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": post.title, "description": post.description }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col md:flex-row min-h-screen"> <div class="sidebar bg-transparent p-8 md:fixed md:top-0 md:left-0 md:h-full md:w-[350px] md:overflow-auto"> <header> <h3><a href="/">Stein <br>Chong</a></h3> <h2 class="mt-6">${post.title}</h2> <p class="h2desc">${post.description}</p> </header> </div> <div class="content md:ml-[380px] p-10 flex-1"> <section> <nav class="page-links flex flex-wrap justify-between gap-4 mb-8"> ${previousPost ? renderTemplate`<a${addAttribute(`/posts/${previousPost.slug}`, "href")} class="text-[#f04e30]">&larr; ${previousPost.title}</a>` : null} ${nextPost ? renderTemplate`<a${addAttribute(`/posts/${nextPost.slug}`, "href")} class="text-[#f04e30]">${nextPost.title} &rarr;</a>` : null} </nav> <section id="photos" class="grid gap-4 justify-center"> ${post.images.map((image) => renderTemplate`<figure class="mx-2"> <a${addAttribute(image, "href")} target="_blank" class="block overflow-hidden"> ${renderComponent($$result2, "Image", $$Image, { "src": image, "alt": "", "inferSize": true, "widths": [640, 960, 1200], "sizes": "(min-width: 768px) 50vw, 100vw", "class": "w-full h-auto block", "loading": "lazy" })} <span class="photo-filename"></span> </a> </figure>`)} ${post.details ? renderTemplate`<div class="postdesc mt-8 max-w-full px-2"> <p>${post.details}</p> </div>` : null} </section> </section> </div> </div> <footer>Made by Stein - All rights reserved.</footer> ` })}`;
}, "J:/my website BU/astro migrate test/src/pages/posts/[slug].astro", void 0);

const $$file = "J:/my website BU/astro migrate test/src/pages/posts/[slug].astro";
const $$url = "/posts/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
