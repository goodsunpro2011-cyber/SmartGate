// 1. CHÌA KHÓA KẾT NỐI SUPABASE
const SUPABASE_URL = 'https://grgoseaoavefkcflfnna.supabase.co';
const SUPABASE_KEY = 'sb_publishable_G0KXCxStbLCT6Wh5CHsAkQ_6g0Ni1cM';

// Dùng _supabase (có dấu _) để không trùng tên với thư viện gốc
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function ghepMa() {
    let ten = document.getElementById("tenInput").value.trim();
    let lop = document.getElementById("lopInput").value.trim();

    if (ten === "" || lop === "") {
        document.getElementById("ketQua").innerText = "Phải điền đủ";
        return;
    }

    // 1. Duyệt qua bộ nhớ local xem học sinh này đã có mã chưa
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        
        try {
            let item = JSON.parse(localStorage.getItem(key));
            if (item && item.ten === ten && item.lop === lop) {
                document.getElementById("ketQua").innerText = "Mã cũ của bạn: " + item.maSo;
                return; // Dừng lại không tạo mới
            }
        } catch(e) {
            // Bỏ qua nếu dữ liệu không phải JSON
        }
    }

    // 2. Nếu là học sinh mới tinh -> Tạo mã ngẫu nhiên
    let soNgauNhien = Math.floor(1000 + Math.random() * 9000);
    let maSo = "HS" + soNgauNhien;

    // Lưu tạm vào localStorage trên máy
    let hocSinh = { ten: ten, lop: lop, maSo: maSo };
    localStorage.setItem(maSo, JSON.stringify(hocSinh));

    // Hiển thị thông báo trên màn hình
    document.getElementById("ketQua").innerText = "Đang tạo mã...";

    // 3. GỬI DỮ LIỆU LÊN DATABASE SUPABASE (Dùng biến _supabase)
    const { data, error } = await _supabase
        .from('QLHS')
        .insert([
            { 
                hoten: ten, 
                lop: lop, 
                ma_hs: maSo 
            }
        ]);

    if (error) {
        console.error("Lỗi Supabase:", error.message);
        document.getElementById("ketQua").innerText = "Mã mới: " + maSo + " (Lỗi lưu Cloud: " + error.message + ")";
    } else {
        document.getElementById("ketQua").innerText = "Mã mới của bạn: " + maSo;
    }
}
