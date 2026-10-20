/* ===== bai12.js - Hiển thị lịch ngày bằng JavaScript ===== */

/* 1. DỮ LIỆU: tên các thứ trong tuần.
   Date.getDay() trả về số 0-6 (0 là Chủ nhật), nên mảng xếp đúng thứ tự đó */
const TEN_THU = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];

/* 2. LẤY CÁC PHẦN TỬ HTML theo id (tìm một lần, dùng lại nhiều lần) */
const elNam = document.getElementById("nam");          // dòng năm trên khung lịch
const elThang = document.getElementById("thang");      // dòng tháng
const elNgay = document.getElementById("ngay");        // dòng ngày (số to)
const elThu = document.getElementById("thu");          // dòng thứ
const elLoiChao = document.getElementById("loiChao");  // dòng lời chào
const oNgay = document.getElementById("nhapNgay");     // ô nhập ngày
const oThang = document.getElementById("nhapThang");   // ô nhập tháng
const oNam = document.getElementById("nhapNam");       // ô nhập năm
const nutIn = document.getElementById("nutIn");        // nút In lịch

/* 3. HÀM TẠO LỜI CHÀO theo giờ hiện tại của máy */
function taoLoiChao() {
  const gio = new Date().getHours();                   // lấy giờ hiện tại (0-23)
  if (gio >= 5 && gio < 12) return "Chào buổi sáng!";  // 5h - 11h59
  if (gio >= 12 && gio < 18) return "Chào buổi chiều!"; // 12h - 17h59
  return "Chào buổi tối!";                             // các giờ còn lại
}

/* 4. HÀM IN LỊCH: hiển thị ngày/tháng/năm lên khung lịch */
function inLich(ngay, thang, nam) {
  const d = new Date(nam, thang - 1, ngay);            // tạo ngày; tháng trong JS đếm từ 0 nên phải trừ 1

  /* Nhập 31/02 thì JS tự đẩy sang 03/03, nên so lại với giá trị đã nhập để biết ngày có hợp lệ không */
  const hopLe = d.getFullYear() === nam && d.getMonth() === thang - 1 && d.getDate() === ngay;
  if (!hopLe) {                                        // nếu không hợp lệ
    alert("Ngày không hợp lệ, vui lòng nhập lại!");    // báo lỗi
    return;                                            // dừng hàm, không đổi khung lịch
  }

  elNam.textContent = nam;                             // ghi năm
  elThang.textContent = "Tháng " + thang;              // ghi "Tháng 12"
  elNgay.textContent = ngay;                           // ghi ngày
  elThu.textContent = TEN_THU[d.getDay()];             // getDay() cho số thứ tự, tra mảng ra tên thứ
}

/* 5. SỰ KIỆN: bấm nút In lịch thì đọc 3 ô nhập rồi in lịch */
nutIn.addEventListener("click", function () {
  inLich(Number(oNgay.value), Number(oThang.value), Number(oNam.value));  // value là chuỗi, đổi sang số bằng Number
});

/* 6. CHẠY LÚC MỞ TRANG: hiển thị ngày hôm nay và lời chào */
const homNay = new Date();                             // ngày giờ hiện tại
oNgay.value = homNay.getDate();                        // điền sẵn ngày vào ô nhập
oThang.value = homNay.getMonth() + 1;                  // điền sẵn tháng (cộng 1 vì JS đếm từ 0)
oNam.value = homNay.getFullYear();                     // điền sẵn năm
inLich(homNay.getDate(), homNay.getMonth() + 1, homNay.getFullYear());  // in lịch hôm nay
elLoiChao.textContent = taoLoiChao();                  // hiện lời chào theo giờ