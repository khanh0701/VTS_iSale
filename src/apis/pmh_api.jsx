import axios from "../axios";

export const DanhSachPMH = (token, startDate, endDate) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/entries/DuLieuPMH/DanhSach",
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          ngayBatDau: startDate,
          ngayKetThuc: endDate,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const ThongTinPMH = (token, Sct) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/entries/DuLieuPMH/ThongTin",
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          SoChungTu: Sct,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const ListHelperKhoHang = (token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/entries/DuLieuPMH/ListHelper_KhoHang",
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const ListHelperDoiTuong = (token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/entries/DuLieuPMH/ListHelper_DoiTuong",
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const ListHelperHH = (token, MK) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/entries/DuLieuPMH/ListHelper_HangHoa",
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { SoChungTu: null, MaKho: MK },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const ThemPMH = (token, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/entries/DuLieuPMH/Them",
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data, // Truyền dữ liệu từ PMHForm vào đây
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
