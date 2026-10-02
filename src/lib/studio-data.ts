export type TabId = "all" | "dev" | "art" | "logs" | "marketing";

export type DevProject = {
  id: string;
  title: string;
  tagline: string;
  status: string;
  type: string;
  tech: string[];
  description: string;
  highlights: string[];
  snippet: string;
  repo: string;
  motif: "fern" | "ring" | "maze";
  post: string;
};

export type ArtPlate = {
  id: string;
  title: string;
  subtitle: string;
  tools: string[];
  description: string;
  motif: "fern" | "sigil" | "panda" | "maze";
  steps: { title: string; text: string }[];
  post: string;
};

export type StudioLog = {
  id: string;
  title: string;
  date: string;
  read: string;
  tags: string[];
  snippet: string;
  body: string;
};

export const TECHS = ["All", "Java", "TypeScript", "L-systems", "Spring"] as const;

export const DEV_PROJECTS: DevProject[] = [
  {
    id: "csrbt",
    title: "CSRBT field kit",
    tagline: "A tree that changes its mind, and a phone kit for a wet meadow.",
    status: "Public repo",
    type: "Engine + field instruments",
    tech: ["Java", "L-systems"],
    description:
      "Four balancing strategies on one ordered set. It can morph between them at runtime and refuses the swap if a health check fails. Thirty-three kit pages record ecology data with no signal.",
    highlights: [
      "Red-black, AVL, splay, and weight-balanced, same operations",
      "Rank, select, median, and percentile from subtree sizes",
      "Twenty-two field instruments and eleven reference cards",
    ],
    snippet: `Start here if you are not a coder:
https://github.com/RicheyWorks/WholeHog/blob/main/ECOSYSTEM.md

Engine:
https://github.com/RicheyWorks/CSRBT

Showcase demo:
https://github.com/RicheyWorks/WholeHog`,
    repo: "https://github.com/RicheyWorks/CSRBT",
    motif: "fern",
    post: "Four ways to balance a tree. The kit swaps them while it is running, and refuses the swap if the tree fails a health check.\n\nSame engine carries a field kit: 22 instruments, 11 cards, no signal required.\n\ngithub.com/RicheyWorks/CSRBT",
  },
  {
    id: "pets",
    title: "ComputerPets",
    tagline: "Desktop companions. Rui walks first.",
    status: "Public repo",
    type: "Desktop companions",
    tech: ["Java", "TypeScript"],
    description:
      "Pets that live on the machine. Two hundred ten living kinds. Games hang off the same body: siege, soar, spire, thread. The ecosystem map is the honest index.",
    highlights: [
      "Flagship plus organs, not one giant repo",
      "Rui is the first walker",
      "Games are separate: siege, soar, spire, thread",
    ],
    snippet: `Flagship:
https://github.com/RicheyWorks/computerpets

Map:
https://github.com/RicheyWorks/computerpets-ecosystem`,
    repo: "https://github.com/RicheyWorks/computerpets",
    motif: "ring",
    post: "ComputerPets is not a sticker pack.\n\n210 living kinds. Rui walks first. Games hung off the same body: siege, soar, spire, thread.\n\nFlagship: github.com/RicheyWorks/computerpets\nMap: github.com/RicheyWorks/computerpets-ecosystem",
  },
  {
    id: "lb",
    title: "LoadBalancerPro",
    tagline: "Java reverse proxy. The lab stays behind a door.",
    status: "Public repo",
    type: "Proxy",
    tech: ["Java", "Spring"],
    description:
      "Java 17 / Spring Boot reverse proxy. Bounded retries, health checks, exact tail latency. Cloud mutation stays dry-run unless the gate is opened.",
    highlights: [
      "Health checks, retry budgets, cooldown",
      "Exact rolling tail latency",
      "Default posture is conservative on purpose",
    ],
    snippet: `mvn spring-boot:run "-Dspring-boot.run.arguments=--server.address=127.0.0.1 --spring.profiles.active=local"

curl -fsS http://127.0.0.1:8080/api/health

https://github.com/RicheyWorks/LoadBalancerPro`,
    repo: "https://github.com/RicheyWorks/LoadBalancerPro",
    motif: "maze",
    post: "LoadBalancerPro is a Java reverse proxy with the lab kept behind a door.\n\nHealth checks, retry budgets, exact tail latency. Default posture is conservative on purpose.\n\ngithub.com/RicheyWorks/LoadBalancerPro",
  },
];

export const ART_PLATES: ArtPlate[] = [
  {
    id: "plate-1",
    title: "Plate I — fern rule",
    subtitle: "Grown by grammar, not by brush",
    tools: ["L-systems"],
    description:
      "A recursive fern. Change the angle and the depth. This is the plate, and it is not minted.",
    motif: "fern",
    steps: [
      {
        title: "Axiom",
        text: "A trunk that replaces itself with a shorter trunk and two branches.",
      },
      {
        title: "Angle",
        text: "The slider is the only gene. Wider angle, more open crown.",
      },
    ],
    post: "Plate I.\n\nA fern grown by rule, not by brush. Not a mint. The plate is up so you can see the hand before the contract.",
  },
  {
    id: "sigil",
    title: "Terpene sigil",
    subtitle: "Resin, ring, and a botanical mark",
    tools: ["L-systems"],
    description: "Studio mark for the new wall. A ring, a spine, and droplets. Not minted.",
    motif: "sigil",
    steps: [
      { title: "Ring", text: "Brass circle as the collection boundary." },
      { title: "Spine", text: "A molecule drawn as a plant, not a diagram from a textbook." },
    ],
    post: "Terpene sigil. Ring, spine, resin.\n\nStudio plate for the new wall. The contract comes later, and only when it is real.",
  },
  {
    id: "rui",
    title: "Rui, desk study",
    subtitle: "First walker of ComputerPets",
    tools: ["TypeScript"],
    description: "A portrait study of the red panda companion. The app is the pet. This plate is the picture. Neither is a mint.",
    motif: "panda",
    steps: [
      { title: "Walker", text: "Rui is the first of 210 kinds, not a mascot pasted on a shader toy." },
      { title: "Separate from the repo", text: "The portrait does not claim the software is finished." },
    ],
    post: "Rui, desk study.\n\nFirst walker. 210 kinds. The app is the pet. This plate is the portrait. Neither is a mint yet.",
  },
  {
    id: "lanterns",
    title: "Hilbert lanterns",
    subtitle: "Maze plate from the Daedalus work",
    tools: ["Java"],
    description: "A space-filling corridor with one lit path. Studio plate for the maze engine.",
    motif: "maze",
    steps: [
      { title: "Corridor", text: "A Hilbert-like fold, not a painted dungeon." },
      { title: "Door", text: "The engine is Daedalus 2. This picture is not the demo." },
    ],
    post: "Hilbert lanterns.\n\nMaze plate from the Daedalus work.\ngithub.com/RicheyWorks/Daedalus2",
  },
];

export const LOGS: StudioLog[] = [
  {
    id: "log-kit",
    title: "The pile is a database",
    date: "Studio note",
    read: "3 min",
    tags: ["Java"],
    snippet: "If someone opens one repo and is lost, send them to WholeHog.",
    body: "CSRBT keeps data sorted and can rearrange its own shape. SuperBeefSort picks a sort. SmokeHouse is the store. Carver plans. The renderer keeps running totals. Sizzle proves recovery by crashing on purpose. WholeHog is the one door with a demo.",
  },
  {
    id: "log-rui",
    title: "Rui walks first",
    date: "Studio note",
    read: "2 min",
    tags: ["TypeScript", "Java"],
    snippet: "ComputerPets is not a sticker pack. The ecosystem map is the index.",
    body: "Flagship, organs, and games live in separate repos on purpose. Siege, soar, spire, and thread hang off the same body. Post the map. Do not invent a download count.",
  },
  {
    id: "log-wallet",
    title: "Wallet reset",
    date: "Studio note",
    read: "2 min",
    tags: ["L-systems"],
    snippet: "Old NFTs are not on this wall. Mints go up only after a contract exists.",
    body: "The previous wallet was lost. This vault does not list those pieces. terpenepirate.eth stays the name. Chain, contract, and token id get added here when a drop is actually deployed. Manifold fits a plate drop. A pet NFT waits until the pet runs.",
  },
];

export function includesQuery(haystack: string, query: string) {
  return haystack.toLowerCase().includes(query.trim().toLowerCase());
}
