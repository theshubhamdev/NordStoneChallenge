import axios from 'axios';

export async function calculate(
  type: 'multiplication' | 'addition' | 'subtraction',
  num1: number,
  num2: number,
) {
  const response: {data: number} = await axios.get(
    `https://calculator-nordstone.herokuapp.com/${type}/${num1}/${num2}`,
  );
  return response.data;
}
