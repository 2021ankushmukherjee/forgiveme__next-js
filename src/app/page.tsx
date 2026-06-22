"use client";

import type { CSSProperties } from "react";
import { useRef, useState } from "react";

type ButtonPosition = {
  x: number;
  y: number;
};

const celebrationEmojis = ["💋", "❤️", "😘", "💕", "💖", "💌", "💗", "💞"];
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Home() {
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState<ButtonPosition>({ x: 58, y: 26 });
  const escapeZoneRef = useRef<HTMLDivElement>(null);

  const moveNoButton = () => {
    const zone = escapeZoneRef.current;

    if (!zone) {
      return;
    }

    const maxX = Math.max(zone.clientWidth - 128, 12);
    const maxY = Math.max(zone.clientHeight - 56, 12);

    setNoPosition({
      x: Math.round(12 + Math.random() * (maxX - 12)),
      y: Math.round(12 + Math.random() * (maxY - 12)),
    });
  };

  const dodgeCursor = (clientX: number, clientY: number) => {
    const zone = escapeZoneRef.current;

    if (!zone) {
      return;
    }

    const rect = zone.getBoundingClientRect();
    const buttonCenterX = rect.left + noPosition.x + 56;
    const buttonCenterY = rect.top + noPosition.y + 24;
    const distance = Math.hypot(clientX - buttonCenterX, clientY - buttonCenterY);

    if (distance < 132) {
      moveNoButton();
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#132526] text-[#fffaf1]">
      <section className="relative flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${basePath}/apology-background.png')` }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,223,173,0.34),transparent_34%),linear-gradient(110deg,rgba(16,32,33,0.82),rgba(71,29,45,0.58),rgba(16,32,33,0.76))]"
        />

        <div className="heart heart-one" aria-hidden="true" />
        <div className="heart heart-two" aria-hidden="true" />
        <div className="heart heart-three" aria-hidden="true" />

        <div className="relative z-10 grid w-full max-w-6xl items-center gap-6 sm:gap-8 lg:grid-cols-[1fr_420px]">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-black leading-[1.02] text-white drop-shadow-xl min-[380px]:text-5xl sm:text-7xl lg:text-8xl">
              I am sorry, my love.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#fff5de] sm:mt-6 sm:text-xl sm:leading-8">
              I know a sorry should be more than a word, so I made this little
              corner of the internet just for you. I miss your smile, I value
              your heart, and I want to love you better with more patience,
              honesty, and care.
            </p>
          </div>

          <div className="w-full rounded-[8px] border border-white/20 bg-[#fffaf1]/94 p-4 text-[#2c2022] shadow-2xl backdrop-blur sm:p-6">
            {!accepted ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a3145] sm:text-sm sm:tracking-[0.24em]">
                  One tiny question
                </p>
                <h2 className="mt-3 text-2xl font-black leading-tight min-[380px]:text-3xl sm:text-4xl">
                  Will you accept my sorry?
                </h2>

                <div
                  ref={escapeZoneRef}
                  className="relative mt-6 h-44 overflow-hidden rounded-[8px] border border-[#ead8cc] bg-[#fff3e6] sm:h-40"
                  onPointerMove={(event) =>
                    dodgeCursor(event.clientX, event.clientY)
                  }
                >
                  <button
                    type="button"
                    className="absolute left-4 top-1/2 z-10 h-12 -translate-y-1/2 rounded-[8px] bg-[#c72f50] px-8 text-base font-black text-white shadow-lg shadow-[#c72f50]/30 transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#ffb8c7]"
                    onClick={() => setAccepted(true)}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="absolute h-12 w-28 rounded-[8px] border border-[#b9717b] bg-white text-base font-black text-[#8a3145] shadow-md transition-transform duration-150 focus:outline-none"
                    style={{
                      left: noPosition.x,
                      top: noPosition.y,
                    }}
                    onMouseEnter={moveNoButton}
                    onFocus={moveNoButton}
                    onClick={(event) => {
                      event.preventDefault();
                      moveNoButton();
                    }}
                  >
                    No
                  </button>
                </div>
              </>
            ) : (
              <div className="accepted-celebration text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a3145] sm:text-sm sm:tracking-[0.24em]">
                  Sorry accepted
                </p>
                <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
                  Sending you a kiss and all my love.
                </h2>
                <p className="mt-7 text-base leading-7 text-[#5c4b4d]">
                  Thank you for giving me another chance. I will keep choosing
                  you with patience, care, and a little more magic every day.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {accepted ? (
        <div className="site-emoji-burst" aria-hidden="true">
          {Array.from({ length: 72 }, (_, index) => {
            const emoji = celebrationEmojis[index % celebrationEmojis.length];
            const column = (index * 37) % 100;
            const drift = index % 2 === 0 ? -48 : 48;

            return (
              <span
                className="site-flying-emoji"
                key={`${emoji}-${index}`}
                style={{
                  left: `${column}vw`,
                  animationDelay: `${(index % 24) * 80}ms`,
                  animationDuration: `${2.7 + (index % 7) * 0.22}s`,
                  fontSize: `${1.85 + (index % 5) * 0.24}rem`,
                  "--emoji-drift": `${drift}px`,
                  "--emoji-start": `${8 + (index % 4) * 18}px`,
                } as CSSProperties}
              >
                {emoji}
              </span>
            );
          })}
        </div>
      ) : null}
    </main>
  );
}
