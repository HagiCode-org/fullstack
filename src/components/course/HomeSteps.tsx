import { CircleCheckIcon, CircleIcon } from "lucide-react"

interface HomeStepsProps {
  heading: string
  steps: string[]
}

// How the site works, as a track of read markers that tick themselves off one after another. The markers are the same
// vocabulary the lessons use. The motion lives in global.css (.home-steps); without it, or with reduced motion,
// the track is simply drawn complete.
export function HomeSteps({ heading, steps }: HomeStepsProps) {
  return (
    <section aria-labelledby="home-steps-heading" className="home-steps">
      <h2 id="home-steps-heading" className="m-0 text-sm font-semibold text-foreground">
        {heading}
      </h2>
      <ol className="home-steps__track m-0 mt-4 list-none p-0">
        {steps.map((step) => (
          <li key={step} className="home-step">
            <span aria-hidden="true" className="home-step__mark">
              <CircleIcon className="home-step__open size-5" />
              <CircleCheckIcon className="home-step__done size-5" />
            </span>
            <span className="home-step__text">{step}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
