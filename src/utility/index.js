const parseResponse = (res) => {
  if (res.status >= 400) {
    throw new Error('Not found',
      { statusCode: res.status, message: res.statusText });
  } else {
    return res.json();
  }
};

const convertToHollywoodMoney = (num) => {
  const min = 1e3;
  if (num >= min) {
    const units = ['k', 'Million', 'Billion', 'Trillion'];
    const order = Math.floor(Math.log(num) / Math.log(1000));
    const unitname = units[(order - 1)];
    return `$ ${Math.floor(num / 1000 ** order)} ${unitname}`; // eslint-disable-line
  }
  return num;
};

export { parseResponse, convertToHollywoodMoney };
