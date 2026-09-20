import menuData from "../data/menu.json";
import { useLanguage } from "../LanguageContext.jsx";

function Home() {
  const { language } = useLanguage();

  const text = {
    en: {
      heroSmall: "FINNISH × INDIAN FINE DINING",
      description:
        "Finnish ingredients. Indian soul. A modern lunch experience inspired by two culinary cultures.",
      viewMenu: "View Lunch Menu",
      reserve: "Reserve a Table",
      todaySmall: "TODAY AT NORDIC SPICES",
      todaysLunch: "Today's Lunch",
      intro:
        "Nordic ingredients meet the warmth and spices of Indian cuisine.",
      allergens: "Allergens",
      noAllergens: "None",
      weekend: "Weekend",
      weekendText:
        "Our lunch menu is available Monday to Friday.",
      dietInfo:
        "V = Vegetarian • VE = Vegan • GF = Gluten Free • LF = Lactose Free",
      days: {
        Monday: "MONDAY",
        Tuesday: "TUESDAY",
        Wednesday: "WEDNESDAY",
        Thursday: "THURSDAY",
        Friday: "FRIDAY",
      },
    },

    fi: {
      heroSmall: "SUOMALAINEN × INTIALAINEN FINE DINING",
      description:
        "Suomalaiset raaka-aineet. Intialainen sielu. Moderni lounaskokemus kahden ruokakulttuurin inspiroimana.",
      viewMenu: "Katso lounasmenu",
      reserve: "Varaa pöytä",
      todaySmall: "TÄNÄÄN NORDIC SPICESISSA",
      todaysLunch: "Tämän päivän lounas",
      intro:
        "Pohjoismaiset raaka-aineet kohtaavat intialaisen keittiön lämmön ja mausteet.",
      allergens: "Allergeenit",
      noAllergens: "Ei allergeeneja",
      weekend: "Viikonloppu",
      weekendText:
        "Lounasmenu on saatavilla maanantaista perjantaihin.",
      dietInfo:
        "V = Kasvis • VE = Vegaaninen • GF = Gluteeniton • LF = Laktoositon",
      days: {
        Monday: "MAANANTAI",
        Tuesday: "TIISTAI",
        Wednesday: "KESKIVIIKKO",
        Thursday: "TORSTAI",
        Friday: "PERJANTAI",
      },
    },
  };

  const t = text[language];

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const todaysMenu = menuData.find(
    (dayMenu) => dayMenu.day === today
  );

  return (
    <div className="home">

      <section className="hero">
        <p className="hero-small">{t.heroSmall}</p>

        <h1>Nordic Spices</h1>

        <p className="hero-description">
          {t.description}
        </p>

        <div className="hero-buttons">
          <a href="/menu" className="primary-btn">
            {t.viewMenu}
          </a>

          <a href="/reservation" className="secondary-btn">
            {t.reserve}
          </a>
        </div>
      </section>

      <section className="today-section">
        <p className="section-small">
          {t.todaySmall}
        </p>

        <h2>{t.todaysLunch}</h2>

        <p className="today-intro">
          {t.intro}
        </p>

        {todaysMenu ? (
          todaysMenu.dishes.map((dish) => {
            const dishName =
              language === "fi"
                ? dish.nameFi
                : dish.name;

            const dishDescription =
              language === "fi"
                ? dish.descriptionFi
                : dish.description;

            const dishAllergens =
              language === "fi"
                ? dish.allergensFi
                : dish.allergens;

            return (
              <div className="lunch-card" key={dish.id}>
                <div>

                  <span className="dish-type">
                    {t.days[todaysMenu.day]}
                  </span>

                  <h3>{dishName}</h3>

                  <p className="dish-description">
                    {dishDescription}
                  </p>

                  <div className="dietary">
                    {dish.dietary.map((item) => (
                      <span key={item}>
                        {item}
                      </span>
                    ))}
                  </div>

                  <p className="allergens">
                    {t.allergens}:{" "}
                    {dishAllergens.length > 0
                      ? dishAllergens.join(", ")
                      : t.noAllergens}
                  </p>

                </div>

                <p className="price">
                  €{dish.price.toFixed(2)}
                </p>
              </div>
            );
          })
        ) : (
          <div className="lunch-card">
            <div>
              <h3>{t.weekend}</h3>

              <p className="dish-description">
                {t.weekendText}
              </p>
            </div>
          </div>
        )}

        <p className="diet-info">
          {t.dietInfo}
        </p>
      </section>

    </div>
  );
}

export default Home;