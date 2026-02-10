export const getMonoColors = (totalSlices, s = 65, l = 65) => {
  return Array.from({ length: totalSlices }, (_, i) => {
    const hue = i * (360 / totalSlices);
    return `hsl(${hue}, ${s}%, ${l}%)`;
  });
};

export const getHslColors = (
  totalSlices,
  hue = 210, // Blue
  saturation = 70,
  minLight = 35,
  maxLight = 75,
) => {
  return Array.from({ length: totalSlices }, (_, i) => {
    const l =
      minLight + (i * (maxLight - minLight)) / Math.max(1, totalSlices - 1);

    return `hsl(${hue}, ${saturation}%, ${l}%)`;
  });
};

export const getBlueMonoColors = (
  totalSlices,
  hue = 210, // Blue
  saturation = 70,
  minLight = 35,
  maxLight = 75,
) => {
  return Array.from({ length: totalSlices }, (_, i) => {
    const l =
      minLight + (i * (maxLight - minLight)) / Math.max(1, totalSlices - 1);

    return `hsl(${hue}, ${saturation}%, ${l}%)`;
  });
};

export const getTealMonoColors = (
  totalSlices,
  hue = 180, // Teal
  saturation = 60,
  minLight = 35,
  maxLight = 75,
) => {
  return Array.from({ length: totalSlices }, (_, i) => {
    const l =
      minLight + (i * (maxLight - minLight)) / Math.max(1, totalSlices - 1);

    return `hsl(${hue}, ${saturation}%, ${l}%)`;
  });
};

export const getGreenMonoColors = (
  totalSlices,
  hue = 145,
  saturation = 55,
  minLight = 35,
  maxLight = 75,
) => {
  return Array.from({ length: totalSlices }, (_, i) => {
    const l =
      minLight + (i * (maxLight - minLight)) / Math.max(1, totalSlices - 1);

    return `hsl(${hue}, ${saturation}%, ${l}%)`;
  });
};
