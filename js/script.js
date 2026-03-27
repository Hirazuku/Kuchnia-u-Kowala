{
    const localStorageKey = "tasks";
    const localStorageButtonsKey = "buttons";
    const localStorageCustomDishesKey = "customDishes";
    const localStorageCustomRecipeLinksKey = "customRecipeLinks";
    const localStorageHiddenDefaultDishesKey = "hiddenDefaultDishes";
    const localStorageHiddenDefaultRecipeLinksKey = "hiddenDefaultRecipeLinks";

    const saveTasksInLocalStorage = (tasks) => {
        localStorage.setItem(localStorageKey, JSON.stringify(tasks));
    };

    const saveButtonsInLocalStorage = (buttons) => {
        localStorage.setItem(localStorageButtonsKey, JSON.stringify(buttons));
    };

    const saveCustomDishesInLocalStorage = (customDishes) => {
        localStorage.setItem(localStorageCustomDishesKey, JSON.stringify(customDishes));
    };

    const saveCustomRecipeLinksInLocalStorage = (customRecipeLinks) => {
        localStorage.setItem(localStorageCustomRecipeLinksKey, JSON.stringify(customRecipeLinks));
    };

    let tasks = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    let buttons = JSON.parse(localStorage.getItem(localStorageButtonsKey)) || [];
    let customDishes = JSON.parse(localStorage.getItem(localStorageCustomDishesKey)) || [];
    let customRecipeLinks = JSON.parse(localStorage.getItem(localStorageCustomRecipeLinksKey)) || [];
    let hiddenDefaultDishes = JSON.parse(localStorage.getItem(localStorageHiddenDefaultDishesKey)) || [];
    let hiddenDefaultRecipeLinks = JSON.parse(localStorage.getItem(localStorageHiddenDefaultRecipeLinksKey)) || [];

    const saveHiddenDefaultDishesInLocalStorage = (items) => {
        localStorage.setItem(localStorageHiddenDefaultDishesKey, JSON.stringify(items));
    };

    const saveHiddenDefaultRecipeLinksInLocalStorage = (items) => {
        localStorage.setItem(localStorageHiddenDefaultRecipeLinksKey, JSON.stringify(items));
    };

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
            done: false,
        });

        const field = document.querySelector(".js-newTask");
        const newButton1 = document.querySelector(".js-customDishName");
        const newButton2 = document.querySelector(".js-customDishProducts");
        field.value = "";
        if (newButton1) {
            newButton1.value = "";
        }
        if (newButton2) {
            newButton2.value = "";
        }
        render();
    }

    const addManyTasks = (products) => {
        products.forEach((product) => {
            tasks.push({
                content: product,
                done: false,
            });
        });
        render();
    };

    const addCustomDish = (dishName, productsInput) => {
        const products = productsInput
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item.length > 0);

        if (!dishName || products.length === 0) {
            return;
        }

        customDishes.push({
            name: dishName,
            products,
        });
        render();
    }

    const addCustomRecipeLink = (recipeName, recipeUrl) => {
        const rawUrl = (recipeUrl || "").trim();
        if (rawUrl === "") {
            return;
        }

        const name = (recipeName || "").trim();

        // Normalizacja, żeby dało się wkleić bez http/https.
        let normalizedUrl = rawUrl;
        if (!/^https?:\/\//i.test(normalizedUrl)) {
            normalizedUrl = `https://${normalizedUrl}`;
        }

        let label = name;
        try {
            const u = new URL(normalizedUrl);
            if (!label) {
                const pathParts = u.pathname.split("/").filter(Boolean);
                const last = pathParts[pathParts.length - 1];
                label = last ? decodeURIComponent(last.replace(/[-_]/g, " ")) : u.hostname;
            }
        } catch (e) {
            // Jeśli walidacja URL się nie uda, pokażmy po prostu sam wpis.
            label = label || normalizedUrl;
        }

        customRecipeLinks.push({
            label,
            url: normalizedUrl,
        });
        render();
    }

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    }

    const removeCustomDish = (index) => {
        customDishes.splice(index, 1);
        render();
    };

    const removeCustomRecipeLink = (index) => {
        customRecipeLinks.splice(index, 1);
        render();
    };

    const removeDefaultDish = (dishId, rowElement) => {
        if (!hiddenDefaultDishes.includes(dishId)) {
            hiddenDefaultDishes.push(dishId);
            saveHiddenDefaultDishesInLocalStorage(hiddenDefaultDishes);
        }
        if (rowElement) {
            rowElement.remove();
        }
    };

    const removeDefaultRecipeLink = (linkUrl, rowElement) => {
        if (!hiddenDefaultRecipeLinks.includes(linkUrl)) {
            hiddenDefaultRecipeLinks.push(linkUrl);
            saveHiddenDefaultRecipeLinksInLocalStorage(hiddenDefaultRecipeLinks);
        }
        if (rowElement) {
            rowElement.remove();
        }
    };

    const doneTask = (index) => {
        tasks[index].done = !tasks[index].done;
        render();
    }

    const addRemoveIconToDefaultDishButtons = () => {
        const defaultDishButtons = document.querySelectorAll(".js-buttons > button.link");
        defaultDishButtons.forEach((dishButton) => {
            if (
                dishButton.classList.contains("js-userDishButton") ||
                dishButton.classList.contains("js-button") ||
                dishButton.closest(".js-defaultDishRow")
            ) {
                return;
            }

            const classBasedId = Array
                .from(dishButton.classList)
                .find((className) => className.startsWith("js-") && className !== "js-button");
            const dishId = classBasedId || dishButton.textContent.trim();
            dishButton.dataset.defaultDishId = dishId;

            const row = document.createElement("span");
            row.className = "js-defaultDishRow customActionItem";
            dishButton.parentNode.insertBefore(row, dishButton);
            row.append(dishButton);

            const removeButton = document.createElement("button");
            removeButton.className = "customActionItem__close js-removeDefaultDish";
            removeButton.textContent = "×";
            removeButton.ariaLabel = `Usuń domyślne danie ${dishButton.textContent.trim()}`;
            removeButton.type = "button";
            row.append(removeButton);

            if (hiddenDefaultDishes.includes(dishId)) {
                row.remove();
            }
        });
    };

    const addRemoveIconToDefaultRecipeLinks = () => {
        const recipeLinksContainer = document.querySelector(".js-recipeLinks");
        if (!recipeLinksContainer || !recipeLinksContainer.parentElement) {
            return;
        }

        const recipeSection = recipeLinksContainer.parentElement;
        const defaultRecipeLinks = recipeSection.querySelectorAll("a.link");
        defaultRecipeLinks.forEach((recipeLink) => {
            if (recipeLink.closest(".js-recipeLinks") || recipeLink.closest(".js-defaultRecipeRow")) {
                return;
            }

            const linkUrl = recipeLink.href;
            recipeLink.dataset.defaultRecipeUrl = linkUrl;

            const row = document.createElement("span");
            row.className = "js-defaultRecipeRow customActionItem";
            recipeLink.parentNode.insertBefore(row, recipeLink);
            row.append(recipeLink);

            const removeButton = document.createElement("button");
            removeButton.className = "customActionItem__close js-removeDefaultRecipeLink";
            removeButton.textContent = "×";
            removeButton.ariaLabel = `Usuń domyślny link ${recipeLink.textContent.trim()}`;
            removeButton.type = "button";
            row.append(removeButton);

            if (hiddenDefaultRecipeLinks.includes(linkUrl)) {
                row.remove();
            }
        });
    };

    const addRosol = () => {
        tasks.push({
            content: "Włoszczyzna",
        });
        tasks.push({
            content: "3 udka z kurczaka",
        });
        render();
    }

    const addOgorkowa = () => {
        tasks.push({
            content: "Przecier z ogórków",
        });
        tasks.push({
            content: "Śmietana 18%",
        });
        render();
    }

    const addSchab = () => {
        tasks.push({
            content: "Ziemniaki",
        });
        tasks.push({
            content: "6 kawałków mięsa schabowego",
        });
        render();
    }

    const addSchabDuszony = () => {
        tasks.push({
            content: "Ziemniaki",
        });
        tasks.push({
            content: "6 kawałków mięsa schabowego",
        });
        render();
        tasks.push({
            content: "Cebula",
        });
        render();
        tasks.push({
            content: "Papryka",
        });
        render();
        tasks.push({
            content: "Fasolka szparagowa",
        });
        render();
        tasks.push({
            content: "Śmietana 30% lub 18%",
        });
        render();
    }

    const addGulasz = () => {
        tasks.push({
            content: "2x Papryka",
        });
        tasks.push({
            content: "2x Marchew",
        });
        tasks.push({
            content: "2x Cebula",
        });
        tasks.push({
            content: "1kg łopatki wieprzowej",
        });
        render();
    }

    const addKarkowkaPomysl = () => {
        tasks.push({
            content: "Pomysł na karkówkę",
        });
        tasks.push({
            content: "Papryka",
        });
        tasks.push({
            content: "Marchew",
        });
        tasks.push({
            content: "Cebula",
        });
        tasks.push({
            content: "400g karkówki",
        });
        render();
    }

    const addFilet = () => {
        tasks.push({
            content: "Ziemniaki",
        });
        tasks.push({
            content: "Filet z kurczaka",
        });
        render();
    }

    const addCurry = () => {
        tasks.push({
            content: "Ziemniaki",
        });
        tasks.push({
            content: "Czosnek",
        });
        tasks.push({
            content: "Marchew",
        });
        tasks.push({
            content: "Cebula",
        });
        tasks.push({
            content: "Pierś z kurczaka",
        });
        tasks.push({
            content: "Sos sojowy",
        });
        tasks.push({
            content: "Sok jabłkowy",
        });
        tasks.push({
            content: "Ocet jabłkowy",
        });
        tasks.push({
            content: "Masło",
        });
        tasks.push({
            content: "Miód",
        });
        tasks.push({
            content: "Bulion",
        });
        render();
    }

    const addDramstiki = () => {
        tasks.push({
            content: "Ziemniaki",
        });
        tasks.push({
            content: "Papryka",
        });
        tasks.push({
            content: "Cebula",
        });
        tasks.push({
            content: "Pomysł na",
        });
        tasks.push({
            content: "4 dramstiki",
        });
        render();
    }

    const addRyba = () => {
        tasks.push({
            content: "Ziemniaki",
        });
        tasks.push({
            content: "Ryba",
        });
        render();
    }

    const addKalafior = () => {
        tasks.push({
            content: "Kalafior",
        });
        tasks.push({
            content: "Cebula",
        });
        tasks.push({
            content: "Marchew",
        });
        tasks.push({
            content: "Tofu",
        });
        tasks.push({
            content: "Buraczki",
        });
        render();
    }

    const addNalesnikiTwarog = () => {
        tasks.push({
            content: "Twaróg półtłusty 500g",
        });
        tasks.push({
            content: "Śmietana 18% 30g",
        });
        render();
    }

    const addRacuchy = () => {
        tasks.push({
            content: "2x Jabłko",
        });
        tasks.push({
            content: "Cukier waniliowy",
        });
        render();
    }

    const addSzpinak = () => {
        tasks.push({
            content: "Szpinak mrożony 500g",
        });
        tasks.push({
            content: "Cebula",
        });
        tasks.push({
            content: "Czosnek",
        });
        tasks.push({
            content: "Orzechy włoskie",
        });
        tasks.push({
            content: "Ser żółty lub feta",
        });
        render();
    }

    const addTagiatelle = () => {
        tasks.push({
            content: "Filet z kurczaka",
        });
        tasks.push({
            content: "Śmietanka 30% 200ml",
        });
        tasks.push({
            content: "Cebula",
        });
        tasks.push({
            content: "Czosnek",
        });
        tasks.push({
            content: "Ser do starcia 100g",
        });

        render();
    }

    const addCarbonara = () => {
        tasks.push({
            content: "Boczek",
        });
        tasks.push({
            content: "Śmietana 18% 100ml",
        });
        tasks.push({
            content: "Ser do starcia 100g",
        });
        tasks.push({
            content: "Makaron spaghetti",
        });

        render();
    }

    const addKrokiety = () => {
        tasks.push({
            content: "400g pieczarek",
        });
        tasks.push({
            content: "500g kapusty kiszonej",
        });
        tasks.push({
            content: "Marchewka",
        });
        tasks.push({
            content: "Cebula",
        });

        render();
    }

    const addBigos = () => {
        tasks.push({
            content: " 500g kapusty kiszonej",
        });

        tasks.push({
            content: "Cebula",
        });
        tasks.push({
            content: "Przecier pomidorowy",
        });
        tasks.push({
            content: "Mięso - kiełbasa, boczek, schab",
        });

        render();
    }

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const doneButtons = document.querySelectorAll(".js-done");

        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                doneTask(index);
            });
        });

        const customDishButtons = document.querySelectorAll(".js-userDishButton");
        customDishButtons.forEach((customDishButton, index) => {
            customDishButton.addEventListener("click", () => {
                const selectedDish = customDishes[index];
                if (!selectedDish) {
                    return;
                }
                addManyTasks(selectedDish.products);
            });
        });

        const removeCustomDishButtons = document.querySelectorAll(".js-removeCustomDish");
        removeCustomDishButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeCustomDish(index);
            });
        });

        const removeCustomRecipeLinkButtons = document.querySelectorAll(".js-removeCustomRecipeLink");
        removeCustomRecipeLinkButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeCustomRecipeLink(index);
            });
        });

        const removeDefaultDishButtons = document.querySelectorAll(".js-removeDefaultDish");
        removeDefaultDishButtons.forEach((removeButton) => {
            removeButton.addEventListener("click", () => {
                const row = removeButton.closest(".js-defaultDishRow");
                const dishButton = row ? row.querySelector("button.link") : null;
                if (!dishButton) {
                    return;
                }
                const dishId = dishButton.dataset.defaultDishId || dishButton.textContent.trim();
                removeDefaultDish(dishId, row);
            });
        });

        const removeDefaultRecipeLinkButtons = document.querySelectorAll(".js-removeDefaultRecipeLink");
        removeDefaultRecipeLinkButtons.forEach((removeButton) => {
            removeButton.addEventListener("click", () => {
                const row = removeButton.closest(".js-defaultRecipeRow");
                const recipeLink = row ? row.querySelector("a.link") : null;
                if (!recipeLink) {
                    return;
                }
                const linkUrl = recipeLink.dataset.defaultRecipeUrl || recipeLink.href;
                removeDefaultRecipeLink(linkUrl, row);
            });
        });
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            if (!task) continue;
            htmlString += `
            <li class="list__item list__item--row">
              <button 
                class="button_done_unchecked js-done ">✓</button>
               <a class=" ${task.done ? "list__item--done" : ""}">${task.content}</a>
              <button class="js-remove button__remove"></button>
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
        const buttonsList = document.querySelector(".js-buttons");
        const oldSavedButtons = document.querySelectorAll(".js-button");
        oldSavedButtons.forEach((button) => button.remove());
        const oldCustomDishRows = document.querySelectorAll(".js-customDishRow");
        oldCustomDishRows.forEach((row) => row.remove());

        for (const button of buttons) {
            if (!button || !buttonsList) continue;
            const savedButton = document.createElement("button");
            savedButton.className = "js-button link";
            savedButton.textContent = button.content;
            savedButton.type = "button";
            buttonsList.append(savedButton);
        }

        customDishes.forEach((dish) => {
            if (!buttonsList) return;
            const customDishWrapper = document.createElement("span");
            customDishWrapper.className = "js-customDishRow customActionItem";
            const customDishButton = document.createElement("button");
            customDishButton.className = "link js-userDishButton";
            customDishButton.textContent = dish.name;
            customDishButton.type = "button";

            const removeCustomDishButton = document.createElement("button");
            removeCustomDishButton.className = "customActionItem__close js-removeCustomDish";
            removeCustomDishButton.textContent = "×";
            removeCustomDishButton.ariaLabel = `Usuń danie ${dish.name}`;
            removeCustomDishButton.type = "button";

            customDishWrapper.append(customDishButton, removeCustomDishButton);
            buttonsList.append(customDishWrapper);
        });

        saveTasksInLocalStorage(tasks);
        saveButtonsInLocalStorage(buttons);
        saveCustomDishesInLocalStorage(customDishes);
        saveCustomRecipeLinksInLocalStorage(customRecipeLinks);

        const recipeLinksContainer = document.querySelector(".js-recipeLinks");
        if (recipeLinksContainer) {
            const oldCustomRecipeRows = recipeLinksContainer.querySelectorAll(".js-customRecipeRow");
            oldCustomRecipeRows.forEach((row) => row.remove());
            customRecipeLinks.forEach((link) => {
                if (!link || !link.url) return;
                const recipeLinkWrapper = document.createElement("span");
                recipeLinkWrapper.className = "js-customRecipeRow customActionItem";
                const recipeAnchor = document.createElement("a");
                recipeAnchor.className = "link";
                recipeAnchor.href = link.url;
                recipeAnchor.target = "_blank";
                recipeAnchor.rel = "noreferrer noopener";
                recipeAnchor.title = link.label || link.url;
                recipeAnchor.textContent = link.label || link.url;

                const removeRecipeLinkButton = document.createElement("button");
                removeRecipeLinkButton.className = "customActionItem__close js-removeCustomRecipeLink";
                removeRecipeLinkButton.textContent = "×";
                removeRecipeLinkButton.ariaLabel = `Usuń link ${link.label || link.url}`;
                removeRecipeLinkButton.type = "button";

                recipeLinkWrapper.append(recipeAnchor, removeRecipeLinkButton);
                recipeLinksContainer.append(recipeLinkWrapper);
            });
        }

        addRemoveIconToDefaultDishButtons();
        addRemoveIconToDefaultRecipeLinks();
        bindEvents();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    }

    const onFormSubmitButton = (event) => {
        event.preventDefault();

        const dishName = document.querySelector(".js-customDishName").value.trim();
        const productsInput = document.querySelector(".js-customDishProducts").value.trim();

        if (dishName === "" || productsInput === "") {
            return;
        }

        addCustomDish(dishName, productsInput);
        document.querySelector(".js-customDishName").value = "";
        document.querySelector(".js-customDishProducts").value = "";
    }

    const onFormSubmitRecipeLink = (event) => {
        event.preventDefault();

        const recipeName = document.querySelector(".js-customRecipeName").value.trim();
        const recipeUrl = document.querySelector(".js-customRecipeUrl").value.trim();

        if (recipeUrl === "") {
            return;
        }

        addCustomRecipeLink(recipeName, recipeUrl);
        document.querySelector(".js-customRecipeName").value = "";
        document.querySelector(".js-customRecipeUrl").value = "";
    }

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
        const formButton = document.querySelector(".js-formButton");
        formButton.addEventListener("submit", onFormSubmitButton);
        const recipeForm = document.querySelector(".js-formRecipeLink");
        if (recipeForm) {
            recipeForm.addEventListener("submit", onFormSubmitRecipeLink);
        }
        const rosol = document.querySelector(".js-rosol");
        rosol.addEventListener("click", addRosol);
        const ogorkowa = document.querySelector(".js-ogorkowa");
        ogorkowa.addEventListener("click", addOgorkowa);
        const schab = document.querySelector(".js-schab");
        schab.addEventListener("click", addSchab);
        const schabDuszony = document.querySelector(".js-schabDuszony");
        schabDuszony.addEventListener("click", addSchabDuszony);
        const gulasz = document.querySelector(".js-gulasz");
        gulasz.addEventListener("click", addGulasz);
        const karkowkaPomysl = document.querySelector(".js-karkowkaPomysl");
        karkowkaPomysl.addEventListener("click", addKarkowkaPomysl);
        const filet = document.querySelector(".js-filet");
        filet.addEventListener("click", addFilet);
        const curry = document.querySelector(".js-curry");
        curry.addEventListener("click", addCurry);
        const dramstiki = document.querySelector(".js-dramstiki");
        dramstiki.addEventListener("click", addDramstiki);
        const ryba = document.querySelector(".js-ryba");
        ryba.addEventListener("click", addRyba);
        const kalafior = document.querySelector(".js-kalafior");
        kalafior.addEventListener("click", addKalafior);
        const nalesnikiTwarog = document.querySelector(".js-nalesnikiTwarog");
        nalesnikiTwarog.addEventListener("click", addNalesnikiTwarog);
        const racuchy = document.querySelector(".js-racuchy");
        racuchy.addEventListener("click", addRacuchy);
        const szpinak = document.querySelector(".js-szpinak");
        szpinak.addEventListener("click", addSzpinak);
        const tagiatelle = document.querySelector(".js-tagiatelle");
        tagiatelle.addEventListener("click", addTagiatelle);
        const carbonara = document.querySelector(".js-carbonara");
        carbonara.addEventListener("click", addCarbonara);
        const krokiety = document.querySelector(".js-krokietKapusta");
        krokiety.addEventListener("click", addKrokiety);
        const bigos = document.querySelector(".js-bigos");
        bigos.addEventListener("click", addBigos);
    }

    init();
}