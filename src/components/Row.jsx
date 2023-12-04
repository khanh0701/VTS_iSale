import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import icons from "../untils/icons";
import { toast } from "react-toastify";
const { MdDelete } = icons;

const Row = ({
  index,
  item,
  dataHangHoa,
  roundNumber,
  handleDeleteRow,
  setRowData,
}) => {
  //   const [formRow, setFormRow] = useState({
  //     MaHang: item.MaHang,
  //     TenHang: item.TenHang,
  //     DVT: item.DVT,
  //     SoLuong: item.SoLuong,
  //     TienHang: item.TienHang,
  //     Thue: item.Thue,
  //     TienThue: item.TienThue,
  //     ThanhTien: item.TienThue,
  //   });
  //   console.log("item", item);
  const [x, setX] = useState(item.SoLuong);

  const handleChangeData = (e) => {
    const mahang = e.target.value;
    const selectedItem = dataHangHoa.find((item) => item.MaHang === mahang);
    setRowData((prev) => {
      const newData = prev.map((i) => {
        if (i.MaHang === item.MaHang) {
          return {
            ...i,
            MaHang: selectedItem.MaHang,
            TenHang: selectedItem.TenHang,
            DVT: selectedItem.DVT,
            SoLuong: 1,
          };
        }
        return i;
      });
      return newData;
    });
  };

  const handleChangeQuantity = (e) => {
    // const isValid = /^[0-9]*$/.test(e.target.value);
    // if (!isValid) return;
    // console.log(e.target.value);
    // console.log(e.target.value.replace(/\./g, ""));
    // console.log(Math.round(e.target.value.replace(/\./g, "")));
    // const newQuantity = e.target.value;
    const newQuantity = Number(Math.round(x)).toFixed(1);
    setX(newQuantity);
    setRowData((prev) => {
      const newData = prev.map((i) => {
        if (i.MaHang === item.MaHang) {
          return {
            ...i,
            SoLuong: newQuantity,
          };
        }
        return i;
      });
      return newData;
    });
  };

  const handleChangePrice = (e) => {
    const isValid = /^[0-9,]*$/.test(e.target.value);
    if (!isValid) return;
    const newPrice = Number(e.target.value.replace(/,/g, "")).toLocaleString();
    console.log(newPrice);
    setRowData((prev) => {
      const newData = prev.map((i) => {
        if (i.MaHang === item.MaHang) {
          return {
            ...i,
            DonGia: newPrice,
          };
        }
        return i;
      });
      return newData;
    });
  };

  return (
    <tr key={index}>
      <td className="py-2 px-4 border text-center ">{index + 1}</td>
      <td className="border">
        <select
          className=" bg-white  w-[200px] h-full outline-none  "
          value={item.MaHang}
          onChange={handleChangeData}
        >
          {dataHangHoa?.map((item) => (
            <option key={item.MaHang} value={item.MaHang}>
              {item.MaHang} - {item.TenHang}
            </option>
          ))}
        </select>
      </td>
      <td className="py-2 px-4 border">{item.TenHang}</td>
      <td className="py-2 px-4 border text-center">{item.DVT}</td>
      <td className="py-2 px-4 border text-end">
        <input
          type="text"
          value={x}
          onChange={(e) => {
            const value = e.target.value;
            if (value.includes(".") && value.split(".")[1].length > 1) return;
            setX(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleChangeQuantity();
          }}
          onBlur={handleChangeQuantity}
        />
      </td>
      <td className="py-2 px-4 border text-end">
        <input
          type="text"
          pattern="[0-9]+"
          title="Please enter a numeric value"
          value={item.DonGia}
          onChange={handleChangePrice}
        />
        {/* <NumericFormat
          value={item.DonGia}
          displayType={"text"}
          thousandSeparator={true}

          // suffix={" ₫"}
        /> */}
      </td>
      <td className="py-2 px-4 border text-end">
        <NumericFormat
          value={
            item.DonGia
              ? Number(item.DonGia.replace(/,/g, "")) * Number(item.SoLuong)
              : 0
          }
          displayType={"text"}
          thousandSeparator={true}
          // suffix={" ₫"}
        />
      </td>
      <td className="py-2 px-4 border text-end">{item.Thue}</td>
      <td className="py-2 px-4 border text-end">{item.TienThue}</td>
      <td className="py-2 px-4 border text-end">{item.ThanhTien}</td>
      <td className="py-2 flex justify-center ">
        <span
          onClick={() => handleDeleteRow(index)}
          className="p-[3px] text-red-500 border  border-red-500 rounded-md hover:text-white hover:bg-red-500  cursor-pointer "
        >
          <MdDelete size={20} />
        </span>
      </td>
    </tr>
  );
};

export default Row;
