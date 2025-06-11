
  const input = document.getElementById("product-input");
  const addBtn = document.querySelector(".add-btn");
  const itemList = document.querySelector(".item-list");

  function addProduct() {
    const name = input.value.trim();
    if (name === "") return;

    const item = document.createElement("div");
    item.className = "item";
    item.innerHTML = `
      <span class="item-name">${name}</span>
      <div class="controls">
        <button class="minus" data-tooltip="Зменшити кількість">−</button>
        <span class="item-count">1</span>
        <button class="plus" data-tooltip="Збільшити кількість">+</button>
      </div>
      <button class="toggle-btn" data-tooltip="Позначити як куплене">Куплено</button>
      <button class="remove-btn" data-tooltip="Видалити товар">×</button>
    `;

    itemList.appendChild(item);
    input.value = "";
    input.focus();
  }

  addBtn.addEventListener("click", addProduct);
   updateStats();
  
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      addProduct();
    }
  });

  function createProduct(name, isBought = false) {
    const item = document.createElement("div");
    item.className = "item";
    if (isBought) item.classList.add("bought");

    item.innerHTML = `
      <span class="item-name">${name}</span>
      <div class="controls">
        <button class="minus" data-tooltip="Зменшити кількість">−</button>
        <span class="item-count">1</span>
        <button class="plus" data-tooltip="Збільшити кількість">+</button>
      </div>
      <button class="toggle-btn" data-tooltip="Позначити як куплене">${isBought ? "Не куплено" : "Куплено"}</button>
    `;

    const toggleBtn = item.querySelector(".toggle-btn");
    
    const nameElem = item.querySelector(".item-name");
    
    const countSpan = item.querySelector(".item-count");

    itemList.appendChild(item);
    updateStats();

const plusBtn = item.querySelector(".plus");
const minusBtn = item.querySelector(".minus");



function updateButtonsState() {
  const count = parseInt(countSpan.textContent);
  minusBtn.disabled = count <= 1;
}

plusBtn.addEventListener("click", () => {
  if (item.classList.contains("bought")) return;

  let count = parseInt(countSpan.textContent);
  count++;
  countSpan.textContent = count;
  updateButtonsState();
  updateStats();
});

minusBtn.addEventListener("click", () => {
  if (item.classList.contains("bought")) return;

  let count = parseInt(countSpan.textContent);
  if (count > 1) {
    count--;
    countSpan.textContent = count;
    updateButtonsState();
    updateStats();
  }
});

updateButtonsState();


nameElem.addEventListener("click", () => {
  if (item.classList.contains("bought")) return; 

  const currentText = nameElem.textContent;
  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.className = "edit-name-input";

  nameElem.replaceWith(input);
  input.focus();
  updateStats();
  
  input.addEventListener("blur", () => {
    const newName = input.value.trim() || currentText;
    const newSpan = document.createElement("span");
    newSpan.className = "item-name";
    newSpan.textContent = newName;

    
    newSpan.addEventListener("click", () => {
      if (item.classList.contains("bought")) return;
      input.value = newSpan.textContent;
      newSpan.replaceWith(input);
      input.focus();
    });

    input.replaceWith(newSpan);
    updateStats();
  });
});
    
    toggleBtn.addEventListener("click", () => {
      const isNowBought = item.classList.toggle("bought");
      toggleBtn.textContent = isNowBought ? "Не куплено" : "Куплено";

      if (isNowBought) {
        const removeBtn = item.querySelector(".remove-btn");
        if (removeBtn) removeBtn.remove();
        item.querySelector(".item-name").classList.add("bought");
        updateStats();
      } else {
        addRemoveButton(item); 
        item.querySelector(".item-name").classList.remove("bought");
        updateStats();
      }
    });

    if (!isBought) {
      addRemoveButton(item);
    }

    itemList.appendChild(item);
    updateStats();
  }

  
  function addRemoveButton(item) {
    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.setAttribute("data-tooltip", "Видалити товар");
    removeBtn.textContent = "×";
    removeBtn.addEventListener("click", () => {
    item.remove();
    updateStats();
  });
    item.appendChild(removeBtn);
    
  }

  
  function addProduct() {
    const name = input.value.trim();
    if (name === "") return;
    createProduct(name);
    input.value = "";
    input.focus();
  }

  
  addBtn.addEventListener("click", addProduct);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") addProduct();
  });

  
  createProduct("Хліб");
  createProduct("Сир");
  createProduct("Помідори"); 

  

const nameElem = item.querySelector(".item-name");

nameElem.addEventListener("click", () => {
  if (item.classList.contains("bought")) return;

  const currentText = nameElem.textContent;
  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.className = "edit-name-input";

  nameElem.replaceWith(input);
  input.focus();

  
  input.addEventListener("blur", () => {
    const newName = input.value.trim() || currentText;
    const newSpan = document.createElement("span");
    newSpan.className = "item-name";
    newSpan.textContent = newName;

    
    newSpan.addEventListener("click", nameElem.click);
    input.replaceWith(newSpan);
  });
});

function updateStats() {
  const leftList = document.getElementById("left-list");
  const boughtList = document.getElementById("bought-list");

  leftList.innerHTML = "";
  boughtList.innerHTML = "";

  const items = document.querySelectorAll(".item");

  items.forEach((item) => {
    const name = item.querySelector(".item-name")?.textContent;
    const count = parseInt(item.querySelector(".item-count")?.textContent || "1");
    const isBought = item.classList.contains("bought");

    const li = document.createElement("div");
    li.className = "badge";
    if (isBought) li.classList.add("bought");

    li.innerHTML = `
      <span class="name">${name}</span>
      <span class="count">${count}</span>
    `;

    if (!isBought) {
      boughtList.appendChild(li);
    } else {
      leftList.appendChild(li);
    }

      });
}


