import MagicString from "magic-string";
import { DirectiveElement } from "./parser.js";

export interface DirectiveOptions {
  readonly cwd: string;
  readonly values: Readonly<Record<string, unknown>>;
}

export interface Directive {
  render(
    content: MagicString,
    element: DirectiveElement,
    options: DirectiveOptions
  ): void;
}
