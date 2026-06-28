import shutil
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from scripts.utils import parse_skill_md


class ParseSkillMdTests(unittest.TestCase):
    def _write_skill(self, frontmatter: str) -> Path:
        tmp_dir = Path(tempfile.mkdtemp(prefix="skill-creator-test-"))
        self.addCleanup(shutil.rmtree, tmp_dir, ignore_errors=True)
        skill_dir = tmp_dir / "example-skill"
        skill_dir.mkdir()
        (skill_dir / "SKILL.md").write_text(frontmatter + "\n# Body\n")
        return skill_dir

    def test_defaults_when_name_and_description_are_empty_strings(self) -> None:
        skill_dir = self._write_skill(
            "---\nname: \"\"\ndescription: \"\"\n---"
        )
        name, description, _ = parse_skill_md(skill_dir)

        self.assertEqual(name, "example-skill")
        self.assertEqual(description, "No description provided.")

    def test_defaults_when_name_and_description_are_null(self) -> None:
        skill_dir = self._write_skill(
            "---\nname: null\ndescription: ~\n---"
        )
        name, description, _ = parse_skill_md(skill_dir)

        self.assertEqual(name, "example-skill")
        self.assertEqual(description, "No description provided.")

    def test_preserves_non_empty_values(self) -> None:
        skill_dir = self._write_skill(
            "---\nname: my-skill\ndescription: useful skill\n---"
        )
        name, description, _ = parse_skill_md(skill_dir)

        self.assertEqual(name, "my-skill")
        self.assertEqual(description, "useful skill")


if __name__ == "__main__":
    unittest.main()
