import axios from 'axios'
import { GET_ALL_BUSINESS, GET_ALL_CATEGORIES, GET_ALL_USERS, SET_RATING, SET_FILTERS, SET_UPLOAD_IMAGE, GET_USER_BY_ID, UPDATE_USER_DETAIL } from './Action-Types'
import type { ServiceAction } from './types'

const API_URL = 'http://localhost:3001/'

export const GetAllBusiness = (): (dispatch: (action: ServiceAction) => void) => Promise<void> => {
  const endpoint = `${API_URL}sellers`

  return async (dispatch: (action: ServiceAction) => void) => {
    try {
      const { data } = await axios.get(endpoint)

      dispatch({
        type: GET_ALL_BUSINESS,
        payload: data
      })
    } catch (error: any) {
      console.log(error.message)
    }
  }
}

export const setFiler = (filter: string): {
  type: string
  payload: string
} => {
  return {
    type: SET_FILTERS,
    payload: filter
  }
}

export const setRating = (rating: number): {
  type: string
  payload: number
} => {
  return {
    type: SET_RATING,
    payload: rating
  }
}

export const setUploadImage = (image: string): {
  type: string
  payload: string
} => {
  return {
    type: SET_UPLOAD_IMAGE,
    payload: image
  }
}

export const getCategories = (): (dispatch: (action: ServiceAction) => void) => Promise<void> => {
  const endCategorie = `${API_URL}categories`

  return async (dispatch: (action: ServiceAction) => void) => {
    try {
      const { data } = await axios.get(endCategorie)

      dispatch({
        type: GET_ALL_CATEGORIES,
        payload: data
      })
    } catch (error: any) {
      console.log('Error en el getCategories')
    }
  }
}

export const postSeller = (payload: any) => {
  const endpoint = `${API_URL}sellers`

  return async function (dispatch: any) {
    let json = await axios.post(endpoint, payload)
    return json
  }
}

export const postUser = (payload: any) => {
  const endpoint1 = `${API_URL}users`
  return async function (dispatch: any) {
    let json1 = await axios.post(endpoint1, payload)
    return json1
  }
}

export const getUsers = (): (dispatch: (action: ServiceAction) => void) => Promise<void> => {
  const endUser = `${API_URL}users`

  return async (dispatch: (action: ServiceAction) => void) => {
    try {
      const { data } = await axios.get(endUser)

      dispatch({
        type: GET_ALL_USERS,
        payload: data
      })
    } catch (error: any) {
      console.log('Error en el getUsers')
    }
  }
}

export const getUserbyId: any = (id: string) => {
  const endpoint = `${API_URL}users/${id}`

  return async (dispatch: (action: ServiceAction) => void) => {
    try {
      const { data } = await axios.get(endpoint)

      dispatch({
        type: GET_USER_BY_ID,
        payload: data
      })
    } catch (error: any) {
      console.log(error.message)
    }
  }
}

export const updateUserInfo: any = (id: string, updateinfo: any) => {
  try {
    const endpoint = `${API_URL}users/${id}`
    return async (dispatch: (action: ServiceAction) => void) => {
      const { data } = await axios.put(endpoint, updateinfo)
      console.log('Modificado correctamente')

      dispatch({
        type: UPDATE_USER_DETAIL,
        payload: data
      })
    }
  } catch (error: any) {
    console.log(error.message)
  }
}
