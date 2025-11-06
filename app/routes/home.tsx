import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import MorphSVGPlugin from "gsap/dist/MorphSVGPlugin";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import {
  memo,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  BiAccessibility,
  BiBarChart,
  BiSolidCog,
  BiSolidLayout,
  BiSolidParty,
  BiStar,
  BiText,
} from "react-icons/bi";
import { Box } from "~/Box";
import { cn } from "~/cn";
import { Header } from "~/Header";
import { usePrefersReducedMotion } from "~/usePrefersReducedMotion";
import type { Route } from "./+types/home";

gsap.registerPlugin(MorphSVGPlugin);
gsap.registerPlugin(ScrollTrigger);

const pageDescription =
  "Jeg utvikler brukergrensesnitt. Har du lyst på en modal? Noen knapper? Hva med en sykt kul nettside for bedriften din? Det kan jeg hjelpe deg med! Tidligere har jeg arbeidet på prosjekter sammen med kunder som Telenor og Neddi. Jeg har spesialisert meg på frontend nettutvikling og brukererfaring.";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ryfylke React" },
    {
      name: "description",
      content: pageDescription,
    },
    {
      name: "title",
      property: "og:title",
      content: "Ryfylke React",
    },
    {
      name: "image",
      property: "og:image",
      content: "https://ryfylke.dev/static/og-image.jpg",
    },
    {
      name: "url",
      property: "og:url",
      content: "https://ryfylke.dev",
    },
    {
      name: "description",
      property: "og:description",
      content: pageDescription,
    },
  ];
}

export default function Home() {
  const ref = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();
  const [mouseAnimationEnabled, setMouseAnimationEnabled] =
    useState(false);

  useEffect(() => {
    const timer = setTimeout(
      () => setMouseAnimationEnabled(true),
      2500
    );
    return () => clearTimeout(timer);
  }, []);

  useGSAP(
    () => {
      if (!mouseAnimationEnabled) return;
      if (!mouse.x && !mouse.y) return;
      const xPercent =
        ((mouse.x ?? 1) / window.innerWidth) * 100;
      const yPercent =
        ((mouse.y ?? 1) / window.innerHeight) * 100;
      const percent = Math.max(xPercent, yPercent);
      const adjustedForSwing = percent - 50;
      const adjustedForIntensity = adjustedForSwing * 0.1;
      const scale = 1 + adjustedForSwing * 0.002;

      gsap.to(ref.current, {
        rotate: adjustedForIntensity,
        duration: 2,
        scale,
        opacity: scale * 0.1,
      });

      gsap.to("#topFadeDecor", {
        scale: Math.max(1, scale),
      });
    },
    {
      dependencies: [mouse.x, mouse.y, mouseAnimationEnabled],
    }
  );

  useGSAP(
    () => {
      const items =
        document.querySelectorAll<HTMLDivElement>(".icon-box");
      items.forEach((item, index) => {
        const isEven = index % 2 === 0;
        gsap
          .timeline({
            scrollTrigger: {
              trigger: item,
              start: "top 95%",
              end: "+=100px",
              scrub: 0.9,
            },
          })
          .from(item, {
            opacity: 0,
            scale: 0.8,
            translateX: isEven ? 20 : -20,
            rotate: isEven ? -5 : 5,
          });
      });
    },
    {
      scope: containerRef.current ?? undefined,
    }
  );
  return (
    <div
      ref={containerRef}
      className="flex w-full flex-col h-full min-h-screen"
    >
      <BackgroundDecor />
      <Header logoRef={ref} />
      <div className="flex flex-col w-full sm:gap-12 gap-0">
        <Box as="main">
          <BoxHeader icon="👨🏻‍🎨">
            Jeg lager brukergrensesnitt
          </BoxHeader>
          <Text>
            Har du lyst på en modal? Noen knapper? Hva med en
            sykt kul nettside for bedriften din? Det kan jeg
            hjelpe deg med!
          </Text>
          <Text>
            Tidligere har jeg arbeidet på prosjekter sammen med
            kunder som{" "}
            <ExternalLink href="https://www.telenor.no/">
              Telenor
            </ExternalLink>{" "}
            og{" "}
            <ExternalLink href="https://neddi.no">
              Neddi
            </ExternalLink>
            . Jeg har spesialisert meg på frontend nettutvikling
            og brukererfaring.
          </Text>
          <Text>
            Jeg har vært med på å løse utfordringer som omfatter
            tema som...
          </Text>
          <ul className="grid grid-cols-2 lg:grid-cols-3 -m-3 mt-0 gap-3 text-xs sm:text-base  opacity-50 text-slate-50">
            <li className="icon-box p-4 flex flex-col items-center justify-center gap-2 bg-slate-950/20 font-semibold text-center rounded-md">
              <BiBarChart className="w-10 h-10 opacity-50" />
              Data Visualisering
            </li>
            <li className="icon-box p-4 flex flex-col items-center justify-center gap-2 bg-slate-950/20 font-semibold text-center rounded-md">
              <BiSolidLayout className="w-10 h-10 opacity-50" />
              Brukerflyt & Design
            </li>
            <li className="icon-box p-4 flex flex-col items-center justify-center gap-2 bg-slate-950/20 font-semibold text-center rounded-md">
              <BiText className="w-10 h-10 opacity-50" />
              Multi-språk & Oversettelser
            </li>
            <li className="icon-box p-4 flex flex-col items-center justify-center gap-2 bg-slate-950/20 font-semibold text-center rounded-md">
              <BiSolidCog className="w-10 h-10 opacity-50" />
              Refaktorering & Skalering
            </li>
            <li className="icon-box p-4 flex flex-col items-center justify-center gap-2 bg-slate-950/20 font-semibold text-center rounded-md">
              <BiAccessibility className="w-10 h-10 opacity-50" />
              Tilgjengelighet
            </li>
            <li className="relative icon-box p-4 flex flex-col items-center justify-center gap-2 bg-slate-950/20 font-semibold text-center rounded-md">
              <BiSolidParty className="w-10 h-10 opacity-50" />
              Polering
              <Stars />
            </li>
          </ul>
        </Box>
        <Box variant="mild">
          <BoxHeader icon="✉️">Ta kontakt</BoxHeader>
          <Text>
            Du når meg på epost:{" "}
            <Link
              href="mailto:hakon@ryfylke.dev"
              className="gold"
            >
              hakon@ryfylke.dev
            </Link>
            .<br />
            <span className="text-sm lg:text-base opacity-80">
              Ryfylke React AS befinner seg i Suldal Kommune.
            </span>
          </Text>
          <ul
            className="flex items-center gap-2 opacity-70 text-base flex-wrap"
            aria-label="Sosiale linker"
          >
            <li className="flex items-center gap-2">
              <ExternalLink href="https://www.linkedin.com/company/ryfylke-react-as/">
                LinkedIn
              </ExternalLink>
              <span aria-hidden="true">•</span>
            </li>
            <li className="flex items-center gap-2">
              <ExternalLink href="https://haakon.dev">
                Portfolio
              </ExternalLink>
              <span aria-hidden="true">•</span>
            </li>
            <li className="flex items-center gap-2">
              <ExternalLink href="https://github.com/ryfylke-react-as">
                Github
              </ExternalLink>
              <span aria-hidden="true">•</span>
            </li>
            <li className="flex items-center gap-2">
              <ExternalLink href="https://www.npmjs.com/org/ryfylke-react">
                NPM
              </ExternalLink>
            </li>
          </ul>
        </Box>
      </div>
      <svg height={1} width={1} aria-hidden="true">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
      </svg>
      <div className="sm:h-24" />
    </div>
  );
}

const Stars = memo(() => {
  const [renderCount, rerender] = useState(0);
  useGSAP(
    () => {
      document.querySelectorAll(".star").forEach((star, i) => {
        const tl = gsap.timeline({
          repeat: 20,
          repeatDelay: getRandomArbitrary(1, 2.5),
          delay: i * getRandomArbitrary(0.3, 0.6),
        });
        tl.fromTo(
          star,
          {
            opacity: 0,
            scale: 0,
            translateX: 0,
            translateY: 0,
          },
          {
            opacity: 0.3,
            scale: 1,
            rotate: 180,
            ease: "expo.out",
            duration: 0.3,
          }
        );
        tl.to(star, {
          opacity: 0,
          scale: 0,
          rotate: -180,
          ease: "circ.inOut",
          duration: 0.3,
        });
      });
    },
    { dependencies: [] }
  );

  useEffect(() => {
    const interval = setInterval(
      () => rerender((p) => p + 1),
      3300
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <BiStar
        style={{
          top: `${getRandomArbitrary(10, 60)}px`,
          left: `${getRandomArbitrary(10, 60)}px`,
        }}
        className="star opacity-0 absolute  h-2 w-2 shadow-sm"
      />
      <BiStar
        style={{
          top: `${getRandomArbitrary(-10, 30)}px`,
          right: `${getRandomArbitrary(10, 60)}px`,
        }}
        className="star opacity-0 absolute  h-2 w-2 shadow-sm"
      />
    </>
  );
});

function BoxHeader(props: {
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <h2 className="font-extrabold text-2xl sm:text-3xl opacity-90 text-orange-50">
      {props.icon ? (
        <span
          className="select-none opacity-50 scale-80 -rotate-3 inline-block mr-2"
          aria-hidden="true"
          style={{ animationDuration: "4s" }}
        >
          {props.icon}{" "}
        </span>
      ) : null}
      {props.children}
    </h2>
  );
}

function Text(props: { children: ReactNode }) {
  return (
    <p className="text-base sm:text-lg opacity-70 text-slate-50">
      {props.children}
    </p>
  );
}

function ExternalLink(props: {
  children: ReactNode;
  href: string;
}) {
  return (
    <a
      className="text-slate-400 underline hover:no-underline cursor-pointer"
      target="_blank"
      href={props.href}
    >
      {props.children}
    </a>
  );
}

function Link(props: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <a
      href={props.href}
      className={cn(
        "text-orange-200 underline hover:no-underline cursor-pointer",
        props.className
      )}
    >
      {props.children}
    </a>
  );
}

function BackgroundDecor() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useGSAP(() => {
    if (prefersReduced) return;
    const tl = gsap.timeline();
    tl.fromTo(
      spotlightRef.current,
      { opacity: 0 },
      { opacity: 0, duration: 1.5 }
    );
    tl.to(spotlightRef.current, {
      opacity: 1,
      duration: 2,
      ease: "elastic.out",
    });
  });
  return (
    <>
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 z-0 origin-top"
          id="topFadeDecor"
          ref={spotlightRef}
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255, 219, 120, 0.25), transparent 70%), #000000",
          }}
        />
      </div>
      <div
        className="absolute inset-0 top-2 opacity-40  bg-gray-900"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `
        linear-gradient(to right, var(--color-gray-800) 1px, transparent 1px),
        linear-gradient(to bottom, var(--color-gray-800) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>
    </>
  );
}

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({
    x: null as null | number,
    y: null as null | number,
  });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener(
        "mousemove",
        updateMousePosition
      );
    };
  }, []);

  return mousePosition;
};

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
