import * as core from "@actions/core";
import { loadFile } from "./settings";
import { ZodError } from "zod";
import { Api } from "./api";
import { getOctokit, context } from "@actions/github";

async function run(): Promise<void> {
  const token = core.getInput("token", { required: true });
  const settingsPath = core.getInput("path", { required: true });

  let settings;
  try {
    settings = loadFile(settingsPath);
  } catch (error: unknown) {
    core.setFailed("Failed to load settings file");
    if (error instanceof ZodError) {
      error.errors.forEach((error) => {
        core.error(error.message);
      });
    } else {
      core.error(error as Error);
    }
    return;
  }

  const octokit = getOctokit(token);
  const { owner, repo } = context.repo;
  const api = new Api(octokit, owner, repo);

  await api.modifyRepository({
    description: settings.description,
  });
}

run();
