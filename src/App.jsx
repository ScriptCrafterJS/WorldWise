import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesProvider";
import { AuthProvider } from "./contexts/FakeAuthContext";
import SpinnerFullPage from "./components/SpinnerFullPage";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const ProtectedRoute = lazy(() => import("./pages/ProtectedRoute"));

//=========== Bundle Size before Splitting
/* 
✓ 273 modules transformed.
dist/index.html                   0.49 kB │ gzip:   0.33 kB
dist/assets/icon-98c6b6d7.png    20.20 kB
dist/assets/index-42397445.css   29.96 kB │ gzip:   5.06 kB
dist/assets/index-1c741b62.js   510.87 kB │ gzip: 149.36 kB
*/
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CitiesProvider>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="/" element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="cities" replace />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </CitiesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
