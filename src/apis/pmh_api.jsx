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
