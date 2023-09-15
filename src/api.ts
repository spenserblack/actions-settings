import type { getOctokit } from "@actions/github";

export type Octokit = ReturnType<typeof getOctokit>;

export class Api {
  constructor(
    private readonly octokit: Octokit,
    private readonly owner: string,
    private readonly repo: string,
  ) {}

  /**
   * Modifies the user's repository.
   *
   * Requires a token with permission for repository administration.
   */
  public async modifyRepository(attrs: Record<string, any>): Promise<void> {
    await this.octokit.request("PATCH /repos/{owner}/{repo}", {
      owner: this.owner,
      repo: this.repo,
      ...attrs,
    });
  }
}
