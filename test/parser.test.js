import test, { describe } from "node:test";
import { parse } from "../build/parser.js";
import assert from "node:assert/strict";

describe("parser", () => {
  test("directive with colon", () => {
    const document = parse("<!-- @foo: bar --><!-- /foo -->");
    assert(
      document.elements.some(
        (element) => element.name === "foo" && element.param == "bar",
      ),
    );
  });

  test("directive without colon", () => {
    const document = parse("<!-- @foo bar --><!-- /foo -->");
    assert(
      document.elements.some(
        (element) => element.name === "foo" && element.param == "bar",
      ),
    );
  });

  test("fails on unbalanced elements", () => {
    assert.throws(() => {
      parse("<!-- @foo bar --><!-- @foo bar --><!-- /foo -->");
    });
  });

  test("fails on non-matching element start/end name", () => {
    assert.throws(() => {
      parse("<!-- @foo bar --><!-- /baz -->");
    });
  });

  test("ignores irrelevant end tags", () => {
    parse("<!-- @foo: bar --><!-- /ko --><!-- /foo -->");
  });
});
