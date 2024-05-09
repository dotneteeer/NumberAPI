import { ContextMenu } from "./ContextMenu.js";
export function init_context_menu(target) {
  const copyIcon = `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" style="margin-right: 7px" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;

  const deleteIcon = `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" fill="none" style="margin-right: 7px" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;

  const restoreIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 7px" ><path d="M4.52185 7H7C7.55229 7 8 7.44772 8 8C8 8.55229 7.55228 9 7 9H3C1.89543 9 1 8.10457 1 7V3C1 2.44772 1.44772 2 2 2C2.55228 2 3 2.44772 3 3V5.6754C4.26953 3.8688 6.06062 2.47676 8.14852 1.69631C10.6633 0.756291 13.435 0.768419 15.9415 1.73041C18.448 2.69239 20.5161 4.53782 21.7562 6.91897C22.9963 9.30013 23.3228 12.0526 22.6741 14.6578C22.0254 17.263 20.4464 19.541 18.2345 21.0626C16.0226 22.5842 13.3306 23.2444 10.6657 22.9188C8.00083 22.5931 5.54702 21.3041 3.76664 19.2946C2.20818 17.5356 1.25993 15.3309 1.04625 13.0078C0.995657 12.4579 1.45216 12.0088 2.00445 12.0084C2.55673 12.0079 3.00351 12.4566 3.06526 13.0055C3.27138 14.8374 4.03712 16.5706 5.27027 17.9625C6.7255 19.605 8.73118 20.6586 10.9094 20.9247C13.0876 21.1909 15.288 20.6513 17.0959 19.4075C18.9039 18.1638 20.1945 16.3018 20.7247 14.1724C21.2549 12.043 20.9881 9.79319 19.9745 7.8469C18.9608 5.90061 17.2704 4.3922 15.2217 3.6059C13.173 2.8196 10.9074 2.80968 8.8519 3.57803C7.11008 4.22911 5.62099 5.40094 4.57993 6.92229C4.56156 6.94914 4.54217 6.97505 4.52185 7Z" fill="#FFF"/></svg>`;

  const menuItems = [
    {
      task: "copy",
      usage: 2,
      content: `${copyIcon}Copy`,
      events: {
        click: () =>
          navigator.clipboard.writeText(
            JSON.parse(sessionStorage.getItem("current_item")).value
          ),
      },
    },
    {
      task: "restore",
      usage: 1,
      content: `${restoreIcon}Restore`,
      divider: "top",
      events: {
        click: () => {
          const currentElement = JSON.parse(
            sessionStorage.getItem("current_item")
          );
          if (currentElement.status === "deleted") {
            const key = sessionStorage.getItem("current_item_id");
            const element = JSON.parse(sessionStorage.getItem(key));
            element.status = "exists";
            sessionStorage.setItem(key, JSON.stringify(element));
            const elementHTML = $('#'+sessionStorage.getItem("current_item_id"));
            elementHTML.removeClass("deleted");
          }
        },
      },
    },
    {
      task: "delete",
      usage: 1,
      content: `${deleteIcon}Delete`,
      divider: "top",
      events: {
        click: () => {
          const li_id = sessionStorage.getItem("current_item_id");
          const $li = $(`#${li_id}`);
          const value = JSON.parse(sessionStorage.getItem(li_id)).value;
          sessionStorage.setItem(
            li_id,
            JSON.stringify({ value: value, status: "deleted" })
          );

          setTimeout(function () {
            $li.hide();
            $li.addClass("deleted");
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
