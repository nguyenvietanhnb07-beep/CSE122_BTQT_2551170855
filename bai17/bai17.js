/* ===== bai17.js - Kiểm tra dữ liệu form đăng ký ===== */

/* 1. LẤY CÁC PHẦN TỬ */
const bieuMau = document.getElementById("bieuMau");   // form
const oHoTen = document.getElementById("hoTen");      // ô họ tên
const oEmail = document.getElementById("email");      // ô email
const oMatKhau = document.getElementById("matKhau");  // ô mật khẩu
const oXacNhan = document.getElementById("xacNhan");  // ô xác nhận mật khẩu

/* 2. CÁC HÀM KIỂM TRA: trả về chuỗi báo lỗi, hoặc "" nếu dữ liệu hợp lệ */
function kiemTraHoTen(giaTri) {
  if (giaTri.trim() === "") return "Họ và tên không được để trống";  // trim() bỏ khoảng trắng hai đầu
  return "";
}

function kiemTraEmail(giaTri) {
  if (giaTri === "") return "Vui lòng nhập email";
  if (!giaTri.includes("@")) return "Email không hợp lệ (thiếu @)";
  if (giaTri.endsWith("@")) return "Email không hợp lệ (thiếu tên miền)";
  /* Biểu thức chính quy: phần tên + @ + tên miền + dấu chấm + đuôi, không có khoảng trắng hay @ thừa */
  const mau = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!mau.test(giaTri)) return "Email không hợp lệ";
  return "";
}

function kiemTraMatKhau(giaTri) {
  if (giaTri.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự";
  return "";
}

function kiemTraXacNhan(giaTri) {
  if (giaTri === "") return "Vui lòng xác nhận mật khẩu";
  if (giaTri !== oMatKhau.value) return "Mật khẩu xác nhận không khớp";  // so với ô mật khẩu
  return "";
}

/* 3. DANH SÁCH CÁC TRƯỜNG: mỗi trường gồm ô nhập và hàm kiểm tra của nó */
const cacTruong = [
  { o: oHoTen, kiemTra: kiemTraHoTen },
  { o: oEmail, kiemTra: kiemTraEmail },
  { o: oMatKhau, kiemTra: kiemTraMatKhau },
  { o: oXacNhan, kiemTra: kiemTraXacNhan }
];

/* 4. KIỂM TRA MỘT TRƯỜNG VÀ HIỂN THỊ KẾT QUẢ. Trả về true nếu hợp lệ */
function kiemTraTruong(truong) {
  const loi = truong.kiemTra(truong.o.value);              // chạy hàm kiểm tra
  const khung = truong.o.parentElement;                    // khung .truong chứa ô nhập
  const tb = khung.querySelector(".tb");                   // dòng thông báo trong khung
  khung.classList.toggle("loi", loi !== "");               // có lỗi thì thêm class "loi" (viền đỏ), không thì bỏ
  khung.classList.toggle("hop-le", loi === "");            // hợp lệ thì thêm class "hop-le" (viền xanh)
  tb.textContent = loi === "" ? "✓ Hợp lệ" : "✗ " + loi;  // ghi thông báo
  return loi === "";
}

/* 5. SỰ KIỆN: gõ vào ô nào thì kiểm tra ô đó ngay */
cacTruong.forEach(function (truong) {
  truong.o.addEventListener("input", function () {
    kiemTraTruong(truong);                                 // kiểm tra ô đang gõ
    if (truong.o === oMatKhau && oXacNhan.value !== "") {  // đổi mật khẩu thì ô xác nhận cũng phải kiểm tra lại
      kiemTraTruong(cacTruong[3]);
    }
  });
});

/* 6. SỰ KIỆN: bấm Đăng ký thì kiểm tra tất cả các ô */
bieuMau.addEventListener("submit", function (e) {
  e.preventDefault();                                      // luôn chặn gửi form mặc định
  let tatCaDung = true;                                    // giả sử mọi ô đều đúng
  cacTruong.forEach(function (truong) {
    if (!kiemTraTruong(truong)) tatCaDung = false;         // có ô sai thì đánh dấu lại
  });
  if (!tatCaDung) return;                                  // có ô sai: dừng, các ô sai đã hiện viền đỏ

  alert("Đăng ký thành công!");                            // tất cả đúng
  bieuMau.reset();                                         // xoá dữ liệu trong form
  document.querySelectorAll(".truong").forEach(function (khung) {
    khung.classList.remove("loi", "hop-le");               // xoá màu viền
    khung.querySelector(".tb").textContent = "";           // xoá thông báo
  });
});