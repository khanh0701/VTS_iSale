import React, { useEffect, useState } from "react";
import {
  Form,
  DatePicker,
  Space,
  Table,
  Checkbox,
  Typography,
  Switch,
} from "antd";
const { Text } = Typography;
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import moment from "moment";

const { RangePicker } = DatePicker;
import icons from "../../../untils/icons";
import { toast } from "react-toastify";
import * as apis from "../../../apis";

const { IoAddCircleOutline, TiPrinter } = icons;
const PhieuMuaHang = ({ offLogin }) => {
  const [form] = Form.useForm();
  const [isValidDate, setIsValidDate] = useState(true);

  const [data, setData] = useState(null);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        await checkTokenExpiration();
      } catch (error) {
        console.error("lấy data thất bại", error);
        toast.error("lấy data thất bại. Vui lòng thử lại sau.");
      }
    };
    getData();
  }, []);

  // Hàm kiểm tra token hết hạn
  const checkTokenExpiration = async () => {
    try {
      const tokenLogin = localStorage.getItem("tokenlogin");
      const response = await apis.DanhSachPMH(tokenLogin, startDate, endDate);

      // Kiểm tra call api thành công
      if (response.data && response.data.DataError === 0) {
        setData(response.data.DataResults);
      } else if (response.data && response.data.DataError === -107) {
        // Thực hiện lấy lại token
        await refreshToken();
      } else {
        toast.error(
          "Có người đang nhập ở nơi khác. Bạn sẽ bị chuyển đến trang đăng nhập."
        );
        offLogin;
      }
    } catch (error) {
      console.error("Kiểm tra token thất bại", error);
    }
  };

  // Hàm lấy lại token
  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("rtkn");
      const response = await apis.RefreshToken(refreshToken);

      if (response.data && response.data.DataError === 0) {
        const newToken = response.data.TKN;
        localStorage.setItem("tokenlogin", newToken);

        const token = localStorage.getItem("tokenlogin");
        const response2 = await apis.TongHop(token);
        if (response2.data && response2.data.DataError === 0) {
          setData(response2.data.DataResults);
        }
      } else {
        // Xử lý khi reFreshToken het han
        toast.error("FreshToken het han. Vui lòng đăng nhập lại.");
        offLogin();
      }
    } catch (error) {
      console.error("Lấy lại token thất bại", error);
    }
  };

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
      render: (text) => (text ? moment(text).format("DD/MM/YYYY") : null),
      width: 150,
    },
    {
      title: "Tiền mặt",
      key: "TTTienMat",
      dataIndex: "TTTienMat",
      fixed: "right",
      width: 80,
      align: "center",
      render: (text) => (
        <Checkbox
          disabled={!text}
          defaultChecked={text}
          // onChange={(e) => handleRowSelectionChange(record, e)}
        />
      ),
    },
    {
      title: "Chức năng",
      key: "operation",
      fixed: "right",
      width: 200,
      render: () => <a>action</a>,
    },
  ];

  // const handleRowSelectionChange = (record, e) => {
  //   // Xử lý thay đổi lựa chọn hàng ở đây nếu cần
  // };

  console.log(dates);
  const startDate = moment(dates[0], "DD/MM/YYYY").format("YYYY-MM-DD");
  const endDate = moment(dates[1], "DD/MM/YYYY").format("YYYY-MM-DD");
  console.log("cho ta xem nào", { startDate, endDate });

  return (
    <div className="w-full h-full ">
      <div className="text-lg font-bold mx-4 my-2 "> Phiếu mua hàng</div>
      <div className="flex justify-between items-center px-4">
        {/* date rang */}
        <div className="flex ">
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
                    onChange={(values) => {
                      console.log("Selected Date Range (onChange):", values);
                      setDates(
                        values.map((item) => {
                          return moment(item);
                        })
                      );
                    }}
                    defaultValue={[
                      moment("11/11/2023", "DD/MM/YYYY"),
                      moment("11/12/2023", "DD/MM/YYYY"),
                    ]}
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
          <div className=" px-4 py-1">
            <button className="flex items-center   py-1 px-2 bg-bg-main rounded-md  text-white text-sm hover:opacity-80">
              Tìm kiếm
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center   py-1 px-2 bg-bg-main rounded-md  text-white text-sm hover:opacity-80">
            <div className="pr-1">
              <IoAddCircleOutline size={20} />
            </div>
            <div>Thêm phiếu</div>
          </button>
          <button className="flex items-center  py-1 px-2  rounded-md border-dashed border border-gray-500  text-sm hover:text-sky-500  hover:border-sky-500 ">
            <div className="pr-1">
              <TiPrinter size={20} />
            </div>
            <div>In phiếu</div>
          </button>
        </div>
      </div>
      <div className=" px-2 py-1 ">
        <Table
          // style={{ height: "600px", background: "red" }}
          columns={columns}
          dataSource={data}
          size="small"
          scroll={{
            x: 1500,
            y: 420,
          }}
          bordered
          pagination={false}
          // rowKey={(record) => record.key} // Thay 'key' bằng key thực của dữ liệu nếu có
          // summary={(pageData) => {
          //   let totalBorrow = 0;
          //   let totalRepayment = 0;
          //   pageData.forEach(({ borrow, repayment }) => {
          //     totalBorrow += borrow;
          //     totalRepayment += repayment;
          //   });
          //   return (
          //     <>
          //       <Table.Summary fixed="bottom">
          //         <Table.Summary.Row>
          //           <Table.Summary.Cell index={0}>1</Table.Summary.Cell>
          //           <Table.Summary.Cell index={1}></Table.Summary.Cell>
          //           <Table.Summary.Cell index={2}></Table.Summary.Cell>
          //           <Table.Summary.Cell index={3}></Table.Summary.Cell>
          //           <Table.Summary.Cell index={4}></Table.Summary.Cell>
          //           <Table.Summary.Cell index={5}></Table.Summary.Cell>
          //           <Table.Summary.Cell index={6}></Table.Summary.Cell>
          //           <Table.Summary.Cell index={7}></Table.Summary.Cell>
          //           <Table.Summary.Cell index={8}></Table.Summary.Cell>
          //           <Table.Summary.Cell index={9}></Table.Summary.Cell>
          //           <Table.Summary.Cell index={10}>1</Table.Summary.Cell>
          //           <Table.Summary.Cell index={11}>1</Table.Summary.Cell>
          //           <Table.Summary.Cell index={12}>1</Table.Summary.Cell>
          //           <Table.Summary.Cell index={13}>1</Table.Summary.Cell>
          //           <Table.Summary.Cell index={14}>1</Table.Summary.Cell>
          //           <Table.Summary.Cell index={15}></Table.Summary.Cell>
          //           <Table.Summary.Cell index={16}></Table.Summary.Cell>
          //           <Table.Summary.Cell index={17}></Table.Summary.Cell>
          //           <Table.Summary.Cell index={18}></Table.Summary.Cell>
          //           <Table.Summary.Cell index={19}>1</Table.Summary.Cell>
          //           <Table.Summary.Cell index={20}></Table.Summary.Cell>
          //         </Table.Summary.Row>
          //       </Table.Summary>
          //     </>
          //   );
          // }}
        ></Table>
      </div>
    </div>
  );
};

export default PhieuMuaHang;
