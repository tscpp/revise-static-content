import { isAbsolute, join } from "node:path";
import { Directive } from "../directive.js";
import { readFileSync } from "node:fs";
import { renderTemplate } from "../template.js";

const include: Directive = {
  render: (content, element, options) => {
    const specifier = element.param;
    const path = isAbsolute(specifier)
      ? specifier
      : join(options.cwd, specifier);
    const template = readFileSync(path, "utf8");
    let part = renderTemplate(template, options.values);
    part = "\n" + part.trim() + "\n";
    if (element.end - element.start === 0) {
      content.appendLeft(element.start, part);
    } else {
      content.update(element.start, element.end, part);
    }
  },
};

export default include;
