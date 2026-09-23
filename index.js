document.getElementById("btnCheck").addEventListener("click", function () {
    // 1. Lấy mã nhập vào
    let maNhap = document.getElementById("studentCode").value.trim().toUpperCase();

    if (maNhap === "") {
        document.getElementById("thongBaoCheck").innerText = "Vui lòng nhập mã học sinh!";
        document.getElementById("thongBaoCheck").style.color = "#f59e0b";
        return;
    }

    // 2. Tra cứu TRỰC TIẾP theo mã học sinh
    let duLieu = localStorage.getItem(maNhap);

    // 3. Kiểm tra và xử lý giờ giấc
    if (duLieu === null) {
        document.getElementById("thongBaoCheck").innerText = "Mã này không tồn tại";
        document.getElementById("thongBaoCheck").style.color = "#ef4444";
    } else {
        let hocSinh = JSON.parse(duLieu);

        // --- BỔ SUNG: XỬ LÝ THỜI GIAN VÀ TRẠNG THÁI ---
        let now = new Date();
        let gio = now.getHours();
        let phut = now.getMinutes();

        // Đặt mốc chốt cổng: 07:15 (Bạn có thể đổi số này tùy ý)
        let trangThai = "Đúng giờ";
        if (gio > 7 || (gio === 7 && phut > 15)) {
            trangThai = "Đi muộn";
        }

        // Định dạng chuỗi thời gian hiển thị
        let thoiGianStr = now.toLocaleTimeString("vi-VN") + " - " + now.toLocaleDateString("vi-VN");

        // --- BỔ SUNG: LƯU LỊCH SỬ ĐỂ TRANG 3 ĐỌC DỮ LIỆU ---
        let luotDiemDanh = {
            maSo: maNhap,
            ten: hocSinh.ten,
            lop: hocSinh.lop,
            thoiGian: thoiGianStr,
            trangThai: trangThai
        };

        // Lưu bản ghi điểm danh này theo key riêng để Trang 3 vẽ bảng
        let keyLichSu = "CHECKIN_" + maNhap + "_" + Date.now();
        localStorage.setItem(keyLichSu, JSON.stringify(luotDiemDanh));

        // --- HIỂN THỊ KẾT QUẢ RA MÀN HÌNH ---
        let mauTrangThai = trangThai === "Đi muộn" ? "#ef4444" : "#10b981";
        
        document.getElementById("thongBaoCheck").innerHTML = 
            `Học sinh: <b>${hocSinh.ten}</b> - Lớp: <b>${hocSinh.lop}</b><br>` +
            `Trạng thái: <span style="color: ${mauTrangThai}; font-weight: bold;">${trangThai}</span> (${thoiGianStr})`;
    }
});