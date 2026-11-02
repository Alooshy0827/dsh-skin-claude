#!/usr/bin/env python3
"""Build and verify first; emit a reproducible, self-contained DSH plugin ZIP."""
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import zipfile

ROOT = Path(__file__).resolve().parents[1]


def main():
    node = shutil.which("node")
    if not node:
        raise SystemExit("Node.js 20+ is required")
    subprocess.run([node, "scripts/build.mjs", "--check"], cwd=ROOT, check=True)
    tests = sorted(str(p.relative_to(ROOT)) for p in (ROOT / "tests").glob("*.test.mjs"))
    subprocess.run([node, "--test", *tests], cwd=ROOT, check=True)
    package = json.loads((ROOT / "package.json").read_text())
    name = f"{package['name']}-{package['version']}"
    files = ["package.json", "cordis.patch.yml", "icon.svg", "LICENSE", "INSTALL.md",
             "lib/index.js", "lib/client.js"]
    checksums = {file: hashlib.sha256((ROOT / file).read_bytes()).hexdigest() for file in files}
    release = ROOT / "releases"
    release.mkdir(exist_ok=True)
    candidate = release / f".{name}.candidate.zip"
    archive = release / f"{name}.zip"
    with zipfile.ZipFile(candidate, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as output:
        for file in files:
            info = zipfile.ZipInfo(f"{name}/{file}", date_time=(2026, 1, 1, 0, 0, 0))
            info.external_attr = 0o100644 << 16
            info.compress_type = zipfile.ZIP_DEFLATED
            output.writestr(info, (ROOT / file).read_bytes())
    if archive.exists() and archive.read_bytes() != candidate.read_bytes():
        candidate.unlink()
        raise SystemExit("Refusing to overwrite a different same-version release; increment package.json version.")
    candidate.replace(archive)
    report = {"name": package["name"], "version": package["version"],
              "declared_dsh_version": package["engines"]["dsh"],
              "archive": archive.name, "archive_sha256": hashlib.sha256(archive.read_bytes()).hexdigest(),
              "files": checksums}
    (release / f"{name}.sha256.json").write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
