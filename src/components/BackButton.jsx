import { useNavigate } from "react-router-dom";
import Button from "./Button";
export default function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigate(-1); //this will make me go back on step
      }}
    >
      &larr; Back
    </Button>
  );
}
