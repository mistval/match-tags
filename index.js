const TAG_TYPE_REGEX = /<([^ >]*).*?>/;

function extract(str, openingTag) {
  const tagType = TAG_TYPE_REGEX.exec(openingTag)[1];
  if (!tagType) {
    throw new Error('openingTag argument does not seem to be an HTML opening tag');
  }

  const closingTag = `</${tagType}>`;
  const openingTagStart = `<${tagType}`;
  const initialSearchIndex = str.indexOf(openingTag);

  if (initialSearchIndex === -1) {
    return undefined;
  }

  let tagCount = 0;
  let searchIndex = initialSearchIndex;

  while (true) {
    const openingTagIndex = str.indexOf(openingTagStart, searchIndex);
    const closingTagIndex = str.indexOf(closingTag, searchIndex);
    const hasOpeningTag = openingTagIndex !== -1;
    const hasClosingTag = closingTagIndex !== -1;

    // Tags aren't matched. Return everything past the opening tag.
    if (!hasClosingTag) {
      return str.substring(initialSearchIndex);
    }

    if (!hasOpeningTag || closingTagIndex < openingTagIndex) {
      tagCount -= 1;
      searchIndex = closingTagIndex + 1;
    } else {
      tagCount += 1;
      searchIndex = openingTagIndex + 1;
    }

    if (tagCount === 0) {
      return str.substring(initialSearchIndex, closingTagIndex + closingTag.length);
    }
  }
}

module.exports = extract;
