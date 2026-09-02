import type { CSSProperties } from "react";

type TerminalTitleProps = {
  text: string;
};

type TerminalTitleStyle = CSSProperties & {
  "--typing-duration": string;
};

export function TerminalTitle({ text }: TerminalTitleProps) {
  const initialDelayMs = 135;
  const averageCharacterDelayMs = 100;
  const timingVariationRangeMs = 80;
  const maximumNegativeVariationMs = 25;
  const characterSeedMultiplier = 20;
  const positionSeedMultiplier = 30;

  let elapsed = initialDelayMs;
  const characters = Array.from(text).map((character, index) => {
    const delay = elapsed;

    // Derive a small, repeatable timing variation from the character and its position.
    // This feels less mechanical than a fixed interval without changing between renders.
    const timingSeed =
      character.charCodeAt(0) * characterSeedMultiplier + index * positionSeedMultiplier;
    const characterDelayVariationMs =
      (timingSeed % timingVariationRangeMs) - maximumNegativeVariationMs;

    elapsed += averageCharacterDelayMs + characterDelayVariationMs;
    return { character, delay };
  });
  const style: TerminalTitleStyle = {
    "--typing-duration": `${elapsed}ms`,
  };

  return (
    <span className="terminal-title" style={style} aria-label={text}>
      <span className="terminal-title__text" aria-hidden="true">
        {characters.map(({ character, delay }, index) => (
          <span
            className="terminal-title__character"
            style={{ animationDelay: `${delay}ms` }}
            key={`${character}-${index}`}
          >
            {character}
          </span>
        ))}
      </span>
      <span className="terminal-title__cursor" aria-hidden="true">
        _
      </span>
    </span>
  );
}
