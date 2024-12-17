import axios from 'axios'

// export const citySearch = axios.create({
//   baseURL: 'https://www.universal-tutorial.com/api/',
//   headers: {
//     Accept: 'application/json',
//     Authorization:
//       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJhc2tAdW5pdmVyc2FsLXR1dG9yaWFsLmNvbSIsImFwaV90b2tlbiI6IlQ2VlBOUmZXbkxFbmdsMHd2djctZ1d2Y09KRHFPSkptc3ZoNkNOdGo5a3p1Z1RSYkhvdXVET1NXeTdzYmJzdG5taDAifSwiZXhwIjoxNzM0MzQxNjIxfQ.CnKLLZIh2lUJJfshue9OY2237sWgwLmDXPCKUl0FCds',
//   },
// })

export const citySearch = axios.create({
  baseURL: 'https://api.countrystatecity.in/v1/',
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'X-CSCAPI-KEY': 'Ymtwb1NGRzQwUzM2NzNUOGI3Qm90T0JMREpzb3I0V0I0WHZGMmV6dg==',
  },
})
