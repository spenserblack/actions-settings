import type { getOctokit } from "@actions/github";

export type Octokit = ReturnType<typeof getOctokit>;

export interface Label {
  name: string;
  color?: string;
  description?: string;
}

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

  /**
   * Replaces a repository's topics.
   */
  public async replaceTopics(topics: string[]): Promise<void> {
    await this.octokit.request("PUT /repos/{owner}/{repo}/topics", {
      owner: this.owner,
      repo: this.repo,
      names: topics,
    });
  }

  /**
   * Get a repository's labels.
   */
  public async getLabels(): Promise<Set<string>> {
    const { data } = await this.octokit.request("GET /repos/{owner}/{repo}/labels", {
      owner: this.owner,
      repo: this.repo,
    });
    const labels = data.map(({ name }) => name);
    return new Set(labels);
  }

  /**
   * Updates the repository's labels.
   */
  public async updateLabels(labels: Array<string | Label>): Promise<void> {
    const existing = await this.getLabels();
    const normalized = labels.map(Api.normalizeLabel);

    const promises = normalized.map(async (label) => {
      const exists = existing.has(label.name);
      if (!exists) {
        return await this.createLabel(label);
      }
      // NOTE If the color is not set, do not update it.
      if (!label.color) {
        return;
      }
      return await this.updateLabel(label);
    });

    await Promise.all(promises);
  }

  /**
   * Creates a label.
   */
  private async createLabel(label: Label): Promise<void> {
    await this.octokit.request("POST /repos/{owner}/{repo}/labels", {
      owner: this.owner,
      repo: this.repo,
      ...label,
    });
  }

  /**
   * Updates a label.
   */
  private async updateLabel(label: Label): Promise<void> {
    await this.octokit.request("PATCH /repos/{owner}/{repo}/labels/{name}", {
      owner: this.owner,
      repo: this.repo,
      ...label,
    });
  }

  private static normalizeLabel(label: string | Label): Label {
    return typeof label === "string" ? { name: label } : label;
  }
}
