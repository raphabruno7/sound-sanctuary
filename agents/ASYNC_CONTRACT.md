# Async Governance Contract – Sound Sanctuary

This document defines the official PR lifecycle and agent interaction model.

---

## Core Principle

Agents implement.
Supervisor evaluates.
Only the human merges.

Agents must NEVER ask for merge approval.

---

## PR Lifecycle

1. Agent completes task.
2. Agent opens PR.
3. Agent stops.
4. Supervisor reviews.
5. Supervisor classifies PR as:
   - MERGE
   - REQUEST CHANGES
   - BLOCKED
6. Human performs merge if approved.

---

## Agent Rules (Mandatory)

After opening a PR, agents must:

- NOT ask "Can I merge?"
- NOT request approval
- NOT self-merge
- NOT modify main directly
- Wait for Supervisor decision

If Supervisor returns REQUEST CHANGES:
- Agent applies changes
- Updates PR
- Stops again

---

## Supervisor Role

Supervisor must:

- Review ALL open PRs in batch
- Validate against docs/QA_RELEASE.md
- Ensure scope integrity
- Ensure no schema changes unless required
- Run ./scripts/agent_check.sh if necessary
- Return structured decision list

Supervisor must NOT:
- Implement new features
- Suggest scope expansion
- Modify unrelated files

---

## Human Role

The human:

- Triggers Supervisor review
- Executes merge
- Resolves blockers
- Provides strategic direction

The human does NOT:
- Manually fix agent code unless necessary
- Micro-manage implementation details

---

## Scope Discipline Rule

Each agent:
- One task
- One branch
- One PR
- One responsibility

No cross-branch editing.

---

## Conflict Resolution

If multiple PRs modify same file:
- Merge lowest-risk PR first
- Rebase remaining PRs
- Re-run Supervisor review

---

## Stability Rule

Main branch must always:
- Build successfully
- Pass lint
- Pass TypeScript
- Contain no experimental code

---

This governance model ensures:
- Clean parallelism
- Reduced cognitive load
- Professional workflow discipline
- Clear responsibility boundaries
