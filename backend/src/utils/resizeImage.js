const sizeOf = require("buffer-image-size");
const sharp = require("sharp");

module.exports =  async (file) => {
  const dimensions = sizeOf(file);
  const width = dimensions.width;
  const height = dimensions.height;
  const min = Math.min(width, height);
  const max = Math.max(width, height);
  const ratio = max / min;
  let k = 0.1;
  while (width / (ratio * k) >= 300) {
    k += 0.1;
  }
  return await sharp(file)
    .resize(
      Math.floor(width / (ratio * (k - 0.1))),
      Math.floor(height / (ratio * (k - 0.1)))
    )
    .toBuffer();
}
