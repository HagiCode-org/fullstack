import { hookProps } from "./hooks"

interface HomeSloganProps {
  lead: string
  hero: string
  sub: string
  purpose: string
}

// The home page's one h1: the slogan "Zero to Hero with AI, for everyone". The hero word is drawn twice, as an outline and
// as a Link Blue copy clipped from the left by --hero-fill, which ProgressRuntime sets from the lessons read across every
// course. The copy is hidden from assistive technology; the count under the purpose line says the same thing in words.
// Without script the fill stays at zero, which is the honest state for a first visit.
export function HomeSlogan({ lead, hero, sub, purpose }: HomeSloganProps) {
  return (
    <div>
      <h1 className="home-hero__title" data-state="idle" {...hookProps("heroMeter")}>
        <span className="home-hero__lead">{lead}</span>
        <span className="home-hero__word">
          <span className="home-hero__base">{hero}</span>
          <span aria-hidden="true" className="home-hero__fill">
            {hero}
          </span>
        </span>
      </h1>
      <p className="mt-5 mb-0 max-w-[34rem] text-xl leading-snug font-semibold text-foreground text-pretty">{sub}</p>
      <p className="mt-3 mb-0 max-w-[34rem] text-base text-pretty">{purpose}</p>
      <p className="mt-4 mb-0 text-sm text-foreground tabular-nums" hidden {...hookProps("heroStatus")} />
    </div>
  )
}
