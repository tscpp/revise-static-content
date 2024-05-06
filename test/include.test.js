import test, { describe } from "node:test";
import { render } from "../build/index.js";
import assert from "node:assert/strict";

describe("include directive", () => {
  test("render static content", () => {
    const rendered = render(
      "<!-- @include: test/samples/part.md --><!-- /include -->",
    );
    assert(rendered.includes("dynamic part"));
  });

  test("overrides existing content", () => {
    const rendered = render(
      "<!-- @include: test/samples/part.md -->existing content<!-- /include -->",
    );
    assert(!rendered.includes("existing content"));
  });

  test("renders template using values", () => {
    const rendered = render(
      "<!-- @include: test/samples/template.md --><!-- /include -->",
      {
        values: {
          name: "John",
        },
      },
    );
    assert(rendered.includes("Hello John!"));
  });

  test("renders template using front matter", () => {
    const rendered = render(
      "---\nname: John\n---\n<!-- @include: test/samples/template.md --><!-- /include -->",
      {
        values: {
          name: "John",
        },
      },
    );
    assert(rendered.includes("Hello John!"));
  });
});
