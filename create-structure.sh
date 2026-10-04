#!/bin/bash
# create-structure.sh
# Script to create the National Workforce Grid project structure under ~/nwg/

ROOT=~/nwg

# Create root directory if it doesn't exist
if [ ! -d "$ROOT" ]; then
  mkdir -p "$ROOT"
  echo "Created root directory: $ROOT"
else
  echo "Using existing root directory: $ROOT"
fi

cd "$ROOT" || exit

# Top-level files
touch index.html data.json add.py validate.py _lib.py run.sh README.md CONTRIBUTING.md DEPLOYMENT.md ARCHITECTURE.md package.json .gitignore

# .github structure
mkdir -p .github/workflows .github/ISSUE_TEMPLATE
touch .github/workflows/validate.yml
touch .github/ISSUE_TEMPLATE/bug_report.md .github/ISSUE_TEMPLATE/feature_request.md

# assets structure
mkdir -p assets/css assets/js assets/images
touch assets/css/style.css assets/css/theme.css
touch assets/js/lang.js assets/js/ui.js assets/js/main.js
touch assets/images/logo.svg assets/images/splash.svg
touch assets/.gitkeep

# includes structure
mkdir -p includes
touch includes/header.html includes/menu.html includes/footer.html

# modules structure
mkdir -p modules/identity modules/governance modules/geogrid modules/reporting modules/analytics modules/command modules/ledger modules/zone modules/core
touch modules/identity/README.md
touch modules/governance/README.md
touch modules/geogrid/README.md
touch modules/reporting/README.md
touch modules/analytics/README.md
touch modules/command/README.md
touch modules/ledger/README.md
touch modules/zone/README.md
touch modules/core/README.md

echo "✅ Project structure created successfully under $ROOT"
