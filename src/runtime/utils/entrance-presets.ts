export const entrancePresets = [
  {
    name: 'slide-left',
    modifiers: 'whenVisible.fromInvisible.once.fromTo',
    value: [{ x: -32 }, { x: 0 }],
  },
  {
    name: 'slide-right',
    modifiers: 'whenVisible.fromInvisible.once.fromTo',
    value: [{ x: 32 }, { x: 0 }],
  },
  {
    name: 'slide-top',
    modifiers: 'whenVisible.fromInvisible.once.fromTo',
    value: [{ y: -32 }, { y: 0 }],
  },
  {
    name: 'slide-bottom',
    modifiers: 'whenVisible.fromInvisible.once.fromTo',
    value: [{ y: 32 }, { y: 0 }],
  },
  {
    name: 'scale',
    modifiers: 'whenVisible.fromInvisible.once.fromTo',
    value: [{ scale: 0.75 }, { scale: 1 }],
  },
  {
    name: 'scale-full',
    modifiers: 'whenVisible.fromInvisible.once.fromTo',
    value: [{ scale: 0 }, { scale: 1 }],
  },
  {
    name: 'fade',
    modifiers: 'whenVisible.fromInvisible.once.fromTo',
    value: [{ autoAlpha: 0 }, { autoAlpha: 1 }],
  },
]
