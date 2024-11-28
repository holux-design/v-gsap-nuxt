import { defineNuxtPlugin } from "#app";

type ANIMATION_TYPES = "from" | "to" | "set" | "fromTo" | "call";
import Draggable from "gsap/Draggable";
import TextPlugin from "gsap/TextPlugin";
import { gsap, ScrollTrigger, ScrollToPlugin } from "gsap/all";

export default defineNuxtPlugin((nuxtApp) => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Draggable, TextPlugin);
  let resizeListener;

  nuxtApp.vueApp.directive("gsap", {
    beforeMount(el, binding) {
      binding = loadPreset(binding);
    },

    mounted(el, binding) {
      let timeline;
      if (binding.modifiers.magnetic)
        return addMagneticEffect(el, binding, nuxtApp);

      if (timelineShouldBeActive(binding))
        timeline = mountGSAPDirective(el, binding, nuxtApp);

      resizeListener = window.addEventListener("resize", () => {
        if (!timelineShouldBeActive(binding) && !!timeline)
          timeline = resetAndKillTimeline(timeline);
        if (timelineShouldBeActive(binding) && !timeline)
          timeline = mountGSAPDirective(el, binding, nuxtApp);
      });
    },

    unmounted() {
      removeEventListener("resize", resizeListener);
    },
  });
});

function timelineShouldBeActive(binding) {
  if (binding.modifiers.desktop && window.innerWidth <= breakpoints.md)
    return false;
  if (binding.modifiers.mobile && window.innerWidth > breakpoints.md)
    return false;

  return true;
}

const breakpoints = {
  md: 768,
};

function mountGSAPDirective(el, binding, nuxtApp) {
  const timelineOptions: any = {};

  // Prepare ScrollTrigger if .whenVisible. modifier is present
  // You can overwrite scrollTrigger Props in the value of the directive
  // .once.
  const once = binding.modifiers.call ?? binding.modifiers.once;
  const scrub =
    binding.value?.scrub ??
    binding.value?.[1]?.scrub ??
    (once == true ? false : undefined) ??
    true;
  if (!!binding.modifiers.whenVisible) {
    timelineOptions.scrollTrigger = {
      trigger: el,
      start: binding.value?.start ?? "top 90%",
      end: binding.value?.end ?? "top 50%",
      scrub,
    };
  }

  if (binding.modifiers.parallax) {
    const elHeight = el.getBoundingClientRect().height;
    timelineOptions.scrollTrigger = {
      trigger: el,
      start: `top bottom`,
      end: `bottom top`,
      scrub: true,
    };
  }

  if (binding.modifiers.markers && binding.modifiers.parallax)
    timelineOptions.scrollTrigger.markers = true;
  if (!once && binding.modifiers.parallax)
    timelineOptions.scrollTrigger.toggleActions = "restart none none reverse";

  // .infinitely.
  if (binding.modifiers.infinitely) timelineOptions.repeat = -1;

  // Set up actual timeline
  const timeline = (gsap as any).timeline(timelineOptions);

  if (binding.modifiers.parallax) {
    const [parallaxType, parallaxFactor] = Object.keys(binding.modifiers)
      .find((m) => m.includes("slower") || m.includes("faster"))
      ?.split("-")!;
    const direction = parallaxType == "slower" ? -1 : 1;
    timeline.fromTo(
      el,
      { yPercent: +`${10 * +(parallaxFactor || 5) * direction}` },
      {
        yPercent: +`${10 * +(parallaxFactor || 5) * direction * -1}`,
        ease: "linear",
      }
    );
    // timeline.to(el, { yPercent: +`${10 * +(parallaxFactor || 5) * direction * -1}` })
  }

  // .delay-<milliseconds>. modifier
  const delayKey = Object.keys(binding.modifiers).find((modifier) =>
    modifier.includes("delay")
  );
  if (delayKey) {
    const milliseconds = delayKey.split("-")?.[1] || 500;
    timeline.to("body", { duration: +milliseconds / 1000 });
  }

  // Prepare stagger if .stagger. is present
  // Value defaults to 0.2, but can be set in the values
  // .stagger.
  const stagger = binding.modifiers.stagger
    ? binding.value?.stagger ?? binding.value?.[1]?.stagger ?? "0.2"
    : false;
  if (binding.modifiers.stagger) el = el.children;

  // Setup actual animation step // Respects stagger if set
  const animationType: ANIMATION_TYPES = Object.keys(binding.modifiers).find(
    (modifier) => ["to", "from", "set", "fromTo", "call"].includes(modifier)
  ) as ANIMATION_TYPES;
  if (animationType == "to") timeline.to(el, { ...binding.value, stagger });
  if (animationType == "set") timeline.set(el, { ...binding.value, stagger });
  if (animationType == "from") timeline.from(el, { ...binding.value, stagger });

  // .fromTo=
  if (animationType == "fromTo") {
    const values: any[] = binding.value;
    if (binding.modifiers.stagger) values[1].stagger = stagger;
    timeline.fromTo(el, ...binding.value);
  }

  // .animateText. // .slow // .fast
  if (binding.modifiers.animateText) {
    // if text is inside element => use it as value and then empty it for animation
    const value = binding.value || el.innerText;
    if (el.innerText) el.innerText = "";

    const speeds = {
      slow: 0.5,
      fast: 10,
    };
    let speed =
      speeds[
        Object.keys(binding.modifiers).find((modifier) =>
          Object.keys(speeds).includes(modifier)
        ) || ""
      ] || 2;
    timeline.to(el, { text: { value, speed } });
  }

  // .whileHover.
  if (binding.modifiers.whileHover) {
    timeline.pause();
    el.addEventListener("mouseenter", () => timeline.play());
    el.addEventListener("mouseout", () => {
      if (binding.modifiers.noReverse) timeline.time(0).pause();
      else timeline.play().reverse();
    });
  }

  // .call=""
  if (animationType == "call") {
    timeline.call(binding.value);
  }

  // .draggable. // .x // .y // .rotation // .bounds (="")
  if (binding.modifiers.draggable) {
    let type = Object.keys(binding.modifiers).find((modifier) =>
      ["x", "y", "rotation"].includes(modifier)
    ) as any;
    Draggable.create(el, {
      type,
      bounds: binding.value || el.parentElement,
    });
  }

  return timeline;
}

function addMagneticEffect(el, binding, nuxtApp) {
  const strengthModifiers = {
    weak: 0.5,
    weaker: 0.75,
    stronger: 1.5,
    strong: 2,
  };

  const isHovering = ref(false);
  const handleMouseMove = (e: MouseEvent) => {
    if (el) {
      const { width, height, left, top } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const strengthFactor =
        Object.entries(strengthModifiers).find(
          (entry) => binding.modifiers[entry[0]]
        )?.[1] || 1;

      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const magneticDistance = ((width + height) / 2) * (strengthFactor / 1.5); // Distance for magnetic attraction
      const attractionStrength = 0.45 * strengthFactor; // Magnetic strength

      if (distance < magneticDistance) {
        const strength = 1 - distance / magneticDistance;
        gsap.to(el, {
          x: deltaX * strength * attractionStrength,
          y: deltaY * strength * attractionStrength,
          duration: 0.2,
        });
        isHovering.value = true;
      } else {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.3,
        });
        isHovering.value = false;
      }
    }
  };

  window.addEventListener("mousemove", handleMouseMove);
}

function resetAndKillTimeline(timeline) {
  timeline?.restart(false, true);
  timeline?.kill();
  return undefined;
}

function loadPreset(binding) {
  // Load Preset if .preset. modifier is set
  if (binding.modifiers.preset) {
    const preset = PRESETS.find((preset) => preset.name == binding.value);
    if (!!preset) {
      preset.modifiers
        .split(".")
        .forEach((modifier) => (binding.modifiers[modifier] = true));
      if (preset.value) binding.value = preset.value;
    }
  }
  return binding;
}
