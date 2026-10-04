import json
from pathlib import Path

DATA_FILE = Path(__file__).resolve().parent / "data.json"

def load_json(path: str | Path = DATA_FILE):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def save_json(data, path: str | Path = DATA_FILE):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")

def get_lang_value(value, lang="en"):
    if isinstance(value, dict):
        return value.get(lang, value.get("en", next(iter(value.values()), "")))
    return value

def validate_structure(data):
    issues = []

    if "modules" not in data or not isinstance(data["modules"], dict):
        issues.append("Missing 'modules' object.")
        return issues

    for module_key, module_data in data["modules"].items():
        if not isinstance(module_data, dict):
            issues.append(f"Module '{module_key}' must be an object.")
            continue

        required_fields = ["title", "description", "status", "badge"]
        for field in required_fields:
            if field not in module_data:
                issues.append(f"Module '{module_key}' is missing '{field}'.")

        for field in ["title", "description", "status"]:
            if field in module_data and isinstance(module_data[field], dict):
                if "en" not in module_data[field] or "bn" not in module_data[field]:
                    issues.append(f"Module '{module_key}' field '{field}' requires both 'en' and 'bn' values.")

    return issues

def ensure_module_entry(module_key, title_en, title_bn, description_en, description_bn, status_en="Ready", status_bn="প্রস্তুত"):
    data = load_json()
    modules = data.setdefault("modules", {})

    modules[module_key] = {
        "title": {"en": title_en, "bn": title_bn},
        "description": {"en": description_en, "bn": description_bn},
        "status": {"en": status_en, "bn": status_bn},
        "badge": module_key,
    }

    save_json(data)
    return modules[module_key]
