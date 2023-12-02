/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useRef, useState } from "react";
import icons from "../untils/icons";
import * as apis from "../apis";

import { Table, Form, Input } from "antd";
import moment from "moment";
import { NumericFormat } from "react-number-format";

import ModalHH from "./ModalHH";

const { IoMdClose, MdDelete } = icons;
const Modals = ({
  close,
  actionType,
  roundNumber,
  dataThongTin,
  dataKhoHang,
  dataDoiTuong,
}) => {
  const [isShowModalHH, setIsShowModalHH] = useState(false);
  const [dataHangHoa, setDataHangHoa] = useState(null);
  const [selectedKhoHang, setSelectedKhoHang] = useState(
    dataKhoHang?.length > 0 ? dataKhoHang[0].MaKho : ""
  );
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [selectedDoiTuong, setSelectedDoiTuong] = useState();
  const [doiTuongInfo, setDoiTuongInfo] = useState({ Ten: "", DiaChi: "" });

  const startDate = moment(new Date()).format("YYYY-MM-DD");
  const endDate = moment(new Date()).format("YYYY-MM-DD");

  const [formPMH, setFormPMH] = useState({
    NgayCTu: startDate,
    DaoHan: endDate,
    TenDoiTuong: "",
    DiaChi: "",
    MaSoThue: "",
    TTTienMat: false,
    GhiChu: null,
    DataDetails: [
      {
        STT: 1,
        MaHang: "",
        TenHang: "",
        DVT: "",
        SoLuong: 0,
        DonGia: 0,
        TienHang: 0,
        TyLeThue: 0,
        TienThue: 0,
        ThanhTien: 0,
        TyLeCKTT: 0,
        TienCKTT: 0,
        TongCong: 0,
      },
    ],
  });
  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      width: 60,
      hight: 10,
      fixed: "left",
      align: "center",
    },
    {
      title: "Mã hàng",
      dataIndex: "MaHang",
      key: "MaHang",
      width: 150,
      fixed: "left",
      sorter: true,
      editable: true,
    },
    {
      title: "Tên Hàng",
      dataIndex: "TenHang",
      key: "TenHang",
      width: 150,
    },
    {
      title: "Đơn vị tính",
      dataIndex: "DVT",
      key: "DVT",
      width: 150,
      align: "center",
    },
    {
      title: "Số lượng",
      dataIndex: "SoLuong",
      key: "SoLuong",
      width: 150,
      render: (text) => roundNumber(text),
      align: "end",
    },
    {
      title: "Đơn giá",
      dataIndex: "DonGia",
      key: "DonGia",
      width: 150,
      align: "end",
      render: (text) => (
        <NumericFormat
          value={text}
          displayType={"text"}
          thousandSeparator={true}
        />
      ),
    },
    {
      title: "Tiền hàng",
      dataIndex: "TienHang",
      key: "TienHang",
      width: 150,
      align: "end",
      render: (text) => (
        <NumericFormat
          value={text}
          displayType={"text"}
          thousandSeparator={true}
        />
      ),
    },
    {
      title: "% thuế",
      dataIndex: "TyLeThue",
      key: "TyLeThue",
      width: 150,
      align: "center",
    },
    {
      title: "Tiền thuế",
      dataIndex: "TienThue",
      key: "TienThue",
      width: 150,
      align: "center",
    },
    {
      title: "Thành tiền",
      dataIndex: "ThanhTien",
      key: "ThanhTien",
      width: 150,
      align: "end",
      fixed: "right",
      render: (text) => (
        <NumericFormat
          value={text}
          displayType={"text"}
          thousandSeparator={true}
        />
      ),
    },
    {
      title: "",
      dataIndex: "ChucNang",
      key: "ChucNang",
      width: 40,
      align: "end",
      fixed: "right",
      render: () => {
        return (
          <div className=" flex gap-1 items-center justify-center ">
            <div
              title="Xóa"
              className="p-[3px] text-red-500 border  border-red-500 rounded-md hover:text-white hover:bg-red-500  "
            >
              <MdDelete size={16} />
            </div>
          </div>
        );
      },
    },
  ];

  const title = [
    "STT",
    "Mã hàng",
    "Tên hàng",
    "DVT",
    "Số lượng",
    "Đơn giá",
    "Tiền hàng",
    "% Thuế",
    "Tiền thuế",
    "Thành tiền",
    "",
  ];

  useEffect(() => {
    setFormPMH((prevFormPMH) => ({
      ...prevFormPMH,
      DataDetails: selectedRowData.map((item, index) => ({
        STT: index + 1,
        MaHang: item.MaHang,
        TenHang: item.TenHang,
        DVT: item.DVT,
        //
        SoLuong: item.SoLuong,
        DonGia: item.DonGia,
        TienHang: item.SoLuong * item.DonGia,
        TyLeThue: item.Thue,
        TienThue: item.TienThue,
        ThanhTien: item.ThanhTien,
        // TyLeCKTT: item.TyLeCKTT,
        // TienCKTT: item.TienCKTT,
        // TongCong: item.TongCong,
        TyLeCKTT: 0,
        TienCKTT: 0,
        TongCong: 0,
      })),
    }));
  }, [selectedRowData]);

  const handleSubmit = async () => {
    try {
      const tokenLogin = localStorage.getItem("tokenlogin");
      const response = await apis.ThemPMH(
        tokenLogin,
        formPMH,
        selectedDoiTuong,
        selectedKhoHang
      );
      // Kiểm tra call api thành công
      if (response.data && response.data.DataError === 0) {
        console.log("hello");
      }

      setFormPMH({
        NgayCTu: "",
        DaoHan: "",
        MaDoiTuong: "",
        TenDoiTuong: "",
        DiaChi: "",
        MaSoThue: "",
        MaKho: "",
        TTTienMat: "",
        GhiChu: "",
      });
      close();
    } catch (error) {
      console.error("Error while saving data:", error);
    }
  };
  const handleAddInList = async () => {
    try {
      const tokenLogin = localStorage.getItem("tokenlogin");
      const response = await apis.ListHelperHH(tokenLogin, selectedKhoHang);

      // Kiểm tra call api thành công
      if (response.data && response.data.DataError === 0) {
        setDataHangHoa(response.data.DataResults);
      }

      setIsShowModalHH(true);
    } catch (error) {
      console.error("Error while saving data:", error);
    }
  };

  const handleRowCreate = (newRow) => {
    setSelectedRowData((prevData) => [...prevData, newRow]);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = [...selectedRowData];
    updatedRows.splice(index, 1);
    setSelectedRowData(updatedRows);
  };

  const handleDoiTuongFocus = (event) => {
    const selectedValue = event.target.value;
    setSelectedDoiTuong(selectedValue);

    // Tìm thông tin đối tượng tương ứng và cập nhật state
    const selectedDoiTuongInfo = dataDoiTuong.find(
      (item) => item.Ma === selectedValue
    );
    setDoiTuongInfo(selectedDoiTuongInfo || { Ten: "", DiaChi: "" });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-10">
      <div className="  m-6 p-4 absolute shadow-lg bg-white rounded-md flex flex-col ">
        {actionType === "delete" && (
          <div className=" flex justify-between items-center ">
            <label>Bạn có chắc muốn xóa phiếu này không ?</label>
            <div></div>
            <button
              onClick={() => close()}
              className="text-gray-500 p-1 border hover:border-gray-300 hover:bg-red-600 hover:text-white rounded-full"
            >
              <IoMdClose />
            </button>
          </div>
        )}

        {actionType === "view" && (
          <div className=" w-[90vw] h-[600px] ">
            <div className="flex justify-between  items-start pb-1">
              <label className="font-bold ">
                Xem thông tin - phiếu mua hàng
              </label>
              <button
                onClick={() => close()}
                className="text-gray-500 p-1 border hover:border-gray-300 hover:bg-red-600 hover:text-white rounded-full"
              >
                <IoMdClose />
              </button>
            </div>
            <div className="border w-full h-[96%] rounded-sm text-sm">
              <div className="flex">
                {/* thong tin phieu */}
                <div className="w-[60%]">
                  <div className="flex p-3 gap-12 w-full ">
                    <div className=" flex items-center gap-2">
                      <label className="">Số chứng từ</label>
                      <input
                        type="text"
                        className=" border border-gray-300 outline-none  px-2"
                        value={dataThongTin?.SoChungTu}
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <label className="">Ngày</label>
                      <input
                        type="text"
                        className="border border-gray-300 outline-none px-2 "
                        value={moment(dataThongTin?.NgayCTu).format(
                          "DD/MM/YYYY"
                        )}
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <label className="">Đáo hạn</label>
                      <input
                        type="text"
                        className="border border-gray-300 outline-none px-2 "
                        value={moment(dataThongTin?.DaoHan).format(
                          "DD/MM/YYYY"
                        )}
                      />
                    </div>
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <label form="doituong" className="w-[86px]">
                      Đối tượng
                    </label>
                    <select className=" bg-white border w-full outline-none border-gray-300  ">
                      <option value="MaDoiTuong_TenDoiTuong">
                        {dataThongTin?.MaDoiTuong} - {dataThongTin?.TenDoiTuong}
                      </option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <label className="w-[86px]">Tên</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 outline-none px-2 "
                      value={dataThongTin?.TenDoiTuong}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <label className="w-[86px]">Địa chỉ</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 outline-none px-2 "
                      value={dataThongTin?.DiaChi}
                    />
                  </div>
                  <div className="flex items-center  w-full">
                    <div className="p-3 flex  items-center w-1/2">
                      <label form="khohang" className="w-[94px]">
                        Kho hàng
                      </label>
                      <select className=" bg-white border w-full  border-gray-300 hover:border-gray-500 ">
                        <option value="ThongTinKho">
                          {dataThongTin?.MaKho} - {dataThongTin?.TenKho}
                        </option>
                      </select>
                    </div>
                    <div className="flex items-center p-3 w-1/2">
                      <label className="w-[86px]">Ghi chú</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 outline-none px-2 "
                        value={dataThongTin?.GhiChu}
                      />
                    </div>
                  </div>
                </div>
                {/* thong tin cap nhat */}
                <div className="w-[40%] py-1">
                  <div className="text-center p-2 font-medium">
                    Thông tin cập nhật
                  </div>
                  <div className="border-2 rounded-md w-[98%] h-[80%] ">
                    <div className="flex justify-between items-center ">
                      <div className="flex items-center p-3  ">
                        <label className="">Người tạo</label>
                        <input
                          type="text"
                          className=" border border-gray-300 outline-none px-2"
                          value={dataThongTin?.NguoiTao}
                        />
                      </div>
                      <div className="flex items-center p-3 w-1/2">
                        <label className="">Lúc</label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 outline-none px-2 "
                          value={
                            dataThongTin?.NgayTao &&
                            moment(dataThongTin.NgayTao).isValid()
                              ? moment(dataThongTin.NgayTao).format(
                                  "DD/MM/YYYY hh:mm:ss"
                                )
                              : ""
                          }
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center ">
                      <div className="flex items-center p-3  ">
                        <label className="">Sửa cuối</label>
                        <input
                          type="text"
                          className=" border border-gray-300 outline-none px-2 "
                          value={dataThongTin?.NguoiSuaCuoi}
                        />
                      </div>
                      <div className="flex items-center p-3 w-1/2">
                        <label className="">Lúc</label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 outline-none px-2 "
                          value={
                            dataThongTin?.NgaySuaCuoi &&
                            moment(dataThongTin.NgaySuaCuoi).isValid()
                              ? moment(dataThongTin.NgaySuaCuoi).format(
                                  "DD/MM/YYYY hh:mm:ss"
                                )
                              : ""
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <Table
                  className="table_modal"
                  dataSource={dataThongTin?.DataDetails}
                  columns={columns}
                  size="small"
                  scroll={{
                    x: 1000,
                    y: 220,
                  }}
                  bordered
                  pagination={false}
                  // Bảng Tổng
                  // summary={(pageData) => {
                  //   let totalTongCong = 0;
                  //   let totalThanhTien = 0;
                  //   let totalTienHang = 0;
                  //   let totalSoLuong = 0;
                  //   let totalDonGia = 0;

                  //   pageData.forEach(
                  //     ({ TongCong, ThanhTien, TienHang, SoLuong, DonGia }) => {
                  //       totalDonGia += DonGia;
                  //       totalTienHang += TienHang;
                  //       totalSoLuong += SoLuong;
                  //       totalThanhTien += ThanhTien;
                  //       totalTongCong += TongCong;
                  //     }
                  //   );
                  //   return (
                  //     <Table.Summary fixed="bottom">
                  //       <Table.Summary.Row className="text-end font-bold">
                  //         <Table.Summary.Cell
                  //           index={0}
                  //           className="text-center "
                  //         >
                  //           {pageData.length}
                  //         </Table.Summary.Cell>
                  //         <Table.Summary.Cell index={1}></Table.Summary.Cell>
                  //         <Table.Summary.Cell index={2}></Table.Summary.Cell>
                  //         <Table.Summary.Cell index={3}></Table.Summary.Cell>
                  //         <Table.Summary.Cell index={4}>
                  //           {roundNumber(totalSoLuong)}
                  //         </Table.Summary.Cell>
                  //         <Table.Summary.Cell index={5}>
                  //           <NumericFormat
                  //             value={totalDonGia}
                  //             displayType={"text"}
                  //             thousandSeparator={true}
                  //           />
                  //         </Table.Summary.Cell>
                  //         <Table.Summary.Cell index={6}>
                  //           <NumericFormat
                  //             value={totalTienHang}
                  //             displayType={"text"}
                  //             thousandSeparator={true}
                  //           />
                  //         </Table.Summary.Cell>
                  //         <Table.Summary.Cell index={7}></Table.Summary.Cell>
                  //         <Table.Summary.Cell index={8}></Table.Summary.Cell>
                  //         <Table.Summary.Cell index={9}>
                  //           <NumericFormat
                  //             value={totalThanhTien}
                  //             displayType={"text"}
                  //             thousandSeparator={true}
                  //           />
                  //         </Table.Summary.Cell>
                  //         <Table.Summary.Cell index={10}></Table.Summary.Cell>
                  //         <Table.Summary.Cell index={11}></Table.Summary.Cell>
                  //         <Table.Summary.Cell index={12}>
                  //           <NumericFormat
                  //             value={totalTongCong}
                  //             displayType={"text"}
                  //             thousandSeparator={true}
                  //           />
                  //         </Table.Summary.Cell>
                  //       </Table.Summary.Row>
                  //     </Table.Summary>
                  //   );
                  // }}
                ></Table>
              </div>
            </div>
          </div>
        )}

        {actionType === "edit" && (
          <div className=" w-[90vw] h-[600px] ">
            <div className="flex justify-between  items-start pb-1">
              <label className="font-bold ">
                Sửa thông tin - phiếu mua hàng
              </label>
              <button
                onClick={() => close()}
                className="text-gray-500 p-1 border hover:border-gray-300 hover:bg-red-600 hover:text-white rounded-full"
              >
                <IoMdClose />
              </button>
            </div>
            <div className="border w-full h-[96%] rounded-sm text-sm">
              <div className="flex">
                {/* thong tin phieu */}
                <div className="w-[60%]">
                  <div className="flex p-3 gap-12 w-full ">
                    <div className=" flex items-center gap-2">
                      <label className="">Số chứng từ</label>
                      <input
                        readOnly
                        type="text"
                        className=" border border-gray-300 outline-none  px-2 cursor-not-allowed  bg-gray-200"
                        value={dataThongTin?.SoChungTu}
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <label className="">Ngày</label>
                      <input
                        readOnly
                        type="text"
                        className="border border-gray-300 outline-none px-2 cursor-not-allowed  bg-gray-200"
                        value={moment(dataThongTin?.NgayCTu).format(
                          "DD/MM/YYYY"
                        )}
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <label className="">Đáo hạn</label>
                      <input
                        type="text"
                        className="border border-gray-300 outline-none px-2 "
                        value={moment(dataThongTin?.DaoHan).format(
                          "DD/MM/YYYY"
                        )}
                      />
                    </div>
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <label form="doituong" className="w-[86px]">
                      Đối tượng
                    </label>
                    <select
                      readOnly
                      className=" bg-white border w-full outline-none border-gray-300  cursor-not-allowed  bg-gray-200"
                    >
                      <option value="MaDoiTuong_TenDoiTuong">
                        {dataThongTin?.MaDoiTuong} - {dataThongTin?.TenDoiTuong}
                      </option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <label className="w-[86px]">Tên</label>
                    <input
                      readOnly
                      type="text"
                      className="w-full border border-gray-300 outline-none px-2 cursor-not-allowed  bg-gray-200"
                      value={dataThongTin?.TenDoiTuong}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <label className="w-[86px]">Địa chỉ</label>
                    <input
                      readOnly
                      type="text"
                      className="w-full border border-gray-300 outline-none px-2 cursor-not-allowed  bg-gray-200 "
                      value={dataThongTin?.DiaChi}
                    />
                  </div>
                  <div className="flex items-center  w-full">
                    <div className="p-3 flex  items-center w-1/2">
                      <label form="khohang" className="w-[94px]">
                        Kho hàng
                      </label>
                      <select className=" bg-white border w-full  border-gray-300 hover:border-gray-500 ">
                        {dataKhoHang?.map((item) => (
                          <option key={item.MaKho} value={item.ThongTinKho}>
                            {item.ThongTinKho}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center p-3 w-1/2">
                      <label className="w-[86px]">Ghi chú</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 outline-none px-2 "
                        value={dataThongTin?.GhiChu}
                      />
                    </div>
                  </div>
                </div>
                {/* thong tin cap nhat */}
                <div className="w-[40%] py-1">
                  <div className="text-center p-2 font-medium">
                    Thông tin cập nhật
                  </div>
                  <div className="border-2 rounded-md w-[98%] h-[80%] ">
                    <div className="flex justify-between items-center ">
                      <div className="flex items-center p-3  ">
                        <label className="">Người tạo</label>
                        <input
                          type="text"
                          className=" border border-gray-300 outline-none px-2"
                          value={dataThongTin?.NguoiTao}
                        />
                      </div>
                      <div className="flex items-center p-3 w-1/2">
                        <label className="">Lúc</label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 outline-none px-2 "
                          value={moment(dataThongTin?.NgayTao).format(
                            "DD/MM/YYYY hh:mm:ss"
                          )}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center ">
                      <div className="flex items-center p-3  ">
                        <label className="">Sửa cuối</label>
                        <input
                          type="text"
                          className=" border border-gray-300 outline-none px-2 "
                          value={dataThongTin?.NguoiSuaCuoi}
                        />
                      </div>
                      <div className="flex items-center p-3 w-1/2">
                        <label className="">Lúc</label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 outline-none px-2 "
                          value={moment(dataThongTin?.NgaySuaCuoi).format(
                            "DD/MM/YYYY hh:mm:ss"
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">bảng</div>
            </div>
          </div>
        )}

        {actionType === "create" && (
          <div className=" w-[90vw] h-[600px] ">
            <div className="flex justify-between  items-start pb-1">
              <label className="font-bold ">
                Thêm thông tin - phiếu mua hàng
              </label>
              <button
                onClick={() => close()}
                className="text-gray-500 p-1 border hover:border-gray-300 hover:bg-red-600 hover:text-white rounded-full"
              >
                <IoMdClose />
              </button>
            </div>
            <div className="border w-full h-[96%] rounded-sm text-sm">
              <div className="flex">
                {/* thong tin phieu */}
                <div className="">
                  <div className="flex p-3 gap-12 w-full">
                    <div className="flex items-center gap-2">
                      <label className="">Số chứng từ</label>
                      <input
                        readOnly
                        type="text"
                        className=" border border-gray-300 outline-none  px-2 cursor-not-allowed  bg-gray-200"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <label className="">Ngày</label>
                      <input
                        type="text"
                        className="border border-gray-300 outline-none px-2 "
                        value={moment(formPMH.NgayCTu).format("DD/MM/YYYY")}
                        onChange={(e) =>
                          setFormPMH({ ...formPMH, NgayCTu: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      <label className="">Đáo hạn</label>
                      <input
                        type="text"
                        className="border border-gray-300 outline-none px-2 "
                        value={moment(formPMH.DaoHan).format("DD/MM/YYYY")}
                        onChange={(e) =>
                          setFormPMH({ ...formPMH, DaoHan: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <label form="doituong" className="w-[86px]">
                      Đối tượng
                    </label>
                    <select
                      className=" bg-white border w-full outline-none border-gray-300  "
                      value={selectedDoiTuong}
                      onChange={handleDoiTuongFocus}
                    >
                      {dataDoiTuong?.map((item) => (
                        <option key={item.Ma} value={item.Ma}>
                          {item.Ma} - {item.Ten}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <label className="w-[86px]">Tên</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 outline-none px-2 "
                      value={doiTuongInfo.Ten}
                      onChange={(e) =>
                        setFormPMH({ ...formPMH, Ten: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <label className="w-[86px]">Địa chỉ</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 outline-none px-2 "
                      value={doiTuongInfo.DiaChi}
                      onChange={(e) =>
                        setFormPMH({ ...formPMH, DiaChi: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex items-center  w-full">
                    <div className="p-3 flex  items-center w-1/2">
                      <label form="khohang" className="w-[94px]">
                        Kho hàng
                      </label>
                      <select
                        className=" bg-white border w-full  border-gray-300 hover:border-gray-500 "
                        onChange={(e) => setSelectedKhoHang(e.target.value)}
                        value={selectedKhoHang}
                      >
                        {dataKhoHang?.map((item) => (
                          <option key={item.MaKho} value={item.MaKho}>
                            {item.ThongTinKho}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center p-3 w-1/2">
                      <label className="w-[86px]">Ghi chú</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 outline-none px-2 "
                        value={formPMH.GhiChu}
                        onChange={(e) =>
                          setFormPMH({
                            ...formPMH,
                            GhiChu: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button className="border border-blue-500 rounded-md px-4 py-2 hover:bg-blue-500 hover:text-white">
                  Thêm hàng mới
                </button>
                <button
                  onClick={handleAddInList}
                  className="border border-blue-500 rounded-md px-4 py-2 hover:bg-blue-500 hover:text-white"
                >
                  chọn từ danh sách
                </button>
                <button
                  onClick={handleSubmit}
                  className="border border-blue-500 rounded-md px-4 py-2 hover:bg-blue-500 hover:text-white"
                >
                  tạo
                </button>
              </div>
              {/* table */}
              <div className="max-w-[98%]  max-h-[50%] mx-auto bg-white  rounded-md my-3 overflow-y-auto ">
                <table className="min-w-full min-h-full bg-white border border-gray-300 text-text-main">
                  <thead>
                    <tr>
                      {title.map((item) => (
                        <th key={item} className="py-1 px-2 border">
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedRowData.map((item, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border text-center ">
                          {index + 1}
                        </td>
                        <td className="border">
                          <select
                            className=" bg-white  w-full h-full outline-none  "
                            value={item.MaHang}
                          >
                            {dataHangHoa?.map((item) => (
                              <option key={item.MaHang} value={item.MaHang}>
                                {item.MaHang} - {item.TenHang}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-2 px-4 border">{item.TenHang}</td>
                        <td className="py-2 px-4 border text-center">
                          {item.DVT}
                        </td>
                        <td className="py-2 px-4 border text-end">
                          {roundNumber(item.SoLuong)}
                        </td>
                        <td className="py-2 px-4 border text-end">
                          <NumericFormat
                            value={item.DonGia}
                            displayType={"text"}
                            thousandSeparator={true}
                            // suffix={" ₫"}
                          />
                        </td>
                        <td className="py-2 px-4 border text-end">
                          <NumericFormat
                            value={item.TienHang}
                            displayType={"text"}
                            thousandSeparator={true}
                            // suffix={" ₫"}
                          />
                        </td>
                        <td className="py-2 px-4 border text-end">
                          {item.Thue}
                        </td>
                        <td className="py-2 px-4 border text-end">
                          {item.TienThue}
                        </td>
                        <td className="py-2 px-4 border text-end">
                          {item.ThanhTien}
                        </td>
                        <td className="py-2 flex justify-center ">
                          <span
                            onClick={() => handleDeleteRow(index)}
                            className="p-[3px] text-red-500 border  border-red-500 rounded-md hover:text-white hover:bg-red-500  cursor-pointer "
                          >
                            <MdDelete size={20} />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {actionType === "delete" && (
          <div>
            <button className="px-2 py-1 rounded-md border text-red-500">
              Cancel
            </button>
            <button className="">Ok</button>
          </div>
        )}
      </div>

      {isShowModalHH && (
        <ModalHH
          close={() => setIsShowModalHH(false)}
          data={dataHangHoa}
          onRowCreate={handleRowCreate}
        />
      )}
    </div>
  );
};

export default Modals;
