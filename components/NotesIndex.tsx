"use client";
import { useMemo, useState } from "react";
import { noteCategories, notes, type Note } from "@/lib/notes";
type FilterKey = "language" | "university" | "type" | "author";
type Filters = Record<FilterKey, string>;
const emptyFilters: Filters = { language: "", university: "", type: "", author: "" };
const unique = (values: string[]) => [...new Set(values)].sort((a, b) => a.localeCompare(b));
const authors = unique(notes.flatMap((note) => note.authors));
const authorOptions = ["Davide Lanza", ...authors.filter((author) => author !== "Davide Lanza")];
const filterOptions = {
  language: unique(notes.flatMap((note) => note.languages)),
  university: unique(notes.map((note) => note.university)),
  type: unique(notes.map((note) => note.type)),
  author: authorOptions,
};

function NoteRow({ note }: { note: Note }) {
  const showAuthors = note.authors.length > 1 || note.authors[0] !== "Davide Lanza";
  return (
    <a href={`/notes/${note.file}`} className="note-row">
      <div className="note-primary">
        <div className="note-heading">
          <span>{note.title}</span>
          {note.draft && <strong className="draft-badge">Draft</strong>}
          {note.handwritten && <strong className="handwritten-badge">Handwritten</strong>}
        </div>
        <small className="note-byline">
          {note.year}
          {showAuthors && `. Authors: ${note.authors.join(", ")}`}
        </small>
      </div>
      <div className="note-tags" aria-label="Document metadata">
        {note.languages.map((value) => (
          <small key={value}>{value}</small>
        ))}
        <small>{note.university}</small>
        <small>{note.type}</small>
      </div>
      <b>PDF ↓</b>
    </a>
  );
}

export function NotesIndex() {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const filteredNotes = useMemo(
    () =>
      notes.filter(
        (note) =>
          (!filters.language || note.languages.includes(filters.language)) &&
          (!filters.university || note.university === filters.university) &&
          (!filters.type || note.type === filters.type) &&
          (!filters.author || note.authors.includes(filters.author)),
      ),
    [filters],
  );
  const hasFilters = Object.values(filters).some(Boolean);
  return (
    <>
      <div className="notes-filters" aria-label="Filter notes">
        {(Object.keys(filterOptions) as FilterKey[]).map((key) => (
          <label key={key}>
            <span>{key}</span>
            <select
              value={filters[key]}
              onChange={(event) =>
                setFilters((current) => ({ ...current, [key]: event.target.value }))
              }
            >
              <option value="">All</option>
              {filterOptions[key].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        ))}
        <button type="button" onClick={() => setFilters(emptyFilters)} disabled={!hasFilters}>
          Clear filters
        </button>
      </div>
      <p className="notes-count" aria-live="polite">
        {filteredNotes.length} {filteredNotes.length === 1 ? "document" : "documents"}
      </p>
      {noteCategories.map((category) => {
        const categoryNotes = filteredNotes.filter((note) => note.category === category);
        return categoryNotes.length ? (
          <section className="notes-group" key={category}>
            <h2>{category}</h2>
            <div>
              {categoryNotes.map((note) => (
                <NoteRow note={note} key={note.file} />
              ))}
            </div>
          </section>
        ) : null;
      })}
      {!filteredNotes.length && <div className="notes-empty">No notes match these filters.</div>}
    </>
  );
}
