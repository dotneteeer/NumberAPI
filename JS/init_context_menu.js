import { ContextMenu } from "./ContextMenu.js";
export function init_context_menu(target) {
  const copyIcon = `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" style="margin-right: 7px" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;

  const deleteIcon = `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" fill="none" style="margin-right: 7px" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;

  const menuItems = [
    {
      content: `${copyIcon}Copy`,
      events: {
        click: () =>
          navigator.clipboard.writeText(
            sessionStorage.getItem("current_item_text")
          ),
      },
    },
    {
      content: `${deleteIcon}Delete`,
      divider: "top",
      events: {
        click: () => {
          const li_id = sessionStorage.getItem("current_item_id");
          const $field=document.getElementById(li_id);
          $field.classList.add("delete");
          sessionStorage.removeItem(li_id);

          setTimeout(function () {
            $field.remove();
          }, 200);
        },
      },
    },
  ];

  const dark = new ContextMenu({
    target: target,
    menuItems,
  });

  dark.init();
}
