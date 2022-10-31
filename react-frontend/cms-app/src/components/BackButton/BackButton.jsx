import { useNavigate } from "react-router-dom";

const BackButton = ({ text }) => {
  const navigate = useNavigate();

  const handleOnclick = (e) => {
    navigate(-1);
  };

  return (
    <button type="reset" className="button red" onClick={handleOnclick}>
      {text}
    </button>
  );
};

export default BackButton;
