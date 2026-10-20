/* ===== bai20.js - Bấm nút để đổi hiệu ứng ảnh ===== */

const anh = document.getElementById("anh");              // ảnh hoa hồng
const thanhNut = document.getElementById("thanhNut");    // thanh chứa 13 nút

/* Một chỗ lắng nghe cho cả thanh nút: bấm nút nào cũng chạy hàm này */
thanhNut.addEventListener("click", function (e) {
  const nut = e.target.closest("button");                // tìm nút vừa được bấm
  if (!nut) return;                                      // bấm ra ngoài nút thì bỏ qua

  anh.className = nut.dataset.hu;                        // đổi class của ảnh, ví dụ "gray", "blur"; CSS lo phần hiệu ứng

  thanhNut.querySelectorAll("button").forEach(function (n) {
    n.classList.remove("chon");                          // bỏ tô nổi bật ở mọi nút
  });
  nut.classList.add("chon");                             // chỉ tô nổi bật nút vừa bấm
});