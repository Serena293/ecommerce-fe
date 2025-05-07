import Originals from "./Originals";

const OriginalsPage = () => {
  console.log("originalsPsage is rendering");
  return (
    <>
      <section className="d-flex flex-column min-vh-100">
        <div className="flex-fill">
          <Originals />
        </div>
      </section>
    </>
  );
};

export default OriginalsPage;
