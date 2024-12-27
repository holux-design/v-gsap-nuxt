export const entrancePresets = [
  {
    name: "slide-left",
    modifiers: "whenVisible.fromInvisible.once.from",
    value: { x: -32 },
  },
  {
    name: "slide-right",
    modifiers: "whenVisible.fromInvisible.once.from",
    value: { x: 32 },
  },
  {
    name: "slide-top",
    modifiers: "whenVisible.fromInvisible.once.from",
    value: { y: -32 },
  },
  {
    name: "slide-bottom",
    modifiers: "whenVisible.fromInvisible.once.from",
    value: { y: 32 },
  },
  {
    name: "scale",
    modifiers: "whenVisible.fromInvisible.once.from",
    value: { scale: 0.75 },
  },
  {
    name: "scale-full",
    modifiers: "whenVisible.fromInvisible.once.from",
    value: { scale: 0 },
  },
  {
    name: "fade",
    modifiers: "whenVisible.fromInvisible.once.to",
    value: { autoAlpha: 1 },
  },
];
