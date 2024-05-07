export function renderTemplate(
  template: string,
  values: Readonly<Record<string, unknown>>,
): string {
  return template.replaceAll(
    /<!--\s*@ignore\s*-->[^]+?<!--\s*\/ignore\s*-->|{{(.+?)}}/g,
    (a, b) => {
      // You can wrap the mustache with <!-- @ignore --> and <!-- /ignore --> to ignore it.
      if (!b) return a;

      b = b.trim();
      const value = values[b];
      if (value) {
        return String(value);
      } else {
        throw new Error(`Value '${b}' is not defined.`);
      }
    },
  );
}
