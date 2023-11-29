import React from "react";
import icons from "../untils/icons";
import { Checkbox, Table } from "antd";
import moment from "moment";
import { NumericFormat } from "react-number-format";

const { IoMdClose } = icons;
const Modals = ({ close, actionType, roundNumber, dataThongTin }) => {
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
      render: (text) => (
        <NumericFormat
          value={text}
          displayType={"text"}
          thousandSeparator={true}
        />
      ),
    },
  ];

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

        {actionType === "delete" && (
          <div>
            <button className="px-2 py-1 rounded-md border text-red-500">
              Cancel
            </button>
            <button className="">Ok</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modals;
