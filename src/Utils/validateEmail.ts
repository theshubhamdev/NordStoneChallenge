import axios from 'axios';

export async function validateEmail(email: string) {
  const response = await axios.get(
    `https://api.kickbox.com/v2/verify?email=${email}&apikey=live_aa653e7b1cae5ca7044d3ac5af498fc13013c8a4e96e0f0d21de0359e2c08cab`,
  );
  if (response.data.disposable || response.data.result === 'undeliverable') {
    return false;
  }
  return true;
}
