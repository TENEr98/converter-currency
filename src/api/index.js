import axios from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL
const userKEY = import.meta.env.VITE_TOKEN_KEY

const instance = axios.create({ baseURL })

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  function (error) {
    return error
  }
)

export const ConverterAPI = {
  fetchOne(from, to) {
    return instance
      .get(`/fetch-one?from=${from}&to=${to}&api_key=${userKEY}`)
      .then((response) => response)
      .catch((err) => err.response)
  },
  convert(from, to, amount) {
    return instance
      .get(`/convert?from=${from}&to=${to}&amount=${amount}&api_key=${userKEY}`)
      .then((response) => response)
      .catch((err) => err.response)
  },
  currencies() {
    return instance
      .get(`/currencies?api_key=${userKEY}`)
      .then((response) => response)
      .catch((err) => err.response)
  },
  fetchAll(from) {
    return instance
      .get(`/fetch-all?from=${from}&api_key=${userKEY}`)
      .then((response) => response)
      .catch((err) => err.response)
  }
}
