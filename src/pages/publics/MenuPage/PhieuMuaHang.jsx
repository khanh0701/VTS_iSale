import React, { useState } from "react";
import { Form, DatePicker, Space, Table, Button, Flex } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import moment from "moment";
const { RangePicker } = DatePicker;
import icons from "../../../untils/icons";

const { IoAddCircleOutline } = icons;
const PhieuMuaHang = () => {
  const [form] = Form.useForm();
  const [isValidDate, setIsValidDate] = useState();

  const handleKeyDown = (e) => {
    const validKeys = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "/",
      "Backspace",
    ];
    if (!validKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const validateDate = (_, value) => {
    const isValid = moment(value, "DD/MM/YYYY", true).isValid();
    setIsValidDate(isValid);

    return isValid
      ? Promise.resolve()
      : Promise.reject("Ngày tháng không hợp lệ");
  };

  const handleCalendarChange = (_, dateString) => {
    form.setFieldsValue({ dateRange: dateString });
    const isValid =
      moment(dateString[0], "DD/MM/YYYY", true).isValid() &&
      moment(dateString[1], "DD/MM/YYYY", true).isValid();

    setIsValidDate(isValid);
  };
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 40,
      address: "London Park",
    },
    {
      key: "3",
      name: "Jim Green",
      age: 40,
      address: "London Park",
    },
    {
      key: "4",
      name: "Jim Green",
      age: 40,
      address: "London Park",
    },
    {
      key: "5",
      name: "Jim Green",
      age: 40,
      address: "London Park",
    },
    {
      key: "6",
      name: "Jim Green",
      age: 40,
      address: "London Park",
    },
    {
      key: "7",
      name: "Jim Green",
      age: 40,
      address: "London Park",
    },
    {
      key: "8",
      name: "Jim Green",
      age: 40,
      address: "London Park",
    },
    {
      key: "9",
      name: "Jim Green",
      age: 40,
      address: "London Park",
    },
    {
      key: "10",
      name: "Jim Green",
      age: 40,
      address: "London Park",
    },
  ];
  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
      width: 60,
      hight: 10,
      fixed: "left",
    },
    {
      title: "Số Chứng Từ",
      dataIndex: "SoChungTu",
      key: "SoChungTu",
      width: 150,
      fixed: "left",
      sorter: true,
    },
    {
      title: "Ngày Chứng Từ",
      dataIndex: "NgayCTu",
      key: "NgayCTu",
      render: (text) => moment(text).format("DD/MM/YYYY"),
      width: 150,
    },
    {
      title: "Mã Đối Tượng",
      dataIndex: "MaDoiTuong",
      key: "MaDoiTuong",
      width: 150,
    },
    {
      title: "Tên đối tượng",
      dataIndex: "TenDoiTuong",
      key: "TenDoiTuong",
      width: 150,
    },
    {
      title: "Địa chỉ",
      dataIndex: "DiaChi",
      key: "DiaChi",
      width: 150,
    },
    {
      title: "Mã số thuế",
      dataIndex: "MaSoThue",
      key: "MaSoThue",
      width: 150,
    },
    {
      title: "Mã kho",
      dataIndex: "MaKho",
      key: "MaKho",
      width: 150,
    },
    {
      title: "Thông tin kho",
      dataIndex: "ThongTinKho",
      key: "ThongTinKho",
      width: 150,
    },
    {
      title: "Ghi chú",
      dataIndex: "GhiChu",
      key: "GhiChu",
      width: 150,
    },
    {
      title: "Tổng mặt hàng",
      dataIndex: "TongMatHang",
      key: "TongMatHang",
      width: 150,
    },
    {
      title: "Tổng số lượng",
      dataIndex: "TongSoLuong",
      key: "TongSoLuong",
      width: 150,
    },
    {
      title: "Tổng tiền hàng",
      dataIndex: "TongTienHang",
      key: "TongTienHang",
      width: 150,
    },
    {
      title: "Tổng tiền thuế",
      dataIndex: "TongTienThue",
      key: "TongTienThue",
      width: 150,
    },
    {
      title: "Tổng thành tiền",
      dataIndex: "TongThanhTien",
      key: "TongThanhTien",
      width: 150,
    },

    {
      title: "Thanh toán tiền mặt",
      dataIndex: "TTTienMat",
      key: "TTTienMat",
      width: 150,
    },
    {
      title: "Phiếu chi",
      dataIndex: "PhieuChi",
      key: "PhieuChi",
      width: 150,
    },
    {
      title: "Ngày tạo",
      dataIndex: "NgayTao",
      key: "NgayTao",
      render: (text) => moment(text).format("DD/MM/YYYY"),
      width: 150,
    },
    {
      title: "Người tạo",
      dataIndex: "NguoiTao",
      key: "NguoiTao",
      width: 150,
    },
    {
      title: "Ngày sửa cuối",
      dataIndex: "NgaySuaCuoi",
      key: "NgaySuaCuoi",
      render: (text) => moment(text).format("DD/MM/YYYY"),
      width: 150,
    },
    {
      title: "Người sửa cuối",
      dataIndex: "NguoiSuaCuoi",
      key: "NguoiSuaCuoi",
      width: 150,
    },
    {
      title: "Chức năng",
      key: "operation",
      fixed: "right",
      width: 100,
      render: () => <a>action</a>,
    },
  ];
  return (
    <div className="w-full ">
      <div className="text-lg font-bold mx-4 my-2 "> Phiếu mua hàng</div>
      <div className="flex justify-between items-center px-4">
        {/* date rang */}
        <div className="">
          <Form form={form}>
            <Form.Item
              name="dateRange"
              label="Ngày Tháng"
              rules={[
                {
                  validator: validateDate,
                },
              ]}
            >
              <Space>
                <RangePicker
                  format="DD/MM/YYYY"
                  picker="date"
                  onKeyDown={handleKeyDown}
                  onCalendarChange={handleCalendarChange}
                />
                {isValidDate ? (
                  <CheckCircleOutlined style={{ color: "green" }} />
                ) : (
                  <CloseCircleOutlined style={{ color: "red" }} />
                )}
              </Space>
            </Form.Item>
          </Form>
        </div>
        <div className="">
          <button className="flex items-center  py-1 px-2 bg-bg-main rounded-md text-white text-sm hover:opacity-80">
            <div className="pr-1">
              <IoAddCircleOutline size={20} />
            </div>
            <div>Thêm phiếu mua hàng</div>
          </button>
        </div>
      </div>
      <div className="custom-table p-2  w-full">
        <Table
          columns={columns}
          dataSource={data}
          scroll={{
            x: 1200,
            y: 350,
          }}
          size="small"
        ></Table>
      </div>
    </div>
  );
};

export default PhieuMuaHang;
