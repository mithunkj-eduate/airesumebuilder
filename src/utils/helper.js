export const cleanJsonMarkdown = (obj) => {
  // 1. Convert the object to a string to clean everything at once
  let jsonString = JSON.stringify(obj);

  // 2. Regular Expression to find [text](url) or [text](mailto:email)
  // It captures ONLY the clean URL or email address
  const markdownRegex = /\[.*?\]\((?:mailto:)?(.*?)\)/g;

  // 3. Replace the entire markdown pattern with just the captured URL ($1)
  const cleanedString = jsonString.replace(markdownRegex, "$1");

  // 4. Parse it back into a valid JSON object
  return JSON.parse(cleanedString);
};
