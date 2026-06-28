"""Shared utilities for skill-creator scripts."""

from pathlib import Path


_DEFAULT_DESCRIPTION = "No description provided."
_NULL_LITERALS = {"null", "~"}


def _strip_inline_comment(value: str) -> str:
    """Strip YAML inline comments while preserving quoted content."""
    in_single = False
    in_double = False
    for i, char in enumerate(value):
        if char == "'" and not in_double:
            in_single = not in_single
        elif char == '"' and not in_single:
            in_double = not in_double
        elif char == "#" and not in_single and not in_double:
            if i == 0 or value[i - 1].isspace():
                return value[:i].rstrip()
    return value


def _parse_frontmatter_value(value: str) -> str:
    """Parse a frontmatter scalar value, treating YAML null literals as empty."""
    cleaned = value.strip()
    if not cleaned:
        return ""

    cleaned = _strip_inline_comment(cleaned)
    if not cleaned:
        return ""

    is_quoted = (cleaned.startswith('"') and cleaned.endswith('"')) or (
        cleaned.startswith("'") and cleaned.endswith("'")
    )
    if is_quoted:
        return cleaned[1:-1].strip()

    if cleaned.lower() in _NULL_LITERALS:
        return ""
    return cleaned


def parse_skill_md(skill_path: Path) -> tuple[str, str, str]:
    """Parse a SKILL.md file, returning (name, description, full_content)."""
    content = (skill_path / "SKILL.md").read_text()
    lines = content.split("\n")

    if lines[0].strip() != "---":
        raise ValueError("SKILL.md missing frontmatter (no opening ---)")

    end_idx = None
    for i, line in enumerate(lines[1:], start=1):
        if line.strip() == "---":
            end_idx = i
            break

    if end_idx is None:
        raise ValueError("SKILL.md missing frontmatter (no closing ---)")

    name = ""
    description = ""
    frontmatter_lines = lines[1:end_idx]
    i = 0
    while i < len(frontmatter_lines):
        line = frontmatter_lines[i]
        if line.startswith("name:"):
            name = _parse_frontmatter_value(line[len("name:"):])
        elif line.startswith("description:"):
            value = line[len("description:"):].strip()
            # Handle YAML multiline indicators (>, |, >-, |-)
            if value in (">", "|", ">-", "|-"):
                continuation_lines: list[str] = []
                i += 1
                while i < len(frontmatter_lines) and (frontmatter_lines[i].startswith("  ") or frontmatter_lines[i].startswith("\t")):
                    continuation_lines.append(frontmatter_lines[i].strip())
                    i += 1
                description = " ".join(continuation_lines)
                continue
            else:
                description = _parse_frontmatter_value(value)
        i += 1

    parsed_name = name.strip() or skill_path.name.strip() or "unnamed-skill"
    parsed_description = description.strip() or _DEFAULT_DESCRIPTION
    return parsed_name, parsed_description, content
