import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addImports,
  addComponent,
} from '@nuxt/kit'
import { defu } from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {
  [key: string]: any
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'v-gsap-nuxt',
    configKey: 'vgsap',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)
    _nuxt.options.runtimeConfig.public.vgsap = defu(
      _nuxt.options.runtimeConfig.public.vgsap as any,
      {
        ..._options,
      },
    )

    _nuxt.options.css.push(resolver.resolve('./runtime/styles/vgsap.css'))

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/nuxt'))

    if (
      (_nuxt.options.runtimeConfig.public.vgsap as any)?.composable != false
    ) {
      addImports({
        name: 'useGSAP',
        as: 'useGSAP',
        from: resolver.resolve('runtime/plugin'), // load composable from plugin
      })
      addImports({
        name: 'useScrollTrigger',
        as: 'useScrollTrigger',
        from: resolver.resolve('runtime/plugin'),
      })
      addImports({
        name: 'useGlobalTimelines',
        as: 'useGlobalTimelines',
        from: resolver.resolve('runtime/plugin'),
      })
    }

    addComponent({
      name: 'GSAPTransition',
      filePath: resolver.resolve('./runtime/components/GSAPTransition.vue'),
    })
  },
})
