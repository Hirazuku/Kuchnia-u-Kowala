{
    const tasks = [
    ];

    const addNewTask = (newTaskContent) => {

        tasks.push({
            content: newTaskContent,
        });

        const field = document.querySelector(".js-newTask");
        field.value = "";
        render();
    }

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    }

    const doneTask = (index) => {
        tasks[index].done = !tasks[index].done;
        render();
    }

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
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li 
            class="list__item list__item--row ${task.done ? "list__item--done" : ""}"
            >
              <button 
                class="button_done_unchecked js-done ${task.done ?  "js-button__done" : ""}">✓</button 
        
              >
               ${task.content}
              <button class="js-remove button__remove"></button>
            </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;

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

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
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