import axios from "../axios";

const { X_RAPID_API_KEY } = require("src/config-global");

const BASE_RAPID_API_URL = "https://car-specs.p.rapidapi.com/v2/cars/";

const getUrl = (url) => `${BASE_RAPID_API_URL}${url}`

function removeEmpty(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => !!v));
}

const RAPID_API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': X_RAPID_API_KEY,
    'X-RapidAPI-Host': 'car-specs.p.rapidapi.com'
  }
};

const fetchMakes = async (year) => {
  const { data } = await axios.request({
    ...RAPID_API_OPTIONS,
    url: getUrl('makes'),
    params: removeEmpty({ year })
  })
  return data
}

const fetchModels = async (make) => {
  const { data } = await axios.request({
    ...RAPID_API_OPTIONS,
    url: getUrl(`makes/${make}/models`),
  })
  return data
}

const fetchGenerations = async (model) => {
  const { data } = await axios.request({
    ...RAPID_API_OPTIONS,
    url: getUrl(`models/${model}/generations`),
  })
  return data
}

const fetchTrims = async (generation) => {
  const { data } = await axios.request({
    ...RAPID_API_OPTIONS,
    url: getUrl(`generations/${generation}/trims`),
  })
  return data
}

const fetchSpecs = async (trim) => {
  const { data } = await axios.request({
    ...RAPID_API_OPTIONS,
    url: getUrl(`trims/${trim}`),
  })
  return data
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
  fetchMakes,
  fetchModels,
  fetchGenerations,
  fetchSpecs,
  fetchTrims,
  fetchEngines,
  fetchExteriorColors,
  fetchInteriorColors
};

export default methods;
