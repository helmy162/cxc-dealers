import axios from "../axios";

const { X_RAPID_API_KEY } = require("src/config-global");
const BASE_RAPID_API_URL = "https://car-api2.p.rapidapi.com/api/";
const getUrl = (url) => `${BASE_RAPID_API_URL}${url}`

function removeEmpty(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => !!v));
}

const RAPID_API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': X_RAPID_API_KEY,
    'X-RapidAPI-Host': 'car-api2.p.rapidapi.com'
  }
};

const fetchYears = async (params) => {
  const { data } = await axios.request({
    ...RAPID_API_OPTIONS,
    url: getUrl('years'),
    params: removeEmpty(params)
  })
  return data;
}

const fetchMakes = async (year) => {
  const { data } = await axios.request({
    ...RAPID_API_OPTIONS,
    url: getUrl('makes'),
    params: removeEmpty({ year })
  })
  return data.data
}

const fetchModels = async (make) => {
  const { data } = await axios.request({
    ...RAPID_API_OPTIONS,
    url: getUrl('models'),
    params: {
      make
    }
  })
  return data.data
}

const fetchTrims = async (params) => {
  const { data } = await axios.request({
    ...RAPID_API_OPTIONS,
    url: getUrl('trims'),
    params: removeEmpty(params)
  })
  return data.data
}

const fetchEngines = async (params) => {
  const { data } = await axios.request({
    ...RAPID_API_OPTIONS,
    url: getUrl('engines'),
    params: removeEmpty(params)
  })
  return data.data
}

const fetchExteriorColors = async (params) => {
  const { data } = await axios.request({
    ...RAPID_API_OPTIONS,
    url: getUrl('exterior-colors'),
    params: removeEmpty(params)
  })
  return data.data
}

const fetchInteriorColors = async (params) => {
  const { data } = await axios.request({
    ...RAPID_API_OPTIONS,
    url: getUrl('interior-colors'),
    params: removeEmpty(params)
  })
  return data.data
}

const methods = {
  fetchYears,
  fetchMakes,
  fetchModels,
  fetchTrims,
  fetchEngines,
  fetchExteriorColors,
  fetchInteriorColors
};

export default methods;
