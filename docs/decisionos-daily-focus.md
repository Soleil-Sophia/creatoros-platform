# DecisionOS Daily Focus

DecisionOS Daily Focus is a derived, explainable prioritization surface.

It recommends up to three next actions from currently visible attention signals.

## Inputs

- attention severity
- signal type
- recommendation priority
- acknowledge and snooze state

## Exclusions

Acknowledged signals and active snoozes are excluded until restored or expired.

## Boundary

Daily Focus does not create decisions, mutate recommendations, change canonical state, resolve blockers, or execute work. It recommends order only. Human judgment remains authoritative.
