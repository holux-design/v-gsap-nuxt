<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: my-module
- Description: My new Nuxt module
-->

# v-gsap

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

My new Nuxt module for doing amazing things.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
  <!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/my-module?file=playground%2Fapp.vue) -->
  <!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add holux/v-gsap-nuxt
```

That's it! You can now use My Module in your Nuxt app ✨

## Features

You can use `v-gsap` to define animations inline. See this example:

```
<div v-gsap.to="{ x: 50 }"></div>
```

This supports `.from`, `.to`, `.set`, `.call` and `.fromTo`, where `.fromTo` takes an array of two animation property Objects like so:

```
v-gsap.fromTo="[{ x: 0 }, { x: 50 }]"
```

⚠️ `.call` automatically includes `.once.` and only runs a single time. It takes a function as value like `.. .whenVisible.call="() => doStuff()"`

However, there are more modifiers to use:

- `.whenVisible.`
  - enables scrollTrigger. It defaults to from `top 90%` to `top 50%` and `scrub`
  - you can overwrite these properties in the values Object. In `.fromTo` its the second object
  - `.once.`: allows to run the scrollTrigger only once
  - `.markers.`: Adds markers for development. They are only shown when NODE_ENV is `development`, so they wont make it to production
- `.parallax.`
  - enables parallax effect for this element. Brings its own scrollTrigger, therefore doesn't need extra `.whenVisible.`.
  - Only works with a speed settings like:
  - `.slower-<integer>`: Element scrolls slower than the page.
  - `.faster-<integer>`: Element scrolls faster than the page.
  - The value is a multiplier of 10% element height. E.g. `.slower-5` scrolls the element from +-50% to +-50% height.
  - If the value is left out, default is `5`. Meaning: `.slower` defaults to `.slower-5` (same with faster)
- `.stagger.`
  - enables stagger for immediate children. Duration can be overwritten in the values Object. In `.fromTo` its the second object
- `.infinitely.`
  - This sets the repeat of the timeline to `-1` to infinitely repeat the animation
- `.delay-<milliseconds>.`
  - can be added to delay the action for n milliseconds like `.delay-500.`
  - separated by a minus, any integer value will be accepted, like `.delay-1234.`
  - Keep in mind that this can cause logical problems with `.whenVisible.` since it would just squeeze the following actual animation
- `.whileHover.`
  - lets you define a hover animation
  - Modifier `.noReverse.` can be used for a one-way hover effect - otherwise animation will be reversed on leave
  - is (logically) incompatible with `.whenVisible.`, therefore shoud used only by itself like: `v-gsap.whileHover.to=""`
- `.draggable.`
  - Allows the element to be draggable
  - Modifiers `.x`, `.y` and `.rotation` allow to restrict the type, e.g. `v-gsap.draggable.x`
  - Modifier `.bounds` restricts the container. If left empty like `.draggable.bounds` it uses the parent. Otherwise a querySelector can be passed like `.draggable.bounds="'.someContainer'"`
- `.animateText.`
  - Animates Text letter by letter
  - It can either take a text as value like so `v-gsap.animateText="'Das ist ein Text'"`
  - Or if no value is given, it takes the innerText from the element like so `<div v-gsap.animateText> Innerer Text </div>`
  - Modifiers `.slow` and `.fast` change the typing speed. Example `v-gsap.animateText.slow="'Das ist ein Text'"`
- `.magnetic`
  - Makes an element be magnetically attracted to the cursor
  - Supports modifiers `.stronger`, `.strong`, `.weaker`, `.weak`, where e.g. "weak" is the weakest, while "weakER" is only slightly weaker than normal
- `.mobile.` or `.desktop.`
  - with these you can specify the viewport on which the animation shall take place.
  - Window resizing is handled automatically.
  - Breakpoint is 768px, as taken from `tailwind.config`
  - `.mobile.` only runs the animation below 768px
  - `.desktop.` only runs the animation above 768px
  - You can combine both. Simply use both `v-gsap.mobile.` AND `v-gsap.desktop.` on the same element.
- `.preset.`
  - To use an animation multiple times you can define presets in `~/app/presets/GSAPDirectivePresets.ts`
  - Each preset has a `name`, `modifiers` and `value` (optional). This allows to prewrite the same logic as in the HTML
  - Example:
    ```
    {
       name: 'fade-in-left',
       modifiers: 'whenVisible.from',
       value: { autoAlpha: 0, x: -32 },
    }
    ```
    Then use it like
    ```
    v-gsap.preset="'fade-in-left'"
    ```

Here's a full example of a list with scrolltrigger and stagger:

```
<ul v-gsap.whenVisible.stagger.fromTo="[{ x: 0, opacity: 0 }, { x: 50, opacity: 1 }]">
	<li>Option 1</li>
	<li>Option 2</li>
	<li>Option 3</li>
	<li>Option 4</li>
</ul>
```

`TIPP:` A useful example of a scrollTriggered Entrance Animation is:

```
v-gsap.whenVisible.from="{ x: -50, opacity: 0 }"
```

`TIPP:` You can initially hide an element with `initial-hidden` like `<div initial-hidden>`. This applies `opacity: 0`

If you need to make changes to the original code or find a bug, you can edit the code in `~/plugins/GSAPDirective.ts`

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/my-module/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/my-module
[npm-downloads-src]: https://img.shields.io/npm/dm/my-module.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/my-module
[license-src]: https://img.shields.io/npm/l/my-module.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/my-module
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
