import meow from "meow";
import { globby } from "globby";
import { render } from "./index.js";
import { readFileSync, writeFileSync } from "node:fs";

const IGNORE_DEFAULT = ["**/.DS_Store/**", "**/node_modules/**"];

const cli = meow({
  importMeta: import.meta,
  flags: {
    cwd: {
      type: "string",
    },
    value: {
      type: "string",
      isMultiple: true,
    },
    dot: {
      type: "boolean",
      default: false,
    },
  },
});

const files = await globby(cli.input, {
  dot: cli.flags.dot,
  ignore: IGNORE_DEFAULT,
});

for (const file of files) {
  let content = readFileSync(file, "utf8");

  content = render(content, {
    cwd: cli.flags.cwd,
    values: Object.fromEntries(
      cli.flags.value?.map((flag) => flag.split(":", 2)) ?? []
    ),
  });

  writeFileSync(file, content);
}
