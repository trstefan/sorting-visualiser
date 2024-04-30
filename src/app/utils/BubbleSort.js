import swap from "./Swap";

export const getBubbleSortAnimations = (array, sizeArray) => {
  const animations = [];
  bubbleSort(array, sizeArray, animations);
  return animations;
};

function bubbleSort(array, sizeArray, animations) {
  let i, j;
  for (i = 0; i < sizeArray - 1; i++) {
    for (j = 0; j < sizeArray - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        animations.push([j, j + 1]);
        swap(array, j, j + 1);
        animations.push([j, array[j], j + 1, array[j + 1]]);
        animations.push([j, j + 1]);
      }
    }
  }
}
