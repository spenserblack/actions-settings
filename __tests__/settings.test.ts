import { describe, expect, test } from "@jest/globals";
import { parse } from "../src/settings";
import { ZodError } from "zod";

describe(".parse()", () => {
  test.each([
    [{}, {}],
    [{ description: "foo" }, { description: "foo" }],
  ])("is valid with %p", (input, expected) => {
    expect(parse(input)).toEqual(expected);
  });

  test.each([[{ description: null }]])("is invalid with %p", (input) => {
    expect(() => parse(input)).toThrow(ZodError);
  });
});
