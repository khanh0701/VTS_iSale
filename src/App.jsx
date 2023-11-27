import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { Home, Login, Public } from "./pages/publics";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import path from "./untils/path";
import { useState } from "react";
import {
  NhomHang,
  HangHoa,
  NhomDoiTuong,
  DoiTuong,
  HangMucThu,
  CongNoDV,
  CongNoDR,
  DoanhSoHH,
  DoanhSoKH,
  CanDoiTK,
  NhomGiaDT,
  GiaLe,
  GiaSi,
  PhieuMuaHang,
  PhieuNDC,
  PhieuXDC,
  PhieuBanHang,
  PhieuThuTien,
  PhieuChiTien,
} from "./pages/publics/MenuPage";
import HangMucChi from "./pages/publics/MenuPage/HangMucCHi";
// import * as action from "./store/actions";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate(path.PUBLIC);
  };

  const handleHome = () => {
    setIsLoggedIn(false);
    navigate(path.LOGIN);
  };

  const handleLogout = () => {
    // Xóa token khi đăng xuất
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate(path.LOGIN);
  };

  return (
    <>
      <div className="">
        <Routes>
          <Route path={path.LOGIN} element={<Login onLogin={handleLogin} />} />
          <Route
            path={path.PUBLIC}
            element={<Public offLogin={handleLogout} />}
          >
            <Route path={path.HOME} element={<Home Login={handleHome} />} />
            {/* Danh Muc */}
            <Route>
              <Route path={path.DANHMUC_NH} element={<NhomHang />} />
              <Route path={path.DANHMUC_HH} element={<HangHoa />} />
              <Route path={path.DANHMUC_NDT} element={<NhomDoiTuong />} />
              <Route path={path.DANHMUC_DT} element={<DoiTuong />} />
              <Route path={path.DANHMUC_HMT} element={<HangMucThu />} />
              <Route path={path.DANHMUC_HMC} element={<HangMucChi />} />
            </Route>
            {/* Truy Van */}
            <Route>
              <Route path={path.TRUYVAN_CNDV} element={<CongNoDV />} />
              <Route path={path.TRUYVAN_CNDR} element={<CongNoDR />} />
              <Route path={path.TRUYVAN_DSHH} element={<DoanhSoHH />} />
              <Route path={path.TRUYVAN_DSKH} element={<DoanhSoKH />} />
              <Route path={path.TRUYVAN_CDNXT_TK} element={<CanDoiTK />} />
            </Route>
            {/* Thiet Lap */}
            <Route>
              <Route path={path.THIETLAP_NGDT} element={<NhomGiaDT />} />
              <Route path={path.THIETLAP_GIALE} element={<GiaLe />} />
              <Route path={path.THIETLAP_GIASI} element={<GiaSi />} />
            </Route>
            {/* Du Lieu */}
            <Route>
              <Route path={path.DULIEU_PMH} element={<PhieuMuaHang />} />
              <Route path={path.DULIEU_NDC} element={<PhieuNDC />} />
              <Route path={path.DULIEU_XDC} element={<PhieuXDC />} />
              <Route path={path.DULIEU_PBH} element={<PhieuBanHang />} />
              <Route path={path.DULIEU_PTT} element={<PhieuThuTien />} />
              <Route path={path.DULIEU_PCT} element={<PhieuChiTien />} />
            </Route>
          </Route>

          {/* <Route path="/" element={<Navigate to={path.LOGIN} />} /> */}
        </Routes>
      </div>

      {/*  */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default App;
