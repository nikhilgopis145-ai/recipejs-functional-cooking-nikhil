// 🔹 Recipe data
const recipes = [
    {
        id: 1,
        title: "Classic Spaghetti Carbonara",
        time: 25,
        difficulty: "easy",
        description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
        category: "pasta",
    },
    {
        id: 2,
        title: "Chicken Tikka Masala",
        time: 45,
        difficulty: "medium",
        description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
        category: "curry",
    },
    {
        id: 3,
        title: "Homemade Croissants",
        time: 180,
        difficulty: "hard",
        description: "Buttery, flaky French pastries that require patience but deliver amazing results.",
        category: "baking",
    },
    {
        id: 4,
        title: "Greek Salad",
        time: 15,
        difficulty: "easy",
        description: "Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.",
        category: "salad",
    },
    {
        id: 5,
        title: "Beef Wellington",
        time: 120,
        difficulty: "hard",
        description: "Tender beef fillet coated with mushroom duxelles and wrapped in puff pastry.",
        category: "meat",
    },
    {
        id: 6,
        title: "Vegetable Stir Fry",
        time: 20,
        difficulty: "easy",
        description: "Colorful mixed vegetables cooked quickly in a savory sauce.",
        category: "vegetarian",
    },
    {
        id: 7,
        title: "Pad Thai",
        time: 30,
        difficulty: "medium",
        description: "Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.",
        category: "noodles",
    },
    {
        id: 8,
        title: "Margherita Pizza",
        time: 60,
        difficulty: "medium",
        description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.",
        category: "pizza",
    },
];

// 🔹 STATE (Part 2)
let currentFilter = "all";
let currentSort = "none";

// 🔹 DOM Selection
const recipeContainer = document.querySelector("#recipe-container");
const filterButtons = document.querySelectorAll("[data-filter]");
const sortButtons = document.querySelectorAll("[data-sort]");

// 🔹 Create Recipe Card
const createRecipeCard = (recipe) => `
    <div class="recipe-card">
        <h3>${recipe.title}</h3>
        <div class="recipe-meta">
            <span>⏱️ ${recipe.time} min</span>
            <span class="difficulty ${recipe.difficulty}">
                ${recipe.difficulty}
            </span>
        </div>
        <p>${recipe.description}</p>
    </div>
`;

// 🔹 Render Recipes
const renderRecipes = (recipesToRender) => {
    recipeContainer.innerHTML = recipesToRender
        .map(createRecipeCard)
        .join("");
};

// 🔹 PURE FILTER FUNCTIONS
const filterByDifficulty = (recipes, level) =>
    recipes.filter(recipe => recipe.difficulty === level);

const filterByTime = (recipes, maxTime) =>
    recipes.filter(recipe => recipe.time < maxTime);

const applyFilter = (recipes, filterType) => {
    switch (filterType) {
        case "easy":
            return filterByDifficulty(recipes, "easy");
        case "medium":
            return filterByDifficulty(recipes, "medium");
        case "hard":
            return filterByDifficulty(recipes, "hard");
        case "quick":
            return filterByTime(recipes, 30);
        default:
            return recipes;
    }
};

// 🔹 PURE SORT FUNCTIONS
const sortByName = (recipes) =>
    [...recipes].sort((a, b) => a.title.localeCompare(b.title));

const sortByTime = (recipes) =>
    [...recipes].sort((a, b) => a.time - b.time);

const applySort = (recipes, sortType) => {
    switch (sortType) {
        case "name":
            return sortByName(recipes);
        case "time":
            return sortByTime(recipes);
        default:
            return recipes;
    }
};

// 🔹 UPDATE DISPLAY (FILTER → SORT → RENDER)
const updateDisplay = () => {
    let result = recipes;
    result = applyFilter(result, currentFilter);
    result = applySort(result, currentSort);
    renderRecipes(result);

    console.log(
        `Displaying ${result.length} recipes (Filter: ${currentFilter}, Sort: ${currentSort})`
    );
};

// 🔹 ACTIVE BUTTON UI
const updateActiveButtons = () => {
    filterButtons.forEach(btn =>
        btn.classList.toggle("active", btn.dataset.filter === currentFilter)
    );

    sortButtons.forEach(btn =>
        btn.classList.toggle("active", btn.dataset.sort === currentSort)
    );
};

// 🔹 EVENT HANDLERS
const handleFilterClick = (e) => {
    currentFilter = e.target.dataset.filter;
    updateActiveButtons();
    updateDisplay();
};

const handleSortClick = (e) => {
    currentSort = e.target.dataset.sort;
    updateActiveButtons();
    updateDisplay();
};

// 🔹 EVENT LISTENERS
const setupEventListeners = () => {
    filterButtons.forEach(btn =>
        btn.addEventListener("click", handleFilterClick)
    );

    sortButtons.forEach(btn =>
        btn.addEventListener("click", handleSortClick)
    );
};

// 🔹 INITIALIZE APP
setupEventListeners();
updateDisplay();

const RecipeApp = (() => {

    /* ================= DATA ================= */

    const recipes = [
        {
            id: 1,
            title: "Classic Spaghetti Carbonara",
            time: 25,
            difficulty: "easy",
            description: "A creamy Italian pasta dish.",
            ingredients: [
                "Spaghetti",
                "Eggs",
                "Parmesan cheese",
                "Black pepper",
                "Salt"
            ],
            steps: [
                "Boil water",
                "Cook pasta",
                {
                    text: "Prepare sauce",
                    substeps: [
                        "Beat eggs",
                        "Add cheese",
                        {
                            text: "Season",
                            substeps: ["Add salt", "Add pepper"]
                        }
                    ]
                },
                "Mix pasta and sauce",
                "Serve hot"
            ]
        },
        {
            id: 2,
            title: "Chicken Tikka Masala",
            time: 45,
            difficulty: "medium",
            description: "Spiced chicken in creamy sauce.",
            ingredients: [
                "Chicken",
                "Yogurt",
                "Tomatoes",
                "Spices",
                "Cream"
            ],
            steps: [
                "Marinate chicken",
                "Grill chicken",
                "Prepare sauce",
                "Combine chicken and sauce",
                "Serve with rice"
            ]
        },
        {
            id: 3,
            title: "Homemade Croissants",
            time: 180,
            difficulty: "hard",
            description: "Buttery French pastry.",
            ingredients: [
                "Flour",
                "Butter",
                "Yeast",
                "Milk",
                "Sugar"
            ],
            steps: [
                "Prepare dough",
                {
                    text: "Laminate dough",
                    substeps: [
                        "Roll dough",
                        "Fold butter",
                        "Chill dough"
                    ]
                },
                "Shape croissants",
                "Bake until golden"
            ]
        },
        {
            id: 4,
            title: "Greek Salad",
            time: 15,
            difficulty: "easy",
            description: "Fresh veggie salad.",
            ingredients: [
                "Tomatoes",
                "Cucumber",
                "Feta cheese",
                "Olives",
                "Olive oil"
            ],
            steps: [
                "Chop vegetables",
                "Add cheese and olives",
                "Drizzle olive oil",
                "Mix and serve"
            ]
        },
        {
            id: 5,
            title: "Beef Wellington",
            time: 120,
            difficulty: "hard",
            description: "Beef wrapped in pastry.",
            ingredients: [
                "Beef fillet",
                "Mushrooms",
                "Puff pastry",
                "Eggs",
                "Spices"
            ],
            steps: [
                "Sear beef",
                "Prepare mushroom paste",
                "Wrap beef",
                "Bake"
            ]
        },
        {
            id: 6,
            title: "Vegetable Stir Fry",
            time: 20,
            difficulty: "easy",
            description: "Quick veggie dish.",
            ingredients: [
                "Mixed vegetables",
                "Soy sauce",
                "Garlic",
                "Oil"
            ],
            steps: [
                "Heat oil",
                "Add vegetables",
                "Stir fry",
                "Serve hot"
            ]
        },
        {
            id: 7,
            title: "Pad Thai",
            time: 30,
            difficulty: "medium",
            description: "Thai noodle dish.",
            ingredients: [
                "Rice noodles",
                "Shrimp",
                "Eggs",
                "Peanuts",
                "Sauce"
            ],
            steps: [
                "Cook noodles",
                "Prepare sauce",
                "Stir fry everything",
                "Garnish and serve"
            ]
        },
        {
            id: 8,
            title: "Margherita Pizza",
            time: 60,
            difficulty: "medium",
            description: "Classic Italian pizza.",
            ingredients: [
                "Pizza dough",
                "Tomato sauce",
                "Mozzarella",
                "Basil"
            ],
            steps: [
                "Prepare dough",
                "Add toppings",
                "Bake pizza",
                "Serve hot"
            ]
        }
    ];

    /* ================= STATE ================= */

    let currentFilter = "all";
    let currentSort = "none";

    /* ================= DOM ================= */

    const recipeContainer = document.querySelector("#recipe-container");
    const filterButtons = document.querySelectorAll("[data-filter]");
    const sortButtons = document.querySelectorAll("[data-sort]");

    /* ================= RECURSION ================= */

    const renderSteps = (steps, level = 0) => {
        const cls = level === 0 ? "steps-list" : "substeps-list";
        let html = `<ol class="${cls}">`;

        steps.forEach(step => {
            if (typeof step === "string") {
                html += `<li>${step}</li>`;
            } else {
                html += `<li>${step.text}`;
                html += renderSteps(step.substeps, level + 1);
                html += `</li>`;
            }
        });

        html += `</ol>`;
        return html;
    };

    /* ================= CARD ================= */

    const createRecipeCard = (recipe) => `
        <div class="recipe-card">
            <h3>${recipe.title}</h3>
            <div class="recipe-meta">
                <span>⏱️ ${recipe.time} min</span>
                <span class="difficulty ${recipe.difficulty}">
                    ${recipe.difficulty}
                </span>
            </div>
            <p>${recipe.description}</p>

            <div class="card-actions">
                <button class="toggle-btn" data-id="${recipe.id}" data-toggle="steps">
                    Show Steps
                </button>
                <button class="toggle-btn" data-id="${recipe.id}" data-toggle="ingredients">
                    Show Ingredients
                </button>
            </div>

            <div class="steps-container" data-id="${recipe.id}">
                ${renderSteps(recipe.steps)}
            </div>

            <div class="ingredients-container" data-id="${recipe.id}">
                <ul>
                    ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
                </ul>
            </div>
        </div>
    `;

    /* ================= FILTER & SORT ================= */

    const applyFilter = (data, type) => {
        if (type === "quick") return data.filter(r => r.time < 30);
        if (type === "all") return data;
        return data.filter(r => r.difficulty === type);
    };

    const applySort = (data, type) => {
        if (type === "name") return [...data].sort((a,b) => a.title.localeCompare(b.title));
        if (type === "time") return [...data].sort((a,b) => a.time - b.time);
        return data;
    };

    const updateDisplay = () => {
        let result = applyFilter(recipes, currentFilter);
        result = applySort(result, currentSort);
        recipeContainer.innerHTML = result.map(createRecipeCard).join("");
    };

    /* ================= EVENTS ================= */

    const handleToggleClick = (e) => {
        if (!e.target.classList.contains("toggle-btn")) return;

        const id = e.target.dataset.id;
        const type = e.target.dataset.toggle;
        const box = document.querySelector(`.${type}-container[data-id="${id}"]`);

        box.classList.toggle("visible");
        e.target.textContent = box.classList.contains("visible")
            ? `Hide ${type}`
            : `Show ${type}`;
    };

    const setupEventListeners = () => {
        filterButtons.forEach(btn =>
            btn.addEventListener("click", e => {
                currentFilter = e.target.dataset.filter;
                updateDisplay();
            })
        );

        sortButtons.forEach(btn =>
            btn.addEventListener("click", e => {
                currentSort = e.target.dataset.sort;
                updateDisplay();
            })
        );

        recipeContainer.addEventListener("click", handleToggleClick);
    };

    const init = () => {
        setupEventListeners();
        updateDisplay();
        console.log("RecipeApp ready!");
    };

    return { init };

})();

RecipeApp.init();

