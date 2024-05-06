import test, { describe } from "node:test";
import { render } from "../build/index.js";
import assert from "node:assert/strict";

describe("insert directive", () => {
  test("render static content", () => {
    const rendered = render("<!-- #insert: dynamic part --><!-- /insert -->");
    assert(rendered.includes("dynamic part"));
  });

  test("overrides existing content", () => {
    const rendered = render(
      "<!-- #insert: dynamic part -->existing content<!-- /insert -->"
    );
    assert(!rendered.includes("existing content"));
  });

  test("renders template using values", () => {
    const rendered = render(
      "<!-- #insert: Hello {{name}}! --><!-- /insert -->",
      {
        values: {
          name: "John",
        },
      }
    );
    assert(rendered.includes("Hello John!"));
  });

  test("renders template using front matter", () => {
    const rendered = render(
      "---\nname: John\n---\n<!-- #insert: Hello {{name}}! --><!-- /insert -->",
      {
        values: {
          name: "John",
        },
      }
    );
    assert(rendered.includes("Hello John!"));
  });
});
