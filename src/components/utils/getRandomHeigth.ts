const GET_HEIGHT = () => {
  const heights = [
    130, 175, 238, 236, 296, 316, 325, 335, 354, 369, 374, 420, 467, 497
  ];
  const getHeight = (heights: Number[]) => {
    return heights[Math.floor(Math.random() * heights.length)];
  };
  const result = getHeight(heights);
  return result;
};

export default GET_HEIGHT;
