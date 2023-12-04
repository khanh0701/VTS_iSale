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

export const ThemPMH = (token, formPMH, MaDoiTuong, MaKho) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("Data to be sent to API:", {
        ...formPMH,
        MaDoiTuong: MaDoiTuong,
        MaKho: MaKho,
      });
      // const response = await axios({
      //   url: "/entries/DuLieuPMH/Them",
      //   method: "post",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      //   data: { ...formPMH, MaDoiTuong: MaDoiTuong, MaKho: MaKho },
      // });

      // resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const XoaPMH = (token, Sct) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/entries/DuLieuPMH/Xoa",
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { SoChungTu: Sct },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const InPMH = (token, formPrint, SctBD, SctKT) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("Data to be sent to API:", {
        ...formPrint,
        SoChungTuBatDau: SctBD,
        SoChungTuketThuc: SctKT,
      });
      // const response = await axios({
      //   url: "/entries/DuLieuPMH/InPhieu",
      //   method: "post",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      //   data: { ...formPrint },
      // });
      // resolve(response);
    } catch (error) {
      reject(error);
    }
  });
