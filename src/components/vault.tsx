import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  BookOpen,
  ChevronRight,
  Code,
  Compass,
  Copy,
  ExternalLink,
  Github,
  Search,
  Send,
  X,
} from "lucide-react";
import { BenchSynth, BenchTerminal, CommandPalette, DraftEditor } from "@/components/bench";
import { MotifCanvas } from "@/components/motif";
import { click, setClicks } from "@/lib/click";
import {
  ART_PLATES,
  DEV_PROJECTS,
  LOGS,
  TECHS,
  includesQuery,
  type ArtPlate,
  type DevProject,
  type StudioLog,
  type TabId,
} from "@/lib/studio-data";

type Modal =
  | { kind: "dev-demo"; item: DevProject }
  | { kind: "dev-notes"; item: DevProject }
  | { kind: "post"; title: string; text: string }
  | { kind: "art"; item: ArtPlate }
  | { kind: "log"; item: StudioLog }
  | { kind: "contact" }
  | null;

const TABS: { id: TabId; label: string }[] = [
  { id: "all", label: "All vault" },
  { id: "dev", label: "Dev lab" },
  { id: "art", label: "Art vault" },
  { id: "logs", label: "Dev logs" },
  { id: "marketing", label: "X studio" },
];

export function Vault() {
  const [tab, setTab] = useState<TabId>("all");
  const [query, setQuery] = useState("");
  const [tech, setTech] = useState<(typeof TECHS)[number]>("All");
  const [list, setList] = useState(false);
  const [modal, setModal] = useState<Modal>(null);
  const [toast, setToast] = useState("");
  const [angle, setAngle] = useState(24);
  const [depth, setDepth] = useState(8);
  const [palette, setPalette] = useState(false);
  const [sound, setSound] = useState(false);
  const [accent, setAccent] = useState<"cyan" | "amber">("cyan");
  const [bench, setBench] = useState<"plate" | "synth" | "shell">("plate");

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(""), 1600);
    return () => window.clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((v) => !v);
        click(720);
      }
      if (e.key === "Escape") {
        setModal(null);
        setPalette(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const devs = useMemo(
    () =>
      DEV_PROJECTS.filter(
        (p) =>
          includesQuery(p.title + p.description + p.tagline, query) &&
          (tech === "All" || p.tech.includes(tech)),
      ),
    [query, tech],
  );
  const plates = useMemo(
    () =>
      ART_PLATES.filter(
        (p) =>
          includesQuery(p.title + p.description, query) &&
          (tech === "All" || p.tools.includes(tech)),
      ),
    [query, tech],
  );
  const logs = useMemo(
    () =>
      LOGS.filter(
        (p) =>
          includesQuery(p.title + p.snippet + p.body, query) &&
          (tech === "All" || p.tags.includes(tech)),
      ),
    [query, tech],
  );

  const show = (id: TabId) => tab === "all" || tab === id;
  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setToast("Copied");
  };

  return (
    <div className="relative min-h-screen bg-bg text-fg" data-accent={accent}>
      <div className="dotgrid pointer-events-none fixed inset-0 opacity-40" />
      <header className="sticky top-0 z-20 border-b border-line bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <button
            type="button"
            className="flex items-center gap-3 text-left"
            onClick={() => {
              setTab("all");
              setQuery("");
              setTech("All");
            }}
          >
            <MotifCanvas motif="ring" className="h-9 w-9 rounded-full border border-gold" label="Studio seal" />
            <span>
              <span className="block font-serif text-lg leading-none">NEXUS</span>
              <span className="text-xs tracking-widest text-muted uppercase">∃architect · dual studio</span>
            </span>
          </button>
          <nav className="hidden items-center gap-1 lg:flex">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={
                  tab === t.id
                    ? "rounded-lg border border-cyan/40 bg-cyan/15 px-3 py-2 text-sm text-cyan"
                    : "rounded-lg px-3 py-2 text-sm text-muted"
                }
              >
                {t.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setPalette(true)} className="hidden rounded-lg border border-line px-3 py-2 text-sm text-muted md:inline">
              Find
            </button>
            <button
              type="button"
              onClick={() => {
                const next = !sound;
                setSound(next);
                setClicks(next);
                if (next) click(880);
              }}
              className="hidden rounded-lg border border-line px-3 py-2 text-sm text-muted md:inline"
            >
              {sound ? "Sound on" : "Sound off"}
            </button>
            <button
              type="button"
              onClick={() => setAccent((a) => (a === "cyan" ? "amber" : "cyan"))}
              className="hidden rounded-lg border border-line px-3 py-2 text-sm text-muted md:inline"
            >
              {accent === "cyan" ? "Cyan" : "Amber"}
            </button>
            <a href="https://x.com/TERPENE_PIRATE" className="rounded-lg border border-line px-3 py-2 text-sm text-muted">
              X
            </a>
            <a
              href="https://github.com/RicheyWorks"
              className="inline-flex items-center gap-1 rounded-lg border border-line px-3 py-2 text-sm text-muted"
            >
              <Github className="size-4" aria-hidden />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <button
              type="button"
              onClick={() => setModal({ kind: "contact" })}
              className="hidden items-center gap-1 rounded-lg bg-cyan px-3 py-2 text-sm font-semibold text-bg sm:inline-flex"
            >
              <Send className="size-4" aria-hidden />
              Contact
            </button>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 lg:hidden">
          <button type="button" onClick={() => setPalette(true)} className="shrink-0 rounded-lg border border-line px-3 py-2 text-sm text-muted">
            Find
          </button>
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={
                tab === t.id
                  ? "shrink-0 rounded-lg border border-cyan/40 bg-cyan/15 px-3 py-2 text-sm text-cyan"
                  : "shrink-0 rounded-lg border border-line px-3 py-2 text-sm text-muted"
              }
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl space-y-8 px-4 py-8">
        <section className="grid items-center gap-6 rounded-2xl border border-line bg-surface p-5 md:p-8 lg:grid-cols-2">
          <div>
            <p className="text-xs tracking-widest text-cyan uppercase">Building in public · @TERPENE_PIRATE</p>
            <h1 className="mt-3 font-serif text-4xl leading-none md:text-5xl">
              Plants by rule.
              <span className="mt-1 block text-gold">Engines by hand.</span>
            </h1>
            <p className="mt-4 max-w-xl text-muted">
              Field kit, desktop pets, and plates grown in the browser. Public repos only. Nothing on the wall is minted.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {(["plate", "synth", "shell"] as const).map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => {
                    setBench(b);
                    click();
                  }}
                  className={bench === b ? "rounded-full bg-fg px-3 py-2 text-sm font-semibold text-bg" : "rounded-full border border-line px-3 py-2 text-sm"}
                >
                  {b === "plate" ? "Plate" : b === "synth" ? "Synth" : "Shell"}
                </button>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-gold/40 bg-bg">
            {bench === "plate" && (
              <>
                <MotifCanvas motif="fern" angle={angle} depth={depth} className="h-72 w-full" label="Live fern plate" />
                <div className="flex items-center justify-between border-t border-line px-3 py-2 text-xs tracking-wide text-muted uppercase">
                  <span>Plate I · live rule</span>
                  <span className="text-gold">Not a mint</span>
                </div>
                <div className="grid grid-cols-2 gap-3 px-3 pb-3 text-sm text-muted">
                  <label>
                    Angle {angle}
                    <input className="mt-1 block w-full accent-gold" type="range" min={12} max={40} value={angle} onChange={(e) => setAngle(Number(e.target.value))} />
                  </label>
                  <label>
                    Depth {depth}
                    <input className="mt-1 block w-full accent-gold" type="range" min={4} max={10} value={depth} onChange={(e) => setDepth(Number(e.target.value))} />
                  </label>
                </div>
              </>
            )}
            {bench === "synth" && <div className="p-3"><BenchSynth /></div>}
            {bench === "shell" && <div className="p-3"><BenchTerminal /></div>}
          </div>
        </section>

        <section className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
          {[
            ["210", "Pet kinds. Rui walks first.", false],
            ["33", "Kit pages. No signal required.", false],
            ["0", "Claimed mints.", true],
          ].map(([n, s, gold]) => (
            <div key={String(n)} className="bg-bg px-4 py-4">
              <b className={gold ? "block font-serif text-3xl text-gold" : "block font-serif text-3xl"}>{n}</b>
              <span className="text-xs text-muted">{s}</span>
            </div>
          ))}
        </section>

        <section className="space-y-3 rounded-xl border border-line bg-surface p-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-2.5 left-3 size-4 text-muted" aria-hidden />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the kit, pets, plates"
                className="w-full rounded-lg border border-line bg-bg py-2 pr-3 pl-9 text-sm outline-none focus:border-cyan"
              />
            </div>
            <button type="button" onClick={() => setList((v) => !v)} className="rounded-lg border border-line px-3 py-2 text-sm text-muted">
              {list ? "Grid" : "List"}
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {TECHS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTech(t)}
                className={
                  tech === t
                    ? "shrink-0 rounded-full border border-gold px-3 py-1 text-sm text-gold"
                    : "shrink-0 rounded-full border border-line px-3 py-1 text-sm text-muted"
                }
              >
                {t}
              </button>
            ))}
          </div>
        </section>

        {show("dev") && (
          <section className="space-y-3">
            <SectionHead icon={<Code className="size-5 text-cyan" />} title="Dev lab" count={devs.length} />
            {devs.length === 0 ? <Empty /> : null}
            <div className={list ? "space-y-3" : "grid gap-4 md:grid-cols-2"}>
              {devs.map((p) => (
                <article key={p.id} className="plate-card flex flex-col overflow-hidden rounded-xl border border-line bg-card">
                  <MotifCanvas motif={p.motif} className="h-36 w-full rounded-t-xl" label="" />
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-xs tracking-wide text-muted uppercase">
                      {p.type} · {p.status}
                    </p>
                    <h3 className="mt-1 font-serif text-2xl">{p.title}</h3>
                    <p className="text-sm text-cyan">{p.tagline}</p>
                    <p className="mt-2 text-sm text-muted">{p.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {p.tech.map((t) => (
                        <span key={t} className="rounded-full border border-line px-2 py-0.5 text-xs text-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <button type="button" className="rounded-lg border border-cyan/40 px-3 py-2 text-sm text-cyan" onClick={() => setModal({ kind: "dev-demo", item: p })}>
                        Open
                      </button>
                      <button type="button" className="rounded-lg border border-line px-3 py-2 text-sm" onClick={() => setModal({ kind: "dev-notes", item: p })}>
                        Notes
                      </button>
                      <button type="button" className="rounded-lg border border-line px-3 py-2 text-sm" onClick={() => setModal({ kind: "post", title: p.title, text: p.post })}>
                        X draft
                      </button>
                      <a href={p.repo} className="text-sm text-gold">
                        Repo
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {show("art") && (
          <section className="space-y-3">
            <SectionHead icon={<Compass className="size-5 text-gold" />} title="Art vault" count={plates.length} />
            {plates.length === 0 ? <Empty /> : null}
            <div className={list ? "space-y-3" : "grid gap-4 md:grid-cols-2"}>
              {plates.map((a) => (
                <article key={a.id} className="plate-card overflow-hidden rounded-xl border border-line bg-card">
                  <MotifCanvas motif={a.motif} angle={angle} className="h-52 w-full" label={a.title} />
                  <div className="p-4">
                    <p className="text-xs tracking-wide text-gold uppercase">Studio plate · not minted</p>
                    <h3 className="mt-1 font-serif text-2xl">{a.title}</h3>
                    <p className="text-sm text-muted">{a.subtitle}</p>
                    <p className="mt-2 text-sm text-muted">{a.description}</p>
                    <div className="mt-3 flex gap-3">
                      <button type="button" className="text-sm text-gold" onClick={() => setModal({ kind: "art", item: a })}>
                        Open plate <ChevronRight className="inline size-4" />
                      </button>
                      <button type="button" className="text-sm text-cyan" onClick={() => setModal({ kind: "post", title: a.title, text: a.post })}>
                        X draft
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {show("logs") && (
          <section className="space-y-3">
            <SectionHead icon={<BookOpen className="size-5 text-gold" />} title="Dev logs" count={logs.length} />
            {logs.length === 0 ? <Empty /> : null}
            <div className="grid gap-4 md:grid-cols-3">
              {logs.map((l) => (
                <article key={l.id} className="plate-card flex flex-col rounded-xl border border-line bg-card p-4">
                  <p className="text-xs text-muted">
                    {l.date} · {l.read}
                  </p>
                  <h3 className="mt-2 font-serif text-xl">{l.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{l.snippet}</p>
                  <button type="button" className="mt-4 text-left text-sm text-gold" onClick={() => setModal({ kind: "log", item: l })}>
                    Read
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {tab === "marketing" && (
          <section className="rounded-2xl border border-line bg-surface p-5">
            <h2 className="font-serif text-3xl">X studio</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Four teach posts for every sell. A hook plus two short lines. Attach a plate only when the plate is the point. Thursday is for replies, not a new topic.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>Lead with a number you can defend: 210 kinds, 33 kit pages, 4 strategies, 0 mints.</li>
              <li>A clip only if it is the fern, the pet, or the kit. A generated city is not the work.</li>
              <li>Code on one side, the picture on the other, when both are real. The link goes in the reply.</li>
              <li>No cron that posts for you. No floor, no view count, no product that is not in the org.</li>
            </ul>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl border border-line bg-card p-4">
                <p className="text-xs tracking-wide text-gold uppercase">Now</p>
                <p className="mt-2 text-sm text-muted">This site and the public repos. GitHub is the store until something has a price.</p>
              </div>
              <div className="rounded-xl border border-line bg-card p-4">
                <p className="text-xs tracking-wide text-gold uppercase">When a plate is finished</p>
                <p className="mt-2 text-sm text-muted">A small drop on Highlight or Manifold. The contract goes on the card. fx(hash) only if the mint is the live rule, not a picture of it.</p>
              </div>
              <div className="rounded-xl border border-line bg-card p-4">
                <p className="text-xs tracking-wide text-gold uppercase">When a tool is packaged</p>
                <p className="mt-2 text-sm text-muted">itch.io or Gumroad for a kit or a script. Sponsors on the repo. Stripe after there is a paid app. There is not one yet.</p>
              </div>
            </div>
            <div className="mt-4">
              <DraftEditor onCopy={copy} />
            </div>
          </section>
        )}
      </main>

      <footer className="relative z-10 border-t border-line px-4 py-8 text-sm text-muted">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2">
          <span>∃architect · RicheyWorks · @TERPENE_PIRATE</span>
          <span>terpenepirate.eth · plates are not mints</span>
        </div>
      </footer>

      {modal ? (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-bg/80 p-4 sm:items-center" onClick={() => setModal(null)}>
          <div
            role="dialog"
            aria-modal="true"
            className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-line bg-surface p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <h2 className="font-serif text-2xl">{modalTitle(modal)}</h2>
              <button type="button" aria-label="Close" onClick={() => setModal(null)} className="rounded-lg border border-line p-2">
                <X className="size-4" />
              </button>
            </div>
            {modal.kind === "dev-demo" && (
              <div className="space-y-3">
                <MotifCanvas motif={modal.item.motif} angle={angle} className="h-56 w-full rounded-xl" label="" />
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
                  {modal.item.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <a href={modal.item.repo} className="inline-flex items-center gap-1 text-sm text-cyan">
                  Open the repo <ExternalLink className="size-4" />
                </a>
              </div>
            )}
            {modal.kind === "dev-notes" && (
              <div>
                <pre className="overflow-x-auto rounded-xl border border-line bg-bg p-4 text-sm whitespace-pre-wrap text-fg">{modal.item.snippet}</pre>
                <button type="button" className="mt-3 inline-flex items-center gap-1 rounded-lg border border-line px-3 py-2 text-sm" onClick={() => copy(modal.item.snippet)}>
                  <Copy className="size-4" /> Copy notes
                </button>
              </div>
            )}
            {modal.kind === "post" && <PostBox text={modal.text} onCopy={copy} />}
            {modal.kind === "art" && (
              <div className="space-y-3">
                <MotifCanvas motif={modal.item.motif} angle={angle} depth={depth} className="h-64 w-full rounded-xl" label={modal.item.title} />
                <p className="text-sm text-gold">Studio plate. Not minted.</p>
                <p className="text-sm text-muted">{modal.item.description}</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {modal.item.steps.map((s, i) => (
                    <div key={s.title} className="rounded-lg border border-line p-3">
                      <p className="text-sm text-gold">
                        0{i + 1}. {s.title}
                      </p>
                      <p className="text-sm text-muted">{s.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {modal.kind === "log" && <p className="text-sm text-muted">{modal.item.body}</p>}
            {modal.kind === "contact" && (
              <div className="space-y-3 text-sm text-muted">
                <p>This does not pretend to send a message. It opens your mail app.</p>
                <a className="inline-flex rounded-lg bg-cyan px-4 py-2 font-semibold text-bg" href="mailto:730richey730@gmail.com?subject=NEXUS%20studio">
                  Email the studio
                </a>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {palette ? (
        <CommandPalette
          sound={sound}
          onClose={() => setPalette(false)}
          onGo={(id) => setTab(id)}
          onAccent={setAccent}
          onSound={() => {
            const next = !sound;
            setSound(next);
            setClicks(next);
          }}
        />
      ) : null}

      {toast ? <div className="fixed right-4 bottom-4 z-50 rounded-lg bg-cyan px-3 py-2 text-sm font-semibold text-bg">{toast}</div> : null}
    </div>
  );
}

function modalTitle(modal: Exclude<Modal, null>) {
  if (modal.kind === "contact") return "Contact";
  if (modal.kind === "post") return modal.title;
  return modal.item.title;
}

function SectionHead({ icon, title, count }: { icon: ReactNode; title: string; count: number }) {
  return (
    <div className="flex items-center gap-2 border-b border-line pb-2">
      {icon}
      <h2 className="font-serif text-3xl">{title}</h2>
      <span className="text-sm text-muted">{count}</span>
    </div>
  );
}

function Empty() {
  return <p className="text-sm text-muted">Nothing in this filter.</p>;
}

function PostBox({ text, onCopy }: { text: string; onCopy: (t: string) => void }) {
  const href = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
  return (
    <div>
      <pre className="rounded-xl border border-line bg-bg p-4 text-sm whitespace-pre-wrap">{text}</pre>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => onCopy(text)} className="inline-flex items-center gap-1 rounded-lg bg-cyan px-3 py-2 text-sm font-semibold text-bg">
          <Copy className="size-4" /> Copy post
        </button>
        <a href={href} className="text-sm text-cyan">
          Open compose
        </a>
      </div>
    </div>
  );
}
