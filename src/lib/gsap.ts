"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, CustomEase);
  // The long, soft ease used for every reveal: cubic-bezier(.2,.7,.1,1)
  CustomEase.create("lux", "0.2,0.7,0.1,1");
  // The mobile URL bar showing and hiding resizes the viewport; do not
  // refresh (and so jump) the page when that happens.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, CustomEase };
