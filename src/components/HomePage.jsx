import mainPicture from "../assets/main-picture.jpeg";
import flowersPainting from "../assets/flowers-painting.jpeg";
import flowersPrint from "../assets/flowers-painting-print.jpeg";

const HomePage = () => {
  return (
    <>
      <section className="main-section mt-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6 main-text mb-4 mb-lg-0">
              <h1 className="text-center">Hey!</h1>
              <p className="text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quibusdam nisi nesciunt amet dolore? Deleniti odio qui molestias
                temporibus, reprehenderit dolore eligendi vel eum voluptatem
                blanditiis alias quaerat incidunt nam? Accusamus!
              </p>
              <p className="text-center">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est
                magnam assumenda odio officiis deleniti impedit architecto sequi
                nihil inventore reiciendis expedita, iste autem. Cumque quasi
                maxime molestias. Quo, voluptatibus nam.
              </p>
            </div>

            <div className="col-12 col-lg-6">
              <img
                src={mainPicture}
                alt="mainpicture"
                className="img-fluid main-picture"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5">
        <h2 className="text-center mb-4">Shop</h2>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 mb-4">
              <img
                src={flowersPainting}
                alt="flowers painting"
                className="img-fluid rounded"
              />
            </div>
            <div className="col-12 col-md-6 mb-4">
              <img
                src={flowersPrint}
                alt="flowers print"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-5">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-center mb-4">
            <span className="mb-3">Commissioned painting</span>
            <button className="btn btn-primary">Order now</button>
          </div>

          <div className="col-12 col-md-6 mb-4">
            <img
              src={flowersPrint}
              alt="flowers print"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
