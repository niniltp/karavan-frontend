export const getRandomInt = (max) => {
  const rand = Math.floor(Math.random() * (max));
  return rand;
}

export const getRandomArrayFromArray = (n, array) => {
  if(array?.length <= 0) return null;

  const randomArray = [];

  for (let i=0; i < n; i++) {
    const rand = getRandomInt(array.length);

    randomArray.push(array[rand]);
    array.splice(rand, 1); // remove the picked element from the array to avoid duplicates
  }

  return randomArray;
}