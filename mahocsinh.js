function ghepMa() {
    let ten = document.getElementById("tenInput").value.trim();
    let lop = document.getElementById("lopInput").value.trim();

    if (ten === "" || lop === "") {
        document.getElementById("ketQua").innerText = "Phải điền đủ";
        return;
    }

    // 1. Duyệt qua bộ nhớ xem học sinh này đã có mã chưa
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        
        // Bỏ qua các key không phải dữ liệu học sinh
        try {
            let item = JSON.parse(localStorage.getItem(key));
            if (item && item.ten === ten && item.lop === lop) {
                // Nếu tìm thấy Tên + Lớp trùng khớp -> Báo mã cũ ra luôn
                document.getElementById("ketQua").innerText = "Mã cũ của bạn: " + item.maSo;
                return; // Dừng lại không tạo mới
            }
        } catch(e) {
            // Bỏ qua nếu dữ liệu không phải JSON
        }
    }

    // 2. Nếu là học sinh mới tinh -> Mới tạo mã ngẫu nhiên
    let soNgauNhien = Math.floor(1000 + Math.random() * 9000);
    let maSo = "HS" + soNgauNhien;

    let hocSinh = { ten: ten, lop: lop, maSo: maSo };
    localStorage.setItem(maSo, JSON.stringify(hocSinh));

    document.getElementById("ketQua").innerText = "Mã mới của bạn: " + maSo;
}