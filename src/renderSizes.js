export default {
  nameLengthToItemWidth: nameLength => nameLength * 0.5,

  contentLengthToInputFieldSize: contentLength =>
    Math.floor(contentLength * 1.1) + 1,

  xPositionToDate: xPosition => Math.floor(xPosition / 30) * 1000 * 60 * 60 * 24
};
