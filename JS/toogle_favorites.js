import {CheckIsDeletedShown} from './submit_forms.js'
show_favorites_input.addEventListener("click", function () {
  is_favorite_shown = show_favorites_input.checked;

  let facts = [];
  for (let index = 0; index < sessionStorage.length; index++) {
    let key = +sessionStorage.key(index);
    if (!isNaN(key)) {
      facts.push({ key: key, value: sessionStorage.getItem(key) });
    }
  }
  facts.forEach((fact) => {
    const factJson = JSON.parse(fact.value);
    const element = $(`#${fact.key}`);
    if (!factJson.favorite && is_favorite_shown) {
      element.hide();
    } else {
      if (factJson.status === "exists") {
        element.show();
      } 
      CheckIsDeletedShown(element)
    }
  });
});
