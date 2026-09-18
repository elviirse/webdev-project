export const menu = [
  {
    id: 1,
    name: "Chicken Curry",
    description: "Chicken curry with rice",
    price: 12.9,
    day: "Monday",
    vegetarian: false,
    vegan: false,
    glutenFree: true,
  },
  {
    id: 2,
    name: "Vegetable Pasta",
    description: "Pasta with vegetables",
    price: 10.9,
    day: "Tuesday",
    vegetarian: true,
    vegan: false,
    glutenFree: false,
  },
  {
    id: 3,
    name: "Salmon Soup",
    description: "Finnish salmon soup",
    price: 11.9,
    day: "Wednesday",
    vegetarian: false,
    vegan: false,
    glutenFree: true,
  },
  {
    id: 4,
    name: "Beef Burger",
    description: "Beef burger with fries",
    price: 13.9,
    day: "Thursday",
    vegetarian: false,
    vegan: false,
    glutenFree: false,
  },
];

export const getAllMenuItems = (req, res) => {
  res.json(menu);
};

export const getTodayMenu = (req, res) => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const todayMenu = menu.filter((item) => item.day === today);

  res.json({
    day: today,
    menu: todayMenu,
  });
};

export const getMenuItemById = (req, res) => {
  const id = Number(req.params.id);

  const item = menu.find((food) => food.id === id);

  if (!item) {
    return res.status(404).json({
      message: "Menu item not found",
    });
  }

  res.json(item);
};
