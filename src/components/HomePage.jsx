import mainPicture from '../assets/main-picture.jpeg'; 
const HomePage = () => {
  return (
    <>
      <section className="main-section d-flex flex-column flex-lg-row mt-5">
        <div className="w-100 w-lg-50 main-text">
          <h1 className="text-center"> Hey!</h1>
          <p className="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            nisi nesciunt amet dolore? Deleniti odio qui molestias temporibus,
            reprehenderit dolore eligendi vel eum voluptatem blanditiis alias
            quaerat incidunt nam? Accusamus!
          </p>
          <p className="text-center">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est magnam
            assumenda odio officiis deleniti impedit architecto sequi nihil
            inventore reiciendis expedita, iste autem. Cumque quasi maxime
            molestias. Quo, voluptatibus nam.
          </p>
        </div>
        <div className="w-100 w-lg-50">
          <img src={mainPicture} alt="mainpicture" className='main-picture'/>
        </div>
      </section>

      <section>
        <h2> Shop</h2>
        <div>
          <img />
        </div>
        <div>
          <img />
        </div>
      </section>
    </>
  );
};

export default HomePage;
