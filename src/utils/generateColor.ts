const alphabet = ["a", "b", "c", "d", "e", "f"]

const conditionNumber = (value: number) => {
  let nbrAlphabet
  if (value >= 10) {
    nbrAlphabet = alphabet[value - 10]
  } else nbrAlphabet = value
  return nbrAlphabet
}

const generateColor = () => {
  const one = Math.floor(Math.random() * 16);
  const two = Math.floor(Math.random() * 16);
  const three = Math.floor(Math.random() * 16);
  const red = conditionNumber(one)
  const green = conditionNumber(two)
  const blue = conditionNumber(three)

  const color = `#${red}${green}${blue}`;

  return color;
};

export default generateColor;