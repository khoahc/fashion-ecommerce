const isEqualColor = (colorA, colorB) => {
  return JSON.stringify(colorA) === JSON.stringify(colorB);
}

const indexOfProductColorOption = (color, arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (isEqualColor(color, arr[i].color)) {
      return i;
    }
  }

  return -1;
}

export const groupProductOptions = (productOptions) => {
  const result = [];

  productOptions.forEach((po) => {
    const i = indexOfProductColorOption(po.color, result);
    if (i !== -1) {
      result[i].sizes.push({
        id: po.id,
        size: po.size,
        quantity: po.quantity,
      })
    } else {
      result.push({
        color: po.color,
        sizes: [{
          id: po.id,
          size: po.size,
          quantity: po.quantity,
        }],
        mainImage: po.mainImage,
        images: po.images,
      });
    }
  });

  return result;
};
