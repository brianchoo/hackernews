import loadingSpinner from "../assets/spinner.svg";

const Spinner = () => {
  return (
    <div>
      <img className="w-20" src={loadingSpinner} alt="Spinner" />
    </div>
  );
};

export default Spinner;
