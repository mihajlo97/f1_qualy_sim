const fetchCountryCodes = async () => {
  const response = await fetch('https://flagcdn.com/en/codes.json');
  return response.json();
};

const returnKeyForValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

const tryAppendFlagCodes = async (object) => {
  const response = await fetchCountryCodes();

  return object.map((obj) => ({
    ...obj,
    countryCode: returnKeyForValue(response, obj.country),
  }));
};

export default tryAppendFlagCodes;
