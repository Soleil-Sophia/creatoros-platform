import type { SourcePack } from '../types/authority';

export const exampleAuthoritySources: SourcePack[] = [
  {
    title: 'GitHub Copilot — Increasing Test Coverage in Engineering Teams',
    sourceType: 'engineering_blog',
    url: 'https://github.blog/example-copilot-test-coverage',
    body: `GitHub Copilot can dramatically accelerate the authoring of unit tests, integration tests, and edge-case scenarios for engineering teams that already have a structured testing culture.

In a benchmark across multiple internal repositories, teams using Copilot generated test stubs ~55% faster than teams writing tests manually. The largest gains appeared on well-typed codebases with clear function boundaries and existing test fixtures.

However, raw test count is not the right metric. Coverage percentage on its own can be gamed by generating shallow assertions on trivially-reachable branches. Teams that combined Copilot-generated drafts with explicit review checklists, CI/CD enforcement, and a clear definition of "business-critical paths" saw real improvements in change failure rate.

Teams that treated Copilot as a replacement for test design — rather than a drafting accelerator — saw test suites grow in size without a corresponding drop in production incidents. In several cases, the new tests asserted implementation details and made refactors more expensive.

Recommended pattern:
1. Define which modules are business-critical.
2. Have engineers draft the assertion intent first.
3. Use Copilot to fill in scaffolding and edge cases.
4. Run mutation testing against critical paths to validate assertion strength.
5. Track test coverage AND change failure rate together — never coverage alone.

The system effect matters more than the tool. Copilot is a force multiplier on whatever testing process you already have. If the process is weak, you scale weakness. If the process is structured, you scale structure.`,
  },
];
