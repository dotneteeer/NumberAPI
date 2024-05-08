export class ContextMenu {
  constructor({ target = null, menuItems = [], mode = "dark" }) {
    this.target = target;
    this.menuItems = menuItems;
    this.mode = mode;
    this.targetNode = this.getTargetNode();
    this.menuItemsNode = this.getMenuItemsNode();
    this.isOpened = false;
  }

  getTargetNode() {
    const nodes = [this.target];

    if (nodes && nodes.length !== 0) {
      return nodes;
    } else {
      console.error(`getTargetNode :: "${this.target}" target not found`);
      return [];
    }
  }

  getMenuItemsNode() {
    const nodes = [];

    if (!this.menuItems) {
      console.error("getMenuItemsNode :: Please enter menu items");
      return [];
    }

    this.menuItems.forEach((data, index) => {
      const item = this.createItemMarkup(data);
      item.firstChild.setAttribute(
        "style",
        `animation-delay: ${index * 0.08}s`
      );
      nodes.push(item);
    });

    return nodes;
  }

  createItemMarkup(data) {
    const button = document.createElement("button");
    const item = document.createElement("li");

    button.innerHTML = data.content;
    button.classList.add("contextMenu-button");
    item.classList.add("contextMenu-item");

    if (data.divider) item.setAttribute("data-divider", data.divider);
    item.appendChild(button);

    if (data.events && data.events.length !== 0) {
      Object.entries(data.events).forEach((event) => {
        const [key, value] = event;
        button.addEventListener(key, value);
      });
    }

    item.task = data.task;

    return item;
  }

  renderMenu() {
    const menuContainerDelete=this.renderDeleteMenu();//no copy option
    const menuContainerRestore=this.renderRestoreMenu(menuContainerDelete);//doesnt close after click

    let menuContainers = [menuContainerDelete, menuContainerRestore];
    return menuContainers;
  }

  renderDeleteMenu(){
    const menuContainerDelete = document.createElement("ul");

    menuContainerDelete.classList.add("contextMenu");
    menuContainerDelete.setAttribute("data-theme", this.mode);

    let menuItemsNode=[...this.menuItemsNode];
    const restoreItem=menuItemsNode.find(item=>item.task==='restore')
   
    menuItemsNode.splice(menuItemsNode.indexOf(restoreItem), 1)

    menuItemsNode.forEach(item=>menuContainerDelete.appendChild(item))

    return menuContainerDelete;
  }

  renderRestoreMenu(){
    const menuContainerRestore = document.createElement("ul");

    menuContainerRestore.classList.add("contextMenu");
    menuContainerRestore.setAttribute("data-theme", this.mode);

    let menuItemsNode=[...this.menuItemsNode];
    
    const deleteItem=menuItemsNode.find(item=>item.task==='delete')

    menuItemsNode.splice(menuItemsNode.indexOf(deleteItem), 1)

    menuItemsNode.forEach(item=>menuContainerRestore.appendChild(item))//suspect

    return menuContainerRestore;

  }

  closeMenu(menu) {
    if (this.isOpened) {
      this.isOpened = false;
      menu.remove();
    }
  }

  init() {
    const contextMenus = this.renderMenu();
    document.addEventListener("click", () =>
      contextMenus.forEach((contextMenu) => this.closeMenu(contextMenu))
    );
    window.addEventListener("blur", () =>
      contextMenus.forEach((contextMenu) => this.closeMenu(contextMenu))
    );
    document.addEventListener("contextmenu", (e) => {
      this.targetNode.forEach((target) => {
        if (!e.target.contains(target)) {
          contextMenus.forEach((contextMenu) => contextMenu.remove());
        }
      });
    });

    this.targetNode.forEach((target) => {
      target.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        this.isOpened = true;

        const { clientX, clientY } = e;
        let contextMenu;
        const currentItem = JSON.parse(sessionStorage.getItem("current_item"));
        if (currentItem.status === "deleted") {
          contextMenu = contextMenus[1]; //menuContainerRestore
        } else {
          contextMenu = contextMenus[0]; //menuContainerDelete
        }
        document.body.appendChild(contextMenu);

        const positionY =
          clientY + contextMenu.scrollHeight >= window.innerHeight
            ? window.innerHeight - contextMenu.scrollHeight - 20
            : clientY;
        const positionX =
          clientX + contextMenu.scrollWidth >= window.innerWidth
            ? window.innerWidth - contextMenu.scrollWidth - 20
            : clientX;

        contextMenu.setAttribute(
          "style",
          `--width: ${contextMenu.scrollWidth}px;
          --height: ${contextMenu.scrollHeight}px;
          --top: ${positionY}px;
          --left: ${positionX}px;`
        );
      });
    });
  }
}
