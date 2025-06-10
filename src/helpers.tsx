// export function toCamelCase(str: string): string {
//   // Handle empty or invalid strings
//   if (!str || typeof str !== "string") {
//     return str;
//   }

//   return (
//     str
//       // First, trim whitespace and normalize the string
//       .trim()
//       // Replace spaces, underscores, hyphens, and dots followed by a character
//       .replace(/[\s_\-\.]+(\w)/g, (_, letter) => letter.toUpperCase())
//       // Handle the first character - make it lowercase
//       .replace(/^[A-Z]/, (firstChar) => firstChar.toLowerCase())
//       // Remove any remaining non-alphanumeric characters
//       .replace(/[^a-zA-Z0-9]/g, "")
//   );
// }

export function toCamelCase(str: string): string {
  // Handle empty or invalid strings
  if (!str || typeof str !== "string") {
    return str;
  }

  // Check if string starts with underscore
  const startsWithUnderscore = str.startsWith("_");

  // Remove leading underscore for processing if it exists
  const processStr = startsWithUnderscore ? str.slice(1) : str;

  const camelCased = processStr
    // First, trim whitespace and normalize the string
    .trim()
    // Replace spaces, underscores, hyphens, and dots followed by a character
    .replace(/[\s_\-\.]+(\w)/g, (_, letter) => letter.toUpperCase())
    // Handle the first character - make it lowercase
    .replace(/^[A-Z]/, (firstChar) => firstChar.toLowerCase())
    // Remove any remaining non-alphanumeric characters
    .replace(/[^a-zA-Z0-9]/g, "");

  // Add back the leading underscore if it was there originally
  return startsWithUnderscore ? "_" + camelCased : camelCased;
}
