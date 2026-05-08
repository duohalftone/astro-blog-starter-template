/* empty css                                 */
import { c as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B8iQNJEo.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_MHh92wPL.mjs';
export { renderers } from '../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  const title = "About Stein Chong";
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": title, "description": "About Stein Chong" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col md:flex-row min-h-screen"> <div class="sidebar bg-transparent p-8 md:fixed md:top-0 md:left-0 md:h-full md:w-[350px] md:overflow-auto"> <header> <a href="/" class="inline-block"> <h1>Stein <br>Chong</h1> </a> </header> </div> <div class="content max-w-3xl md:ml-[380px] p-10 flex-1 space-y-6"> <p class="text-sm italic text-white/80">work in progress...</p> <h1 class="text-4xl font-semibold">A little about me.</h1> <p>
Name: Stein Chong <br>
Sex: Human dude <br>
Age: Oldest Gen-Z, youngest Millennial <br>
Race: Legally and genetically Kadazan Sino, technically Chinese <br>
Nationality: Monyet <br>
Born and raised: Kota Kinabalu, Sabah <br>
Slept and ate: Penampang, Sabah <br>
Address: Surviving in Subang Jaya, Selangor <br>
Occupation: Wished to be a scientist, studied graphic design, worked as a print maker, sitting at home as a direct-to-print artist, hoping to have a small, simple life to the end.
</p> <p>
As you can see, I dabble in photography but I like to do other things as well. Making stuff is what I enjoy doing. Zines, bookmaking, analog film photography, developing them myself, trying to do editing and sequencing, graphic design and maybe some more...
</p> <p>
This website too! Trying to do HTML and CSS when the last time I touched it was my college years (which is almost 10 years ago now) is kinda challenging but fun and rewarding too.
</p> <p>
Why a website? Social platforms has been burning me out and huge corpos scraping everyone's data just for their own gain is just painful to just accept and live with it. I can put up whatever I want and whenever I like.
</p> <p> <a href="https://www.instagram.com/steinstreet/">@steinstreet</a> <br>
Instagram if you prefer DMs. <br>
(But don't expect instant replies due to me being a very cautious person and the amount of spam I receive there.)
</p> </div> </div> <footer>Made by Stein - All rights reserved.</footer> ` })}`;
}, "J:/my website BU/astro migrate test/src/pages/about.astro", void 0);

const $$file = "J:/my website BU/astro migrate test/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
