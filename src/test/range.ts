const range = (start: number, length: number): number[] => {
  const result = Array(length);

  for (let i = 0; i < length; i++) {
    result[i] = i + start;
  }

  return result;
}

export default range;