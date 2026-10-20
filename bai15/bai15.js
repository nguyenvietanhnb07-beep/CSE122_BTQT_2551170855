/* ===== bai15.js - Máy tính ===== */

/* 1. LẤY CÁC PHẦN TỬ CẦN DÙNG */
const elPhepTinh = document.getElementById("phepTinh");  // dòng phép tính
const elKetQua = document.getElementById("ketQua");      // dòng kết quả
const banPhim = document.getElementById("banPhim");      // cả bàn phím

/* 2. TRẠNG THÁI: biểu thức đang nhập (chuỗi) và đã bấm = hay chưa */
let bieuThuc = "";                                       // ví dụ "12+8×3"
let daTinh = false;                                      // true nếu vừa bấm =

/* 3. TÍNH GIÁ TRỊ CỦA BIỂU THỨC (chuỗi -> số). Không dùng eval, tự phân tích theo thứ tự ưu tiên:
   biểu thức = hạng (+ −) hạng ...   |   hạng = nhân tử (× ÷) nhân tử ...   |   nhân tử có thể có dấu − và % */
function tinhGiaTri(chuoi) {
  const thieu = (chuoi.match(/\(/g) || []).length - (chuoi.match(/\)/g) || []).length;  // số ngoặc "(" chưa đóng
  chuoi += ")".repeat(Math.max(thieu, 0));               // tự đóng ngoặc còn thiếu
  const t = chuoi.match(/\d+\.?\d*|\.\d+|[+−×÷()%]/g) || [];  // tách chuỗi thành các phần: số, phép tính, ngoặc
  let vt = 0;                                            // vị trí phần đang đọc

  function cuaSo() {                                     // đọc một số hoặc một biểu thức trong ngoặc
    const x = t[vt++];                                   // lấy phần hiện tại rồi sang phần kế
    if (x === "(") {                                     // gặp ngoặc mở
      const v = bieuThucCon();                           // tính biểu thức bên trong
      if (t[vt++] !== ")") throw new Error("thiếu )");   // phải có ngoặc đóng
      return v;
    }
    if (x !== undefined && /^[\d.]/.test(x)) return parseFloat(x);  // là số thì đổi sang số
    throw new Error("sai cú pháp");                      // còn lại là sai
  }

  function nhanTu() {                                    // đọc số có thể kèm dấu − phía trước hoặc % phía sau
    if (t[vt] === "−") { vt++; return -nhanTu(); }       // dấu âm
    let v = cuaSo();                                     // đọc số
    while (t[vt] === "%") { vt++; v = v / 100; }         // mỗi % chia 100
    return v;
  }

  function hang() {                                      // xử lý × ÷ (ưu tiên cao hơn + −)
    let v = nhanTu();
    while (t[vt] === "×" || t[vt] === "÷") {
      const pt = t[vt++];                                // phép tính hiện tại
      const r = nhanTu();                                // số bên phải
      if (pt === "÷" && r === 0) throw new Error("chia cho 0");  // chia cho 0 là lỗi
      v = pt === "×" ? v * r : v / r;
    }
    return v;
  }

  function bieuThucCon() {                               // xử lý + −
    let v = hang();
    while (t[vt] === "+" || t[vt] === "−") {
      const pt = t[vt++];
      const r = hang();
      v = pt === "+" ? v + r : v - r;
    }
    return v;
  }

  const kq = bieuThucCon();                              // tính toàn bộ
  if (vt !== t.length) throw new Error("thừa ký tự");    // còn phần chưa đọc thì sai
  return kq;
}

/* 4. ĐỔI SỐ THÀNH CHỮ ĐỂ HIỂN THỊ (làm tròn để tránh 0.1+0.2 = 0.30000000000000004) */
function dinhDangSo(so) {
  return String(parseFloat(so.toPrecision(12)));
}

/* 5. HIỂN THỊ: dòng phép tính có khoảng trắng quanh dấu, dòng kết quả cập nhật khi tính được */
function hienThi() {
  elPhepTinh.textContent = bieuThuc.replace(/([+−×÷])/g, " $1 ");  // "12+8×3" -> "12 + 8 × 3"
  if (bieuThuc === "") { elKetQua.textContent = "0"; return; }     // chưa nhập gì
  try {
    elKetQua.textContent = dinhDangSo(tinhGiaTri(bieuThuc));       // tính được thì hiện kết quả
  } catch (loi) {
    if (daTinh) elKetQua.textContent = "Lỗi";                      // bấm = mà sai thì báo lỗi
    /* đang nhập dở thì giữ nguyên kết quả cũ */
  }
}

/* 6. XỬ LÝ KHI BẤM MỘT NÚT */
function nhanNut(gt) {
  const cuoi = bieuThuc.slice(-1);                       // ký tự cuối của biểu thức

  if (gt === "C") {                                      // C: xoá hết
    bieuThuc = ""; daTinh = false;
  } else if (gt === "=") {                               // =: hiện kết quả
    if (bieuThuc !== "") daTinh = true;
  } else if (/\d|\./.test(gt)) {                         // số hoặc dấu chấm
    if (daTinh) { bieuThuc = ""; daTinh = false; }       // vừa tính xong thì bắt đầu phép tính mới
    const soCuoi = bieuThuc.split(/[+−×÷()%]/).pop();    // số đang nhập dở
    if (gt === "." && soCuoi.includes(".")) return;      // một số chỉ có một dấu chấm
    if (cuoi === ")" || cuoi === "%") bieuThuc += "×";   // sau ")" hoặc "%" tự thêm dấu ×
    bieuThuc += gt;
  } else if (gt === "()") {                              // nút ngoặc: tự chọn mở hoặc đóng
    if (daTinh) { bieuThuc = ""; daTinh = false; }
    const mo = (bieuThuc.match(/\(/g) || []).length;     // số ngoặc mở
    const dong = (bieuThuc.match(/\)/g) || []).length;   // số ngoặc đóng
    const cuoiLaSo = /[\d.)%]/.test(bieuThuc.slice(-1)); // ký tự cuối là số, ")" hoặc "%"
    if (mo > dong && cuoiLaSo) bieuThuc += ")";          // còn ngoặc chưa đóng và vừa nhập số: đóng ngoặc
    else bieuThuc += (cuoiLaSo ? "×(" : "(");            // ngược lại mở ngoặc (thêm × nếu đứng sau số)
  } else if (gt === "%") {                               // phần trăm
    if (daTinh) daTinh = false;
    if (/[\d)%]/.test(cuoi)) bieuThuc += "%";            // chỉ thêm % sau số, ")" hoặc %
  } else {                                               // + − × ÷
    if (daTinh) {                                        // vừa tính xong thì dùng kết quả để tính tiếp
      bieuThuc = elKetQua.textContent === "Lỗi" ? "" : elKetQua.textContent.replace("-", "−");
      daTinh = false;
    }
    if (bieuThuc === "" && gt !== "−") return;           // chưa có số thì chỉ cho nhập dấu −
    if (cuoi === "(" && gt !== "−") return;              // sau "(" chỉ cho dấu −
    if (/[+−×÷]/.test(cuoi)) bieuThuc = bieuThuc.slice(0, -1);  // đang có dấu ở cuối thì thay bằng dấu mới
    bieuThuc += gt;
  }
  hienThi();                                             // cập nhật màn hình
}

/* 7. SỰ KIỆN: lắng nghe click trên cả bàn phím, biết nút nào được bấm qua data-gt */
banPhim.addEventListener("click", function (e) {
  const nut = e.target.closest("button");                // tìm nút được bấm
  if (nut) nhanNut(nut.dataset.gt);                      // gọi hàm xử lý với giá trị của nút
});