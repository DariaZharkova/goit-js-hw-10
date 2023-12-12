import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const selectBreed = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');
const container = document.querySelector('.cat-info');

errorMessage.classList.add('is-hidden');
selectBreed.classList.add('is-hidden');
container.style.display = 'none';

fetchBreeds()
  .then(data => {
    //   console.log(data);
    const createSelect = data
      .map(({ name, id }) => {
        return `<option value ='${id}'> ${name} </option>`;
      })
      .join('');
    selectBreed.insertAdjacentHTML('beforeend', createSelect);

    selectBreed.classList.toggle('is-hidden');
    loader.classList.replace('loader', 'is-hidden');

    new SlimSelect({
      select: selectBreed,
    });
  })
  .catch(error => onError(error));

selectBreed.addEventListener('change', onChangeBreed);

function onChangeBreed(evt) {
  // container.classList.add('is-hidden');
  loader.classList.replace('is-hidden', 'loader');
  container.style.display = 'none';

  const breedId = evt.currentTarget.value;
  // console.log(breedId);

  fetchCatByBreed(breedId)
    .then(data => {
      const { url, breeds } = data[0];
      // console.log(url);
      // console.log(breeds[0]);

      const markup = `<img src="${url}" alt="${breeds[0].name}" width="400"/>
        <div class = "cat-info-div">
        <h2>${breeds[0].name}</h2>
        <p>${breeds[0].description}</p>
        <p><span class = "accent">Temperament:</span> ${breeds[0].temperament}</p>
        </div>`;
      container.innerHTML = markup;

      container.style.display = 'flex';
      loader.classList.replace('loader', 'is-hidden');
    })
    .catch(error => onError(error));
}

function onError(error) {
  console.log(error);
  errorMessage.classList.remove('is-hidden');
  selectBreed.classList.add('is-hidden');
  loader.classList.replace('loader', 'is-hidden');
  container.style.display = 'none';
}
