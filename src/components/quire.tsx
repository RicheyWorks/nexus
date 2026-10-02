import type { ShortStory } from "@/lib/studio-data";

const CLOTH = ["#6e2f38", "#1e3d34", "#24324a", "#5c3b22", "#4a2e3d"];

export function StoryCase({
  stories,
  onOpen,
}: {
  stories: ShortStory[];
  onOpen: (story: ShortStory) => void;
}) {
  return (
    <section className="quire-room" aria-label="Short stories">
      <header className="quire-room-head">
        <p className="quire-kicker">Private press</p>
        <h2>Short stories</h2>
        <p>
          {stories.length === 0
            ? "The shelf is empty. The next piece is yours."
            : "Fiction. The repos are the record. These are not."}
        </p>
      </header>
      {stories.length > 0 ? (
        <div className="quire-shelf">
          {stories.map((story, index) => (
            <button
              key={story.id}
              type="button"
              className="quire-spine"
              style={{ background: CLOTH[index % CLOTH.length] }}
              onClick={() => onOpen(story)}
            >
              {story.title}
            </button>
          ))}
        </div>
      ) : (
        <BlankLeaf />
      )}
    </section>
  );
}

function BlankLeaf() {
  return (
    <div className="quire-book">
      <div className="quire-page quire-title-page">
        <p className="quire-press">Nexus</p>
        <Ornament />
        <h3>Short stories</h3>
        <p className="quire-italic">The shelf is empty.</p>
        <p className="quire-italic">The next piece is yours.</p>
        <Ornament />
        <p className="quire-colophon">A private press. Not a mint.</p>
      </div>
    </div>
  );
}

export function StoryLeaf({ story, onClose }: { story: ShortStory; onClose: () => void }) {
  return (
    <div className="quire-overlay" onClick={onClose}>
      <div
        className="quire-book quire-book-open"
        role="dialog"
        aria-modal="true"
        aria-label={story.title}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="quire-close" onClick={onClose}>
          Close the book
        </button>
        <div className="quire-spread">
          <div className="quire-page quire-title-page">
            <p className="quire-press">Nexus</p>
            <Ornament />
            <h3>{story.title}</h3>
            <p className="quire-italic">{story.lede}</p>
            <p className="quire-colophon">A short story · {story.minutes}</p>
          </div>
          <div className="quire-page quire-prose" lang="en">
            <p className="quire-running">{story.title}</p>
            {story.paragraphs.map((paragraph, index) => (
              <p key={paragraph} className={index === 0 ? "quire-first" : undefined}>
                {paragraph}
              </p>
            ))}
            <p className="quire-end" aria-hidden="true">
              · · ·
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Ornament() {
  return (
    <div className="quire-ornament" aria-hidden="true">
      <i />
    </div>
  );
}
