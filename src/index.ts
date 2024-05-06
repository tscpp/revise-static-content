import MagicString from "magic-string";
import { Directive } from "./directive.js";
import directives from "./directives.js";
import { parse } from "./parser.js";

export interface RenderOptions {
  readonly cwd?: string | undefined;
  readonly values?: Readonly<Record<string, unknown>> | undefined;
  readonly directives?: Readonly<Record<string, Directive>> | undefined;
}

export function render(content: string, options?: RenderOptions): string {
  const cwd = options?.cwd ?? process.cwd();
  let values = options?.values ?? {};
  const directives2: Readonly<Record<string, Directive>> =
    options?.directives ?? directives;

  const document = parse(content);
  const magic = new MagicString(content);

  values = { ...values, ...document.frontmatter };

  for (const element of document.elements) {
    const directive = directives2[element.name];

    if (directive) {
      directive.render(magic, element, { cwd, values });
    } else {
      throw new Error(`Directive '${element.name}' is undefined.`);
    }
  }

  return magic.toString();
}

export { directives };
export { renderTemplate } from "./template.js";
