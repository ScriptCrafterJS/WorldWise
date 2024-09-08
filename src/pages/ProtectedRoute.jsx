import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import PropTypes from "prop-types";
import { useEffect } from "react";
ProtectedRoute.propTypes = {
  children: PropTypes.node,
};
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  return isAuthenticated ? children : null;
}
