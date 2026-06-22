# Carousel — Design System Component

Token-driven horizontally / vertically scrolling slide container on the shadcn/ui
foundation. Thin layer over `embla-carousel-react` — we own the wrapper, the
viewport, the slide, and the prev/next buttons; Embla owns scrolling, snapping,
and the imperative API. Tokens: none (hybrid — every value composes from
existing semantics; the nav-button offset is `calc(--control-sm + --space-4)`).

## Token mapping
| Slot | Property | → Semantic / Composition | → Primitive (light) | Dark |
|---|---|---|---|---|
| `Carousel` (region) | `position` | `relative` (structural) | — | — |
| `CarouselContent` (viewport) | `overflow` | `hidden` (structural) | — | — |
| Track (inner flex inside content) | gap compensation | negative inline-margin `-space-4` | -16px | — |
| Track (vertical) | gap compensation | negative block-margin `-space-4` | -16px | — |
| `CarouselItem` (slide) | `min-w-0 shrink-0 grow-0 basis-full` | structural | — | — |
| `CarouselItem` | padding-inline-start (h) | `spacing.scale.4` | 16px | — |
| `CarouselItem` | padding-block-start (v) | `spacing.scale.4` | 16px | — |
| `CarouselPrevious` / `CarouselNext` | size | `sizing.control.sm` (square) | 32px | — |
| `CarouselPrevious` / `CarouselNext` | radius | `radius.full` | 9999px | — |
| `CarouselPrevious` / `CarouselNext` | visual style | inherits `<Button variant="outline" size="icon">` (border + bg + hover + focus) | — | — |
| `CarouselPrevious` (h) | offset from viewport edge | `-(control-sm + space-4)` = -48px | — | — |
| `CarouselNext` (h) | offset from viewport edge | `-(control-sm + space-4)` = -48px | — | — |
| `CarouselPrevious` (v) | top offset | `-(control-sm + space-4)` then rotate 90° | — | — |
| `CarouselNext` (v) | bottom offset | `-(control-sm + space-4)` then rotate 90° | — | — |
| Arrow icon | size | `sizing.icon.sm` | 16px | — |

> The `-(control-sm + space-4)` offset places the nav button just outside the
> viewport with a one-step gap. Composed from existing tokens — no `--carousel-*`
> token is minted.

## API
```ts
type CarouselApi = UseEmblaCarouselType[1]

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: EmblaOptionsType                          // axis is set automatically from `orientation`
  plugins?: EmblaPluginType[]                       // e.g. Autoplay, Fade
  orientation?: "horizontal" | "vertical"          // default "horizontal"
  setApi?: (api: CarouselApi) => void              // imperative handle
}

// Slot components - all use the parent's Embla context via useCarousel()
function CarouselContent(props): JSX.Element        // <div data-slot="carousel-content">
function CarouselItem(props): JSX.Element           // role="group" aria-roledescription="slide"
function CarouselPrevious(buttonProps): JSX.Element // ButtonProps; defaults variant="outline" size="icon"
function CarouselNext(buttonProps): JSX.Element     // ButtonProps; defaults variant="outline" size="icon"

// Hook (exported indirectly via context) for advanced use - read state, scroll programmatically
function useCarousel(): {
  carouselRef: EmblaCarouselType[0]
  api: CarouselApi
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
}
```

## States
- **Slide**: stateless visual container — its child owns interaction.
- **Prev / Next**:
  - Default / Hover / Focus / Active — inherited from `<Button variant="outline" size="icon">`.
  - **Disabled** — Embla reports `canScrollPrev` / `canScrollNext`; when false,
    the button gets `disabled={true}` so it's unfocusable, opacity-50, no
    pointer events. Wraparound (`opts.loop`) keeps both buttons enabled.
- **Region keyboard**: ArrowLeft / ArrowRight call `scrollPrev` / `scrollNext`
  on the region itself (capture-phase). Disabled when focus is in a child
  input so typing isn't intercepted.

## Accessibility (gate-verified, light & dark)
- Region wrapper uses `role="region"` + `aria-roledescription="carousel"` so AT
  announces it as a carousel landmark.
- Each slide is `role="group" aria-roledescription="slide"` — AT can navigate
  by slide and read "slide N of total."
- Prev/Next buttons carry a visually-hidden `<span class="sr-only">Previous slide
  / Next slide</span>` for screen readers (the visual arrow is `aria-hidden`).
- Keyboard model: Tab reaches the region, then the slide content, then the
  prev/next buttons. ArrowLeft / ArrowRight on the region scrolls; Tab / Space
  on the buttons activates. Arrow keys are intercepted at capture-phase so
  any inner button or link still receives Enter / Space.
- Reduced motion: Embla respects `prefers-reduced-motion` (snap with no
  animation when set). The track and slides have no decorative animation of
  their own.
- Focus ring uses the shared `--focus-ring` on the prev/next buttons (3:1 vs
  page surface, both themes).
- `measure_render`: visible labels AA · `axe_audit`: 0 violations
  (region + landmark + group roles intact) · `verify_states`: every nav
  button passes default/hover/focus contrast · `verify_responsive`: no
  overflow @ 280/320/414.

## Usage
```tsx
import {
  Carousel, CarouselContent, CarouselItem,
  CarouselPrevious, CarouselNext, type CarouselApi,
} from "@/design-system/carousel/carousel"

{/* One slide visible at a time */}
<Carousel className="w-full max-w-sm" opts={{ loop: true }}>
  <CarouselContent>
    {photos.map((p) => (
      <CarouselItem key={p.id}>
        <img src={p.src} alt={p.alt} className="w-full rounded-[var(--radius-md)]" />
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

{/* Multi-up: 1 on phone, 2 on tablet, 3 on desktop */}
<Carousel>
  <CarouselContent>
    {features.map((f) => (
      <CarouselItem key={f.id} className="md:basis-1/2 lg:basis-1/3">
        <Card>{f.title}</Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

{/* Vertical (e.g. a "what's new" stack inside a sidebar) */}
<Carousel orientation="vertical" className="h-64">
  <CarouselContent className="h-full">
    {items.map((i) => <CarouselItem key={i.id}>{i.node}</CarouselItem>)}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

{/* Imperative: drive from outside (autoplay, hash-link, keyboard outside) */}
const [api, setApi] = React.useState<CarouselApi>()
React.useEffect(() => { api?.scrollTo(2) }, [api])
<Carousel setApi={setApi}> ... </Carousel>
```
