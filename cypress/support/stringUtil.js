export const sentenceToWord = (sentence) => {
  const sentenceStripped = sentence.replace(/[^a-zA-Z0-9 ]/g, "");
  return sentenceStripped.replace(/\s+/g, "-").toLowerCase();
};
