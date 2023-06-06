import { useNavigate } from "react-router-dom";

const Home = () => {
  const handleOnClick = useNavigate();

  return (
    <div className="_background_color container-fluid vh-100 d-flex justify-content-center ">
      <div className="row align-content-center">
        <div className="col">
          <button
            className="btn btn-danger rounded-5 text-white p-2 pe-4 ps-4"
            onClick={() => handleOnClick("/questions")}
          >
            Start quiz!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
