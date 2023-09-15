import { describe, expect, test } from "@jest/globals";
import { add } from "../src/index";

describe("it works", () => {
  test("it works", () => {
    expect(add(2, 2)).toBe(4);
  });
});
