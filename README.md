# NEXUS

**A private RicheyWorks studio vault for exploring projects, art plates and studio notes.**

NEXUS is a React/TanStack Start web app with a curated project wall, searchable
studio material and local interactive studies. Project cards link to their
separate repositories; the card copy is bundled content, not a live GitHub audit.

[Run locally](#run-locally) · [Explore the source](#explore-the-source) ·
[Validation](#validation) · [Status](#status)

## Run locally

Use Node.js 22 or a newer runtime compatible with the versions in
[package.json](package.json), then install the locked dependencies:

```sh
git clone https://github.com/RicheyWorks/nexus.git
cd nexus
npm ci
npm run dev
```

The development script starts the app at port 8080 through the repository's
environment wrapper. [startup.sh](startup.sh) is the original app-builder startup
contract. The Grok preview bridge and branding helpers remain part of this
checkout; standalone hosting has separate environment requirements.

## Explore the source

| Entry | Purpose |
| --- | --- |
| [src/components/vault.tsx](src/components/vault.tsx) | Studio view and interactions |
| [src/lib/studio-data.ts](src/lib/studio-data.ts) | Project cards, art plates and dated studio notes |
| [src/components/bench.tsx](src/components/bench.tsx) | Interactive studio bench |
| [src/components/quire.tsx](src/components/quire.tsx) | Reading surface |
| [public/studio/](public/studio/) | Reserved artwork paths; some tracked image files are empty placeholders |
| [scripts/](scripts/) | Environment, preview and validation helpers |

## Validation

```sh
npm run typecheck
npm test
```

For application changes, follow [AGENTS.md](AGENTS.md) for build and browser QA.
The production build script also runs database migration setup; review the
environment and migration configuration before using it. The README pass does
not certify hosting, authentication or the readiness of linked projects.

## Status

The vault has implemented UI, procedural canvas studies and bundled content.
Some reserved image assets are empty and should be replaced before depending on
them in a release. Art plates are studio studies;
they do not represent minted tokens or a running copy of another project.
RicheyWorks project repositories are private and their links require authorized
GitHub access. Verify a linked project's own README and code before relying on
its feature or release status. RicheyWorks code is licensed under [MIT](LICENSE).
