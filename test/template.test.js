import test, { describe } from "node:test";
import { renderTemplate } from "../build/template.js";
import assert from "node:assert/strict";

describe("template", () => {
  test("renders mustache", () => {
    const rendered = renderTemplate("{{foo}}", {
      foo: "bar",
    });
    assert(!rendered.includes("{{foo}}"));
    assert(rendered.includes("bar"));
  });

  test("ignores mustache in ignore directive", () => {
    const rendered = renderTemplate("<!-- @ignore -->{{foo}}<!-- /ignore -->", {
      foo: "bar",
    });
    assert(rendered.includes("{{foo}}"));
    assert(!rendered.includes("bar"));
  });
});
