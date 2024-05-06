export function renderTemplate(
  template: string,
  values: Readonly<Record<string, unknown>>
): string {
  return template.replaceAll(/{{(.+?)}}/g, (_a, b) => {
    const value = values[b];
    if (value) {
      return String(value);
    } else {
      throw new Error(`Value '${b}' is not defined.`);
    }
  });
}
