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
      if (!data.usage) {
        data.usage = 1;
      }
      for (let i = 0; i < data.usage; i++) {
        const item = this.createItemMarkup(data);
        item.firstChild.setAttribute(
          "style",
          `animation-delay: ${index * 0.08}s`
        );
        nodes.push(item);
      }
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

    if (data.task) {
      item.task = data.task;
    }
    item.used = false;
    return item;
  }

  renderMenu() {
    const menuContainerRestore = this.renderRestoreMenu();
    const menuContainerDelete = this.renderDeleteMenu();
    let menuContainers = [menuContainerDelete, menuContainerRestore];
    return menuContainers;
  }

  renderDeleteMenu() {
    const menuContainerDelete = document.createElement("ul");

    menuContainerDelete.classList.add("contextMenu");
    menuContainerDelete.setAttribute("data-theme", this.mode);

    const deleteItem = this.getUnusedItem(this.menuItemsNode, "delete");
    const copyItem = this.getUnusedItem(this.menuItemsNode, "copy");
    const shareTgItem = this.getUnusedItem(this.menuItemsNode, "shareTg");
    const shareXItem = this.getUnusedItem(this.menuItemsNode, "shareX");
    const shareVkItem = this.getUnusedItem(this.menuItemsNode, "shareVk");

    menuContainerDelete.append(
      copyItem,
      shareTgItem,
      shareXItem,
      shareVkItem,
      deleteItem
    );
    return menuContainerDelete;
  }

  renderRestoreMenu() {
    const menuContainerRestore = document.createElement("ul");

    menuContainerRestore.classList.add("contextMenu");
    menuContainerRestore.setAttribute("data-theme", this.mode);

    const restoreItem = this.getUnusedItem(this.menuItemsNode, "restore");
    const copyItem = this.getUnusedItem(this.menuItemsNode, "copy");
    const shareTgItem = this.getUnusedItem(this.menuItemsNode, "shareTg");
    const shareXItem = this.getUnusedItem(this.menuItemsNode, "shareX");
    const shareVkItem = this.getUnusedItem(this.menuItemsNode, "shareVk");

    menuContainerRestore.append(
      copyItem,
      shareTgItem,
      shareXItem,
      shareVkItem,
      restoreItem
    );

    return menuContainerRestore;
  }

  getUnusedItem(array, task) {
    const foundItem = array.find((item) => item.task === task && !item.used);
    if (foundItem) {
      foundItem.used = true;
      return foundItem;
    }
    return null;
  }

  closeMenu(menu) {
    if (this.isOpened) {
      menu.remove();
    }
  }

  init() {
    const contextMenus = this.renderMenu();
    document.addEventListener("click", () => {
      contextMenus.forEach((contextMenu) => this.closeMenu(contextMenu));
      this.isOpened = false;
    });
    window.addEventListener("blur", () => {
      contextMenus.forEach((contextMenu) => this.closeMenu(contextMenu));
      this.isOpened = false;
    });
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
