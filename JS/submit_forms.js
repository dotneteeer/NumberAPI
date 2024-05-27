import { GetNumberDescription, GetDateDescription } from "./requests.js";
import { ChangeFavorite } from "./favorites.js";
import { GetMaxValueNumber } from "./localStorage.js";
import { init_context_menu } from "./init_context_menu.js";

export function handleSubmit() {
  if (current_form === "number") {
    GetNumberDescription(number_input.value, AddListItem);
  } else {
    GetDateDescription(month_input.value, day_input.value, AddListItem);
  }
}

export function AddListItem(answer, focused = false, id = null) {
  const li = document.createElement("li");
  li.className = "task";
  li.id = id != null ? id : CreateLiId();
  const text_div = document.createElement("div");
  text_div.className = "task__field";
  text_div.style.padding = "1em";
  text_div.textContent = answer;
  const buttonElement = document.createElement("button");
  buttonElement.className = "like-button";
  buttonElement.innerHTML = `
        <div class="like-wrapper">
        <div class="ripple"></div>
            <svg class="heart" width="24" height="24" viewBox="0 0 24 24">
        <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
        </svg>
        <div class="particles" style="--total-particles: 6">
        <div class="particle" style="--i: 1; --color: #7642F0"></div>
        <div class="particle" style="--i: 2; --color: #AFD27F"></div>
        <div class="particle" style="--i: 3; --color: #DE8F4F"></div>
        <div class="particle" style="--i: 4; --color: #D0516B"></div>
        <div class="particle" style="--i: 5; --color: #5686F2"></div>
        <div class="particle" style="--i: 6; --color: #D53EF3"></div>
        </div>
    </div>
    `;

  if (focused) {
    buttonElement.classList.add("focused");
  } else {
    setTimeout(() => buttonElement.classList.toggle("focused"), 100);
    setTimeout(() => buttonElement.classList.toggle("focused"), 1000);
  }

  buttonElement.addEventListener("click", function () {
    ChangeFavorite(buttonElement, {answer,user:current_user}, li.id);
    buttonElement.classList.toggle("focused");
    const element=sessionStorage.getItem(li.id)
    const elementJson=JSON.parse(element)
    elementJson.favorite=!elementJson.favorite;
    sessionStorage.setItem(li.id, JSON.stringify(elementJson))
  });

  text_div.addEventListener("contextmenu", function () {
    sessionStorage.setItem(
      "current_item",
      JSON.stringify({
        value: text_div.textContent,
        status: JSON.parse(sessionStorage.getItem(li.id)).status,
      })
    );
    sessionStorage.setItem("current_item_id", li.id);
  });

  sessionStorage.setItem(
    li.id,
    JSON.stringify({ value: answer, status: "exists", favorite:focused, user:current_user })
  );

  li.append(text_div, buttonElement);
  output_ul.appendChild(li);

  DeleteItemHandler();
  init_context_menu(text_div);
  CheckIsFavoriteShown($(`#${li.id}`), focused)
}

function DeleteItemHandler() {
  $(".task").each(function () {
    var $field = $(this).find(".task__field");
    var $li = $(this);
    var mousedown = false;

    $field.unbind("mousedown").on("mousedown", function (event) {
      if (event.which === 1) {
        mousedown = true;
        $field.addClass("shaking");
        setTimeout(deleteTask, 1000);
      }
    });

    $field.on("mouseup", function () {
      mousedown = false;
      $field.removeClass("shaking");
    });

    function deleteTask() {
      if (mousedown) {
        const element = JSON.parse(sessionStorage.getItem($li.attr("id")));
        if(element.status==="exists" && is_deleted_shown===false){
          $field.addClass("delete");
        }
        setTimeout(function () {
          mousedown = false;
          HandleDelete($li, $field, element);
          CheckIsDeletedShown($li)
        }, 200);
      } else {
        return;
      }
    }
  });
}

function CreateLiId() {
  let max = GetMaxValueNumber();
  for (let index = 0; index < sessionStorage.length; index++) {
    let key = +sessionStorage.key(index);
    if (max < key) {
      max = key;
    }
  }

  return max + 1;
}

function HandleDelete($li, $field, element) {
  
  if (element.status === "exists") {
    $li.hide();
    $li.addClass("deleted");
  } else {
    $li.show();
    $li.removeClass("deleted");
  }
  $field.removeClass("shaking");
  $field.removeClass("delete");
  $field.blur();
  element.status = element.status === "exists" ? "deleted" : "exists";
  sessionStorage.setItem($li.attr("id"), JSON.stringify(element));
}


export function CheckIsDeletedShown($li){
  if(is_deleted_shown){
    $li.show();
  }
}

export function CheckIsFavoriteShown($li, focused){
    if(is_favorite_shown&&!focused){
      $li.hide();
    }
}
