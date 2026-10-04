#!/usr/bin/env python3
from _lib import load_json, validate_structure

def main():
    print("Checking data.json structure...\n")
    data = load_json()
    issues = validate_structure(data)

    if not issues:
        print("Validation passed: data.json is structurally valid.")
        return 0

    print("Validation issues found:\n")
    for issue in issues:
        print(f"- {issue}")
    return 1

if __name__ == "__main__":
    raise SystemExit(main())
