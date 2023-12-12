import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const selectBreed = document.querySelector('.breed-select');

fetchBreeds().then(data => {
  //   console.log(data);
  const createSelect = data
    .map(({ name, id }) => {
      return `<option value ='${id}'> ${name} </option>`;
    })
    .join('');
  selectBreed.insertAdjacentHTML('beforeend', createSelect);

  new SlimSelect({
    select: selectBreed,
  });
});
