export const randomInteger = (l: number, r: number): number => {

  if (l >= r) {
    throw new Error("randomInteger requires l < r");
  }

  const rn = Math.random();

  return rn === 1.0 
    ? (r - 1)
    : Math.floor( rn * (r - l) ) + l;
}

export const shuffleInplace = <T, >(items: T[]): void => {

  for (let i = 0; i < items.length; i++) {

    let j = randomInteger(i, items.length);

    [items[i], items[j]] = [items[j], items[i]];
  }
}

export const shuffle = <T, >(items: T[]): T[] => {
  const result = [...items];
  shuffleInplace(result);
  return result;
}