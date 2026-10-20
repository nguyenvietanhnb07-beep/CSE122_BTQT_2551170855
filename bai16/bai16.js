/* ===== bai16.js - Danh sách việc cần làm ===== */

/* 1. LẤY CÁC PHẦN TỬ CẦN DÙNG */
const bieuMau = document.getElementById("bieuMau");      // form nhập việc
const oNhap = document.getElementById("oNhap");          // ô nhập
const danhSach = document.getElementById("danhSach");    // thẻ <ul> chứa các việc
const elDem = document.getElementById("dem");            // dòng số việc còn lại

/* 2. HÀM THÊM MỘT VIỆC VÀO DANH SÁCH */
function themViec(noiDung, daXong) {
  const li = document.createElement("li");               // tạo thẻ <li> mới
  if (daXong) li.classList.add("xong");                  // nếu đã xong thì thêm class "xong"

  const oChon = document.createElement("span");          // ô đánh dấu
  oChon.className = "o-chon";

  const chu = document.createElement("span");            // phần chữ
  chu.className = "chu";
  chu.textContent = noiDung;                             // textContent chỉ ghi chữ thuần, an toàn hơn innerHTML

  const nutXoa = document.createElement("button");       // nút Xoá
  nutXoa.className = "xoa";
  nutXoa.textContent = "Xoá";

  li.append(oChon, chu, nutXoa);                         // gắn 3 phần vào <li>
  danhSach.appendChild(li);                              // gắn <li> vào danh sách
}

/* 3. HÀM CẬP NHẬT DÒNG SỐ VIỆC CÒN LẠI */
function capNhatDem() {
  const tong = danhSach.querySelectorAll("li").length;                // tổng số việc
  const conLai = danhSach.querySelectorAll("li:not(.xong)").length;   // số việc chưa có class "xong"
  if (tong === 0) elDem.textContent = "Chưa có việc nào";
  else if (conLai === 0) elDem.textContent = "Đã hoàn thành tất cả các việc";
  else elDem.textContent = "Còn " + conLai + " việc chưa hoàn thành";
}

/* 4. SỰ KIỆN: gửi form (bấm Thêm hoặc Enter) thì thêm việc */
bieuMau.addEventListener("submit", function (e) {
  e.preventDefault();                                    // chặn form tải lại trang
  const noiDung = oNhap.value.trim();                    // lấy chữ đã nhập, bỏ khoảng trắng hai đầu
  if (noiDung === "") return;                            // ô trống thì không thêm
  themViec(noiDung, false);                              // thêm việc mới (chưa xong)
  oNhap.value = "";                                      // xoá ô nhập
  oNhap.focus();                                         // đưa con trỏ về ô nhập để gõ tiếp
  capNhatDem();                                          // cập nhật số đếm
});

/* 5. SỰ KIỆN: bấm vào danh sách (một chỗ xử lý cho mọi việc, kể cả việc thêm sau) */
danhSach.addEventListener("click", function (e) {
  const li = e.target.closest("li");                     // tìm việc được bấm
  if (!li) return;                                       // bấm ra ngoài thì bỏ qua
  if (e.target.closest(".xoa")) {                        // bấm nút Xoá
    li.remove();                                         // xoá việc khỏi danh sách
  } else {                                               // bấm vào chỗ khác của việc
    li.classList.toggle("xong");                         // bật/tắt class "xong" (gạch ngang)
  }
  capNhatDem();                                          // cập nhật số đếm
});

/* 6. DỮ LIỆU MẪU LÚC MỞ TRANG */
themViec("Đọc chương HTML5 cơ bản", true);               // việc đã xong
themViec("Làm bài tập CSS Grid", false);
themViec("Quay video OBS nộp bài", false);
capNhatDem();                                            // hiện số việc còn lại