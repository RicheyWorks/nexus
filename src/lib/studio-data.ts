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
    id: "blackjack",
    title: "BlackJack Pro",
    tagline: "Play-money table. The rules engine has no UI in it.",
    status: "Private · desktop 1.0.0",
    type: "Table game",
    tech: ["Java"],
    description:
      "Six-deck shoe, 3:2, late surrender, dealer stands on soft 17. Swing is the desktop. A libGDX front end shares the same engine, including an Android build. The real-money platform folder is a design skeleton and is not a product.",
    highlights: [
      "Twenty-four table looks, shared by Swing and libGDX",
      "393 tests on the README, counted 2 Oct 2026",
      "Windows installer built that day. Not yet installed. The 1.0.0 tag was not on the README.",
    ],
    snippet: `gradlew.bat :swing:run

Repo is private:
https://github.com/RicheyWorks/BlackJackPro

Browser port, separate repo:
https://github.com/RicheyWorks/BlackjackPro-web`,
    repo: "https://github.com/RicheyWorks/BlackJackPro",
    motif: "ring",
    post: "BlackJack Pro is a play-money table. The rules engine has no UI in it.\n\nSwing desktop is at 1.0.0. The real-money folder is a design skeleton, not a casino.\n\nThe repo is private.",
  },
  {
    id: "sudoku",
    title: "SudokuPro",
    tagline: "One board, three clients. The server keeps the solution.",
    status: "Private",
    type: "Multiplayer puzzle",
    tech: ["Java", "Spring"],
    description:
      "Spring Boot, PostgreSQL, and Redis. A JavaFX client and a browser table talk to the same API. Duels, a daily, and a weekly. Hardening passes 27 through 30 landed on main on 2 Oct 2026.",
    highlights: [
      "The solution never leaves the server",
      "Redis outage is answered, not ignored",
      "Web client is played, not only read",
    ],
    snippet: `https://github.com/RicheyWorks/sudokupro

main after pass 30: 827fbdc`,
    repo: "https://github.com/RicheyWorks/sudokupro",
    motif: "maze",
    post: "SudokuPro keeps the solution on the server.\n\nSpring Boot, a JavaFX client, and a browser table on the same API. Passes 27 through 30 are on main.\n\ngithub.com/RicheyWorks/sudokupro",
  },
  {
    id: "wholehog",
    title: "WholeHog",
    tagline: "Fourteen engines, one organism.",
    status: "Private",
    type: "Integration",
    tech: ["Java"],
    description:
      "The door into the CSRBT ecosystem. The index, the store, the wire, the fleet, and the chaos seam are stood up together and checked against one oracle. Start here if one repo is not enough.",
    highlights: [
      "Plain-English map is ECOSYSTEM.md",
      "SmokeHouse is the store. CSRBT is the index.",
      "A fault plan can crash a write and replay it once",
    ],
    snippet: `https://github.com/RicheyWorks/WholeHog/blob/main/ECOSYSTEM.md

Exhibit:
./gradlew run`,
    repo: "https://github.com/RicheyWorks/WholeHog",
    motif: "fern",
    post: "WholeHog is the door. Fourteen engines, one organism.\n\nIf a single repo is not enough, start with the plain-English map.\n\ngithub.com/RicheyWorks/WholeHog",
  },
  {
    id: "daedalus",
    title: "Daedalus 2",
    tagline: "Maze engine. The lantern plate is not the demo.",
    status: "Private",
    type: "Maze engine",
    tech: ["Java", "Spring"],
    description:
      "Multi-module maze generation and solving. The Hilbert lantern on the wall is a studio plate of this work, not a running copy of the engine.",
    highlights: [
      "Generation and solving are the product",
      "The picture on the wall does not replace the repo",
    ],
    snippet: `https://github.com/RicheyWorks/Daedalus2`,
    repo: "https://github.com/RicheyWorks/Daedalus2",
    motif: "maze",
    post: "Daedalus 2 is the maze engine.\n\nThe lantern plate is a picture of the idea. The engine is the repo.\n\ngithub.com/RicheyWorks/Daedalus2",
  },
  {
    id: "dungeon",
    title: "AI Dungeon Master",
    tagline: "A table engine with a Spring door.",
    status: "Private",
    type: "Game server",
    tech: ["Java", "Spring"],
    description:
      "Java core, Spring REST and STOMP, and clients for web and mobile. The repo is private. This card does not claim a finished campaign or a player count.",
    highlights: [
      "The engine is separate from the chat client",
      "No invented session count on this wall",
    ],
    snippet: `https://github.com/RicheyWorks/ai-dungeon-master`,
    repo: "https://github.com/RicheyWorks/ai-dungeon-master",
    motif: "ring",
    post: "AI Dungeon Master is a Java table engine with a Spring door.\n\nThe repo is private. No player count on the card.\n\ngithub.com/RicheyWorks/ai-dungeon-master",
  },
  {
    id: "csrbt",
    title: "CSRBT field kit",
    tagline: "A tree that changes its mind, and a phone kit for a wet meadow.",
    status: "Private",
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
    status: "Private flagship",
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
    status: "Private",
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
    id: "log-oct2",
    title: "What moved on 2 Oct",
    date: "2026-10-02",
    read: "2 min",
    tags: ["Java"],
    snippet: "Four kit grammars, four Sudoku passes, a still pet, and a blackjack desktop at 1.0.0.",
    body: "CSRBT main moved through ADR-273 to ADR-276: a list of numbers is one grammar, a coordinate is one grammar, a check on a widget is not a check on the plant, and a check must not write the value it then reads. ComputerPets main is the reduced-motion pass: the main pet and a house visitor can be drawn still. SudokuPro took hardening passes 27 through 30 onto main, ending at 827fbdc. BlackJack Pro's Swing desktop is at 1.0.0. The Windows installer was built and not installed. The README at that commit still said the tag had not been cut.",
  },
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
