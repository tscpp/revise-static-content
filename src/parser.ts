import * as yaml from "js-yaml";

export interface DirectiveElement {
  start: number;
  end: number;
  name: string;
  param: string;
}

export interface Document {
  elements: DirectiveElement[];
  frontmatter: Record<string, unknown> | undefined;
}

export function parse(content: string): Document {
  const startTags = Array.from(
    execAll(/<!--\s*@([^:\s]+):?\s*(.+?)\s*-->/g, content)
  );
  const endTags = Array.from(execAll(/<!--\s*\/([^:\s]+)\s*-->/g, content));
  const elements = startTags
    .map((startTag): DirectiveElement => {
      do {
        var endTag = endTags.shift();

        if (!endTag) {
          throw new Error(`Unbalanced directive tags.`);
        }
      } while (startTag[1]! !== endTag[1]!)

      return {
        name: startTag[1]!,
        param: startTag[2]!,
        start: startTag.index + startTag[0].length,
        end: endTag.index,
      };
    });
  const frontmatterMatch = /---\n([^]+)\n---/.exec(content);
  let frontmatter;
  if (frontmatterMatch) {
    const text = frontmatterMatch[1]!;
    frontmatter = yaml.load(text) as Record<string, unknown>;
  }
  return {
    elements,
    frontmatter,
  };
}

function execAll(regex: RegExp, string: string): Iterable<RegExpExecArray> {
  return {
    [Symbol.iterator]: () => {
      regex = new RegExp(
        regex,
        // Make sure regex has 'g' flag
        regex.flags.includes("g") ? regex.flags : regex.flags + "g"
      );
      return {
        next: () => {
          const result = regex.exec(string);

          if (result === null) {
            return {
              done: true,
              value: null,
            };
          } else {
            return {
              done: false,
              value: result,
            };
          }
        },
      };
    },
  };
}
