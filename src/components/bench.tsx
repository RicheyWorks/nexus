import { useEffect, useMemo, useState } from "react";
import { ART_PLATES, DEV_PROJECTS } from "@/lib/studio-data";
import { click } from "@/lib/click";

const NOTES = [
  { name: "C4", freq: 261.63 },
  { name: "D4", freq: 293.66 },
  { name: "E4", freq: 329.63 },
  { name: "F4", freq: 349.23 },
  { name: "G4", freq: 392 },
  { name: "A4", freq: 440 },
  { name: "B4", freq: 493.88 },
  { name: "C5", freq: 523.25 },
];

export function BenchSynth() {
  const [wave, setWave] = useState<OscillatorType>("sine");
  const [note, setNote] = useState("");

  const play = (freq: number, name: string) => {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = wave;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.6);
    setNote(name);
    window.setTimeout(() => setNote(""), 280);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">Bench synth. A keyboard, not a product. Nothing here is published.</p>
      <div className="flex flex-wrap gap-2">
        {(["sine", "triangle", "sawtooth", "square"] as OscillatorType[]).map((w) => (
          <button
            key={w}
            type="button"
            onClick={() => setWave(w)}
            className={w === wave ? "rounded-full border border-cyan px-3 py-1 text-sm text-cyan" : "rounded-full border border-line px-3 py-1 text-sm text-muted"}
          >
            {w}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
        {NOTES.map((n) => (
          <button
            key={n.name}
            type="button"
            onClick={() => play(n.freq, n.name)}
            className={
              note === n.name
                ? "rounded-lg bg-cyan py-6 text-sm font-semibold text-bg"
                : "rounded-lg border border-line py-6 text-sm"
            }
          >
            {n.name}
          </button>
        ))}
      </div>
    </div>
  );
}

const HELP = [
  "help",
  "ls",
  "kit",
  "pets",
  "clear",
];

export function BenchTerminal() {
  const [lines, setLines] = useState<string[]>(["NEXUS bench. Type help."]);
  const [input, setInput] = useState("");

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const next = [`$ ${raw}`];
    if (cmd === "help") next.push(...HELP);
    else if (cmd === "ls") next.push(...DEV_PROJECTS.map((p) => `${p.title} — ${p.repo}`), ...ART_PLATES.map((a) => `${a.title} — studio plate, not minted`));
    else if (cmd === "kit") next.push("CSRBT. Four strategies. 33 kit pages. github.com/RicheyWorks/CSRBT");
    else if (cmd === "pets") next.push("210 kinds. Rui walks first. github.com/RicheyWorks/computerpets");
    else if (cmd === "clear") {
      setLines([]);
      setInput("");
      return;
    } else next.push("Unknown. Type help.");
    setLines((prev) => [...prev, ...next]);
    setInput("");
  };

  return (
    <div className="rounded-xl border border-line bg-bg p-3 font-mono text-sm">
      <div className="max-h-40 space-y-1 overflow-y-auto text-muted">
        {lines.map((l, i) => (
          <p key={i} className={l.startsWith("$") ? "text-cyan" : undefined}>
            {l}
          </p>
        ))}
      </div>
      <label className="mt-2 flex items-center gap-2">
        <span className="text-gold">$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") run(input);
          }}
          placeholder="help, ls, kit, pets"
          className="w-full bg-transparent text-fg outline-none"
        />
      </label>
    </div>
  );
}

const LABELS = ["Hook", "Mechanism", "Snag", "Reply"];

const THREADS: { id: string; title: string; beats: string[] }[] = [
  {
    id: "csrbt",
    title: "CSRBT field kit",
    beats: [
      "Four ways to balance one tree. It can swap while it is running, and it refuses the swap if a health check fails.",
      "Same operations on red-black, AVL, splay, and weight-balanced. Rank, select, and median come from subtree sizes.",
      "The snag was a swap that looked fine and left the tree wrong. The health check is the door, not a slogan.",
      "Field kit: 22 instruments, 11 cards, no signal required.\n\ngithub.com/RicheyWorks/CSRBT",
    ],
  },
  {
    id: "pets",
    title: "ComputerPets",
    beats: [
      "ComputerPets is not a sticker pack. Rui walks first.",
      "210 living kinds. Games hang off the same body: siege, soar, spire, thread.",
      "Flagship, organs, and games are separate repos on purpose. One giant repo was the mess.",
      "Flagship: github.com/RicheyWorks/computerpets\nMap: github.com/RicheyWorks/computerpets-ecosystem",
    ],
  },
  {
    id: "lb",
    title: "LoadBalancerPro",
    beats: [
      "LoadBalancerPro keeps the lab behind a door.",
      "Java reverse proxy. Health checks, retry budgets, exact tail latency.",
      "Cloud mutation stays dry-run unless the gate is opened. That is the default, on purpose.",
      "github.com/RicheyWorks/LoadBalancerPro",
    ],
  },
  {
    id: "plate-1",
    title: "Plate I — fern rule",
    beats: [
      "Plate I. A fern grown by rule, not by brush.",
      "One trunk replaces itself with a shorter trunk and two branches. The angle is the only gene.",
      "Wider angle, more open crown. Too wide and it stops looking like a plant.",
      "Not a mint. The plate is up so you can see the hand before a contract exists.",
    ],
  },
  {
    id: "sigil",
    title: "Terpene sigil",
    beats: [
      "Terpene sigil. Ring, spine, resin.",
      "A brass circle as the boundary. The molecule is drawn as a plant, not a textbook diagram.",
      "The old wallet is gone. This mark does not claim those pieces.",
      "Studio plate. The contract comes later, and only when it is real. terpenepirate.eth",
    ],
  },
  {
    id: "rui",
    title: "Rui, desk study",
    beats: [
      "Rui, desk study. First walker.",
      "The app is the pet. This plate is the portrait.",
      "210 kinds. Do not read the portrait as a finished download.",
      "Neither is a mint. github.com/RicheyWorks/computerpets",
    ],
  },
  {
    id: "lanterns",
    title: "Hilbert lanterns",
    beats: [
      "Hilbert lanterns. A maze plate, not a painted dungeon.",
      "One corridor folds to fill the square. One path stays lit.",
      "The picture is not the engine. The engine is Daedalus 2.",
      "github.com/RicheyWorks/Daedalus2",
    ],
  },
];

export function DraftEditor({ onCopy }: { onCopy: (text: string) => void }) {
  const [id, setId] = useState(THREADS[0].id);
  const [beat, setBeat] = useState(0);
  const current = THREADS.find((d) => d.id === id) ?? THREADS[0];
  const [text, setText] = useState(current.beats[0]);

  useEffect(() => {
    setBeat(0);
    setText(current.beats[0]);
  }, [current]);

  const href = useMemo(() => `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`, [text]);
  const over = text.length > 280;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="space-y-2">
        {THREADS.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => {
              setId(d.id);
              click(520);
            }}
            className={
              d.id === id
                ? "block w-full rounded-lg border border-cyan/40 px-3 py-2 text-left text-sm text-cyan"
                : "block w-full rounded-lg border border-line px-3 py-2 text-left text-sm"
            }
          >
            {d.title}
          </button>
        ))}
      </div>
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          {LABELS.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                setBeat(i);
                setText(current.beats[i]);
              }}
              className={
                i === beat
                  ? "rounded-full bg-fg px-3 py-1 text-xs font-semibold text-bg"
                  : "rounded-full border border-line px-3 py-1 text-xs text-muted"
              }
            >
              {i + 1} {label}
            </button>
          ))}
        </div>
        <div className="mb-1 flex justify-between text-xs text-muted">
          <span>Post this, then the next. Nothing posts itself.</span>
          <span className={over ? "text-gold" : undefined}>{text.length} / 280</span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="w-full rounded-xl border border-line bg-bg p-3 text-sm"
        />
        <div className="mt-3 flex flex-wrap gap-3">
          <button type="button" onClick={() => onCopy(text)} className="rounded-lg bg-cyan px-3 py-2 text-sm font-semibold text-bg">
            Copy this post
          </button>
          <button
            type="button"
            onClick={() => onCopy(current.beats.map((b, i) => `${i + 1}. ${b}`).join("\n\n"))}
            className="rounded-lg border border-line px-3 py-2 text-sm"
          >
            Copy all four
          </button>
          <a href={href} className="py-2 text-sm text-cyan">
            Open compose
          </a>
        </div>
      </div>
    </div>
  );
}

export function CommandPalette({
  onClose,
  onGo,
  onAccent,
  onSound,
  sound,
}: {
  onClose: () => void;
  onGo: (tab: "all" | "dev" | "art" | "logs" | "marketing") => void;
  onAccent: (accent: "cyan" | "amber") => void;
  onSound: () => void;
  sound: boolean;
}) {
  const [q, setQ] = useState("");
  const commands = [
    { title: "All vault", run: () => onGo("all") },
    { title: "Dev lab", run: () => onGo("dev") },
    { title: "Art vault", run: () => onGo("art") },
    { title: "Dev logs", run: () => onGo("logs") },
    { title: "X studio", run: () => onGo("marketing") },
    { title: "Accent: cyan", run: () => onAccent("cyan") },
    { title: "Accent: amber", run: () => onAccent("amber") },
    { title: sound ? "Mute clicks" : "Enable clicks", run: onSound },
  ].filter((c) => c.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-bg/80 p-4 pt-24" onClick={onClose}>
      <div role="dialog" aria-label="Command palette" className="w-full max-w-lg rounded-2xl border border-line bg-surface p-3" onClick={(e) => e.stopPropagation()}>
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Jump or switch"
          className="w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm"
        />
        <div className="mt-2 max-h-64 overflow-y-auto">
          {commands.map((c) => (
            <button
              key={c.title}
              type="button"
              className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-card"
              onClick={() => {
                c.run();
                click();
                onClose();
              }}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
