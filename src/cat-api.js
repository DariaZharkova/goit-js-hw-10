import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_kmleCNodaXxeOFWk4aFcF56ABgv1W0U6b8XgFluW0UPrgNvK7nEt4eQa9vR5UvmA';

function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
      throw new Error(error);
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
      throw new Error(error);
    });
}

export { fetchBreeds, fetchCatByBreed };
