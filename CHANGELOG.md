# Changelog

## v1.3.3

- moved composable to plugin.ts
- added "Adding GSAP Plugins" to docs

[compare changes](https://github.com/holux-design/v-gsap-nuxt/compare/v1.3.2...v1.3.3)

### 🩹 Fixes

- Typo in docs
  ([a8930ea](https://github.com/holux-design/v-gsap-nuxt/commit/a8930ea))

### ❤️ Contributors

- Corentin Hervaud ([@Curs3W4ll](http://github.com/Curs3W4ll))

## v1.3.2

[compare changes](https://github.com/holux-design/v-gsap-nuxt/compare/v1.3.1...v1.3.2)

## v1.3.1

- added `.onState-` functionality

[compare changes](https://github.com/holux-design/v-gsap-nuxt/compare/v1.2.10...v1.3.1)

### 🏡 Chore

- Bump version
  ([d7fb32f](https://github.com/holux-design/v-gsap-nuxt/commit/d7fb32f))

### ❤️ Contributors

- Holux-design <office@holux-design.at>

## v1.2.2

- merged [PR #6](https://github.com/holux-design/v-gsap-nuxt/pull/6) by
  [davidparys](https://github.com/davidparys):
  - `.once` reverted to "really only once"
  - added `.once.reversible` that replays every single entrance

[compare changes](https://github.com/holux-design/v-gsap-nuxt/compare/v1.2.1...v1.2.2)

### 🩹 Fixes

- Lint ([c97b55d](https://github.com/holux-design/v-gsap-nuxt/commit/c97b55d))

### ❤️ Contributors

- Holux-design <office@holux-design.at>
- [davidparys](https://github.com/davidparys)

## v1.2.1

- separated plugin code from nuxt module loader to allow for Vue support + docs
  page "Vue only"

[compare changes](https://github.com/holux-design/v-gsap-nuxt/compare/v1.2.0...v1.2.1)

### 🩹 Fixes

- **vue:** Add export to package.json for /vue
  ([21f2c36](https://github.com/holux-design/v-gsap-nuxt/commit/21f2c36))

### ❤️ Contributors

- Holux-design <office@holux-design.at>

## v1.2.0

[compare changes](https://github.com/holux-design/v-gsap-nuxt/compare/v1.1.9...v1.2.0)

### 🚀 Enhancements

- **vue:** Separate plugin code from defineNuxtPlugin
  ([e36c6d2](https://github.com/holux-design/v-gsap-nuxt/commit/e36c6d2))
- **vue:** Add vue plugin function
  ([7632a05](https://github.com/holux-design/v-gsap-nuxt/commit/7632a05))

### 🩹 Fixes

- **vue:** Linting tips
  ([a03112b](https://github.com/holux-design/v-gsap-nuxt/commit/a03112b))
- **vue:** Re-init gsap context inside separated directive
  ([673ac26](https://github.com/holux-design/v-gsap-nuxt/commit/673ac26))

### ❤️ Contributors

- Holux-design <office@holux-design.at>

## v1.1.9

[compare changes](https://github.com/holux-design/v-gsap-nuxt/compare/v1.1.8...v1.1.9)

### 🩹 Fixes

- Gsap context adding
  ([3282dc0](https://github.com/holux-design/v-gsap-nuxt/commit/3282dc0))

### ❤️ Contributors

- Holux-design <office@holux-design.at>

## v1.1.8

- reverse `.once` on upscroll (allows for being played every time the element
  comes into view)

[compare changes](https://github.com/holux-design/v-gsap-nuxt/compare/v1.1.7...v1.1.8)

## v1.1.7

- add `.entrance` animations
- Philosophy-Page updated
- added robots.txt to docs
-

[compare changes](https://github.com/holux-design/v-gsap-nuxt/compare/v1.1.6...v1.1.7)

### 🩹 Fixes

- Lints ([76e49dd](https://github.com/holux-design/v-gsap-nuxt/commit/76e49dd))
- Typo in docs
  ([bfef697](https://github.com/holux-design/v-gsap-nuxt/commit/bfef697))

### ❤️ Contributors

- Holux-design <office@holux-design.at>

## v1.1.6

- added composable `useGSAP()` with according `nuxt.config` and docs page

[compare changes](https://github.com/holux-design/v-gsap-nuxt/compare/v1.1.5...v1.1.6)

## v1.1.5

- added 'scroller' option to `nuxt.config`

[compare changes](https://github.com/holux-design/v-gsap-nuxt/compare/v1.1.4...v1.1.5)

### 💅 Refactors

- Feature "scroller" // add to docs // add global config
  ([e923c27](https://github.com/holux-design/v-gsap-nuxt/commit/e923c27))

### ❤️ Contributors

- Holux-design <office@holux-design.at>

## v1.1.4

- fix: `.markers`
- add support for `scroller` property
- Textflow example in playground
- add callbacks for `.timeline`
- improvement: debouncing for resize listener

[compare changes](https://github.com/holux-design/v-gsap-nuxt/compare/v1.1.3...v1.1.4)

### 🩹 Fixes

- Mobile startpage breaking due to overlong code snippet
  ([69748e4](https://github.com/holux-design/v-gsap-nuxt/commit/69748e4))
- Lint ([82f8da8](https://github.com/holux-design/v-gsap-nuxt/commit/82f8da8))

### ❤️ Contributors

- Holux-design <office@holux-design.at>

## v1.1.3

[compare changes](https://github.com/holux-design/v-gsap-nuxt/compare/v1.1.2...v1.1.3)

### 🩹 Fixes

- .pinned not working correctly on mobile (ios)
  ([7839c2e](https://github.com/holux-design/v-gsap-nuxt/commit/7839c2e))

### ❤️ Contributors

- Holux-design <office@holux-design.at>

## v1.1.2

[compare changes](https://github.com/holux-design/v-gsap-nuxt/compare/v1.1.1...v1.1.2)

## v1.1.1

[compare changes](https://github.com/holux-design/v-gsap-nuxt/compare/v1.0.9...v1.1.1)

### 🩹 Fixes

- Preset ([ca43f58](https://github.com/holux-design/v-gsap-nuxt/commit/ca43f58))
- Lint errors
  ([2302c00](https://github.com/holux-design/v-gsap-nuxt/commit/2302c00))
- Build cmd for docs (order)
  ([870478a](https://github.com/holux-design/v-gsap-nuxt/commit/870478a))
- Shiki // add playground redirect
  ([bd6f679](https://github.com/holux-design/v-gsap-nuxt/commit/bd6f679))
- Lint ([2cb4c02](https://github.com/holux-design/v-gsap-nuxt/commit/2cb4c02))

### 🏡 Chore

- **release:** V1.0.1
  ([2938044](https://github.com/holux-design/v-gsap-nuxt/commit/2938044))
- **release:** V1.0.2
  ([62a4682](https://github.com/holux-design/v-gsap-nuxt/commit/62a4682))

### ❤️ Contributors

- Holux-design <office@holux-design.at>

## v1.0.2

[compare changes](https://github.com/holux-design/v-gsap-nuxt/compare/v1.0.9...v1.0.2)

### 🩹 Fixes

- Preset ([ca43f58](https://github.com/holux-design/v-gsap-nuxt/commit/ca43f58))
- Lint errors
  ([2302c00](https://github.com/holux-design/v-gsap-nuxt/commit/2302c00))
- Build cmd for docs (order)
  ([870478a](https://github.com/holux-design/v-gsap-nuxt/commit/870478a))
- Shiki // add playground redirect
  ([bd6f679](https://github.com/holux-design/v-gsap-nuxt/commit/bd6f679))
- Lint ([2cb4c02](https://github.com/holux-design/v-gsap-nuxt/commit/2cb4c02))

### 🏡 Chore

- **release:** V1.0.1
  ([2938044](https://github.com/holux-design/v-gsap-nuxt/commit/2938044))

### ❤️ Contributors

- Holux-design <office@holux-design.at>

## v1.0.1

[compare changes](https://github.com/holux-design/v-gsap-nuxt/compare/v1.0.9...v1.0.1)

### 🩹 Fixes

- Preset ([ca43f58](https://github.com/holux-design/v-gsap-nuxt/commit/ca43f58))
- Lint errors
  ([2302c00](https://github.com/holux-design/v-gsap-nuxt/commit/2302c00))
- Build cmd for docs (order)
  ([870478a](https://github.com/holux-design/v-gsap-nuxt/commit/870478a))
- Shiki // add playground redirect
  ([bd6f679](https://github.com/holux-design/v-gsap-nuxt/commit/bd6f679))
- Lint ([2cb4c02](https://github.com/holux-design/v-gsap-nuxt/commit/2cb4c02))

### ❤️ Contributors

- Holux-design <office@holux-design.at>

## v1.0.9

[compare changes](https://github.com/holux-design/v-gsap-nuxt/compare/v1.0.8...v1.0.9)

## v1.0.8

[compare changes](https://github.com/holux-design/v-gsap-nuxt/compare/v1.0.7...v1.0.8)

## v1.0.7

[compare changes](https://github.com/holux-design/v-gsap-nuxt/compare/v1.0.6...v1.0.7)

## v1.0.6

[compare changes](https://github.com/holux-design/v-gsap-nuxt/compare/v1.0.5...v1.0.6)

## v1.0.5

[compare changes](https://github.com/holux-design/v-gsap-nuxt/compare/v1.0.4...v1.0.5)

### 🩹 Fixes

- Og-image
  ([3c38017](https://github.com/holux-design/v-gsap-nuxt/commit/3c38017))
- Lint errors
  ([fa4ccb7](https://github.com/holux-design/v-gsap-nuxt/commit/fa4ccb7))

### ❤️ Contributors

- Holux-design <office@holux-design.at>

## v1.0.4

[compare changes](https://github.com/holux-design/v-gsap-nuxt/compare/v1.0.3...v1.0.4)

## v1.0.3

[compare changes](https://github.com/holux-design/v-gsap-nuxt/compare/v1.0.2...v1.0.3)

## v1.0.2

[compare changes](https://github.com/holux-design/v-gsap-nuxt/compare/v1.0.1...v1.0.2)

### 🩹 Fixes

- Ref is not defined on run
  ([1fcb94b](https://github.com/holux-design/v-gsap-nuxt/commit/1fcb94b))

### ❤️ Contributors

- Holux-design <office@holux-design.at>

## v1.0.1

### 🩹 Fixes

- Lint issues before initial release
  ([0c6e012](https://github.com/your-org/my-module/commit/0c6e012))
- Failing test due to missing prepare cmd
  ([3b67aa0](https://github.com/your-org/my-module/commit/3b67aa0))

### ❤️ Contributors

- Holux-design <office@holux-design.at>
