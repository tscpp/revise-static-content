import { Directive } from "../directive.js";
import { renderTemplate } from "../template.js";

const insert: Directive = {
  render: (content, element, options) => {
    const part =
      "\n\n" + renderTemplate(element.param, options.values).trim() + "\n\n";
    if (element.end - element.start === 0) {
      content.appendLeft(element.start, part);
    } else {
      content.update(element.start, element.end, part);
    }
  },
};

export default insert;
