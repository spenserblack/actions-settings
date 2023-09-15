# Settings

[![CI](https://github.com/spenserblack/actions-settings/actions/workflows/ci.yml/badge.svg)](https://github.com/spenserblack/actions-settings/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/spenserblack/actions-settings/graph/badge.svg?token=BgX9l57lyg)](https://codecov.io/gh/spenserblack/actions-settings)

This is a GitHub action that helps manage settings via a `.github/settings.yml` file.

By using this file, settings are checked into version control, and outside contributors
are able to suggest changes to settings using pull requests.

## Safety

This action will not support all settings. This action effectively heightens push access
to admin access, so this action will only support settings that are reasonably safe for
a user trusted with push access to modify.

## Usage

### Using a PAT

You must generate a personal access token (PAT), as this action needs heightened permissions to modify
settings. It is recommended to create a fine-grained token and limit it to only relevant
repositories.

The PAT will need administration rights to modify

- The description
- Topics

### The settings file

The default path is `.github/settings.yml`.

```yaml
# The repository's description
description: "foo"
```

### Recommended workflow

```yaml
# .github/workflows/settings.yml
name: Update Settings

# Limit the workflow to only run when the main
# branch is changed and the settings file is one
# of those changes
on:
  push:
    branches:
      - "main"
    paths:
      - ".github/settings.yml"

jobs:
  settings:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: spenserblack/actions-settings@<REV>
        with:
          token: ${{ secrets.SETTINGS_PAT }}
```
