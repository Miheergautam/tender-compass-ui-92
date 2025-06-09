export function toCamelCase(str: string): string {
  return str.replace(/[_-](\w)/g, (_, letter) => letter.toUpperCase());
}
