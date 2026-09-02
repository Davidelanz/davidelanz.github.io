"use client";

import { useEffect, useState } from "react";

type TerminalTitleProps = { text: string };

const initialDelayMs = 135;
const averageCharacterDelayMs = 100;
const timingVariationRangeMs = 80;
const maximumNegativeVariationMs = 25;
const characterSeedMultiplier = 20;
const positionSeedMultiplier = 30;

function getCharacterDelay(character: string, index: number) {
  // Produce subtle, repeatable variation without risking a server/client mismatch.
  const timingSeed =
    character.charCodeAt(0) * characterSeedMultiplier + index * positionSeedMultiplier;
  const variationMs = (timingSeed % timingVariationRangeMs) - maximumNegativeVariationMs;
  return averageCharacterDelayMs + variationMs;
}

export function TerminalTitle({ text }: TerminalTitleProps) {
  const [visibleCharacterCount, setVisibleCharacterCount] = useState(0);
  const isComplete = visibleCharacterCount === text.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisibleCharacterCount(text.length);
      return;
    }
    setVisibleCharacterCount(0);
  }, [text]);

  useEffect(() => {
    if (isComplete) return;

    const nextCharacter = text[visibleCharacterCount];
    const delay =
      visibleCharacterCount === 0
        ? initialDelayMs
        : getCharacterDelay(nextCharacter, visibleCharacterCount);
    const timer = window.setTimeout(
      () => setVisibleCharacterCount((currentCount) => currentCount + 1),
      delay,
    );

    return () => window.clearTimeout(timer);
  }, [isComplete, text, visibleCharacterCount]);

  return (
    <span className="terminal-title" aria-label={text}>
      <span className="terminal-title__measure" aria-hidden="true">
        {text}_
      </span>
      <span className="terminal-title__output" aria-hidden="true">
        {text.slice(0, visibleCharacterCount)}
        {isComplete && <span className="terminal-title__cursor">_</span>}
      </span>
    </span>
  );
}
