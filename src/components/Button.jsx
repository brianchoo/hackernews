const Button = ({ fetchStories }) => {
  return (
    <button
      className="text-white bg-orange-500 hover:bg-orange-800 px-5 py-2.5"
      type="button"
      onClick={fetchStories}
    >
      More
    </button>
  );
};

export default Button;
