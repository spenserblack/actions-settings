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

### The settings file

The default path is `.github/settings.yml`.

```yaml
# The repository's description
description: "foo"
topics:
  - topic-1
  - topic-2
labels:
  # Just provide the name to use a randomized color
  - invalid
  # Or specify the color
  - name: triage
    # Make sure to quote the color so that it is always interpreted as a string
    color: "ABC123"
```

### Permissions

Not all settings can be modified with `secrets.GITHUB_TOKEN`, and some will require setting up a
personal access token (PAT). Unless otherwise stated, the "write" permission level is required, not
the read permission level.

|   setting   | required permission | needs PAT[^1] |
| :---------: | :-----------------: | :-----------: |
| description |   administration    |      yes      |
|   topics    |   administration    |      yes      |
|   labels    |       issues        |      no       |

[^1]: If a PAT is not needed, you can use the `permissions` setting in the workflow file. See [the documentation for workflow syntax][workflow-syntax-docs] for more details.

For more information, you can review the [permissions required for GitHub Apps][permissions-docs].

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

[permissions-docs]: https://docs.github.com/en/rest/overview/permissions-required-for-github-apps
[workflow-syntax-docs]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions
