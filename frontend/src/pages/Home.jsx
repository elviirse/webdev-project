import menuData from "../data/menu.json";

function Home() {

 
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  
  const todaysDish = menuData.find(
    (dish) => dish.day === today
  );

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">

        <p className="hero-small">
          FINNISH × INDIAN FINE DINING
        </p>

        <h1>Nordic Spices</h1>

        <p className="hero-description">
          Finnish ingredients. Indian soul. A modern lunch experience
          inspired by two culinary cultures.
        </p>

        <div className="hero-buttons">

          <a href="/menu" className="primary-btn">
            View Lunch Menu
          </a>

          <a href="/reservation" className="secondary-btn">
            Reserve a Table
          </a>

        </div>

      </section>


      {/* TODAY'S LUNCH */}
      <section className="today-section">

        <p className="section-small">
          TODAY AT NORDIC SPICES
        </p>

        <h2>Today's Lunch</h2>

        <p className="today-intro">
          Nordic ingredients meet the warmth and spices of Indian cuisine.
        </p>


        {todaysDish ? (

          <div className="lunch-card">

            <div>

              <span className="dish-type">
                {todaysDish.day.toUpperCase()}
              </span>

              <h3>{todaysDish.name}</h3>

              <p className="dish-description">
                {todaysDish.description}
              </p>


              <div className="dietary">

                {todaysDish.dietary.map((item) => (
                  <span key={item}>
                    {item}
                  </span>
                ))}

              </div>


              {todaysDish.allergens.length > 0 && (

                <p className="allergens">
                  Allergens: {todaysDish.allergens.join(", ")}
                </p>

              )}

            </div>


            <p className="price">
              €{todaysDish.price.toFixed(2)}
            </p>

          </div>

        ) : (

          <div className="lunch-card">

            <div>
              <h3>Weekend</h3>

              <p className="dish-description">
                Our lunch menu is available Monday to Friday.
              </p>
            </div>

          </div>

        )}


        <p className="diet-info">
          V = Vegetarian • VG = Vegan • GF = Gluten Free • LF = Lactose Free
        </p>

      </section>

    </div>
  );
}

export default Home;