import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, type ReactNode } from "react";
import { cn } from "~/cn";
import { usePrefersReducedMotion } from "~/usePrefersReducedMotion";

export function Box(props: {
  children: ReactNode;
  variant?: "mild" | "regular";
  as?: "div" | "main";
}) {
  const Element = props.as ?? "div";
  const textContentRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useGSAP(() => {
    if (reduceMotion) return;
    const tl = gsap.timeline();
    tl.fromTo(
      textContentRef.current,
      { opacity: 0.1 },
      { opacity: 0.1, duration: 1.55 }
    );
    tl.to(textContentRef.current, {
      opacity: 1,
      ease: "elastic.out",
      duration: 2,
    });
  });
  return (
    <Element className="box w-full sm:max-w-xl lg:max-w-2xl relative mx-auto p-7 sm:p-10  animate-fade-in fade-in-delay text-slate-300 max-w-full  rounded-none sm:rounded-2xl overflow-hidden">
      <div
        className={cn(
          props.variant === "mild" && "opacity-50",
          props.variant !== "mild" && "opacity-80",
          "absolute inset-0 bg-slate-900/10 backdrop-blur-sm"
        )}
      />
      <div
        className={cn(
          "absolute inset-0 opacity-15",
          props.variant === "mild" && "opacity-5!"
        )}
        style={{
          background:
            "url(https://grainy-gradients.vercel.app/noise.svg)",
        }}
      />
      <div
        className="flex w-full flex-col gap-4 z-10 relative"
        ref={textContentRef}
      >
        {props.children}
      </div>
    </Element>
  );
}
