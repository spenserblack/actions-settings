import { z } from "zod";
import { load as loadYaml } from "js-yaml";
import { readFileSync } from "fs";

const SettingsSchema = z.object({
  description: z.optional(z.string()),
  topics: z.optional(z.array(z.string())),
  labels: z.optional(
    z.array(
      z.union([
        z.string(),
        z.object({
          name: z.string(),
          color: z.optional(z.string()),
          description: z.optional(z.string()),
        }),
      ]),
    ),
  ),
});

export type Settings = z.infer<typeof SettingsSchema>;

export function parse(value: unknown): Settings {
  return SettingsSchema.parse(value);
}

export function loadFile(path: string): Settings {
  const data = loadYaml(readFileSync(path, "utf8"));
  return parse(data);
}
