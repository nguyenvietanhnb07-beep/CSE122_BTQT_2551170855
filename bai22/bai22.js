/* ===== bai22.js - Nút gạt chế độ Tối / Sáng ===== */

const gat = document.getElementById("gat");        // nút gạt
const ghiChu = document.getElementById("ghiChu");  // dòng ghi chú cuối trang

/* Cập nhật nút gạt và ghi chú theo chế độ hiện tại */
function capNhat() {
  const dangToi = document.body.classList.contains("toi");  // body có class "toi" không?
  gat.setAttribute("aria-checked", dangToi);                // báo cho trình đọc màn hình: bật hay tắt
  ghiChu.textContent = dangToi
    ? "Đây là giao diện ở chế độ TỐI (đang bật)."
    : "Đây là giao diện ở chế độ SÁNG (chế độ tối đang tắt).";
}

/* Bấm nút gạt: thêm hoặc bỏ class "toi" trên <body>. Mọi màu dùng biến CSS nên tự đổi theo */
gat.addEventListener("click", function () {
  document.body.classList.toggle("toi");           // có thì bỏ, chưa có thì thêm
  capNhat();                                       // cập nhật nút và ghi chú
});

capNhat();                                         // chạy một lần lúc mở trang