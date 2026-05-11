# acc-deepbook-course

A **content plugin** for the [Agentic Community College (ACC)](https://github.com/alilloig/agentic-community-college) framework. This repo ships a curated set of DeepBook lessons; the ACC plugin owns the runtime that actually drives them.

This repository was previously `sui-mcp-course` and bundled both runtime + content. The runtime moved to `agentic-community-college` so the same engine can host courses for Walrus, Seal, Move, etc. without a fork.

## How it plugs in

`.claude-plugin/plugin.json` declares:

```json
{
  "name": "acc-deepbook-course",
  "accContent": { "lessons": "./lessons/" }
}
```

When this plugin is enabled alongside `agentic-community-college`, ACC scans `~/.claude/plugins/installed_plugins.json` at startup, finds this manifest's `accContent.lessons`, and aggregates every lesson under `lessons/<slug>/` into its catalog.

## What's inside

```
acc-deepbook-course/
├── .claude-plugin/plugin.json    name=acc-deepbook-course, accContent declared, no executable bits
├── README.md                     this file
├── CLAUDE.md                     working notes for Claude when authoring lessons here
└── lessons/                      one directory per lesson, each a hard copy of a reference app
                                  plus its ordered section sequence, tests, and HTML artifact
```

The first lesson, `01-market-stats`, is authored by ACC's `lesson-creator` skill against the reference app at `~/workspace/deepbook-sandbox-evaluation-apps/independent/01-market-stats/`.

## Authoring a new lesson

Don't write lesson files by hand. From inside any ACC-enabled session, invoke the `lesson-creator` skill (`agentic-community-college:lesson-creator`). Point it at this repo and a reference codebase, and it scaffolds the whole lesson directory — `lesson.json`, `sections.json`, `sections/*.md`, `tests/`, `reference-app/`, `artifact/template.html`, and the validation pass — for you.

## Running a lesson

1. Install (or enable) both this plugin **and** `agentic-community-college` in Claude Code.
2. Run `/agentic-community-college:start` from any project directory.
3. Pick a lesson by namespaced slug (e.g. `acc-deepbook-course@local/01-market-stats`).
4. ACC drives you through it — pick `learning` or `explanatory` mode, set personalization if any, and walk the section sequence.
