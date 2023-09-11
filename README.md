# Settings

This is a GitHub action that helps manage settings via a `.github/settings.yml` file.

By using this file, settings are checked into version control, and outside contributors
are able to suggest changes to settings using pull requests.

## Safety

This action will not support all settings. This action effectively heightens push access
to admin access, so this action will only support settings that are reasonably safe for
a user trusted with push access to modify.
