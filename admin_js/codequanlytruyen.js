class HangTruyen {
    constructor(hinhAnh, tenTruyen, danhMuc, soChuong, noiBat, hienThi) {
        this.hinhAnh = hinhAnh;
        this.tenTruyen = tenTruyen;
        this.danhMuc = danhMuc;
        this.soChuong = soChuong;
        this.noiBat = noiBat;
        this.hienThi = hienThi;
    }

    taoNut(iconClass, tieuDe) {
        const nut = document.createElement('button');
        nut.className = `${iconClass}-btn`;
        nut.title = tieuDe;
        const icon = document.createElement('i');
        icon.className = `fas fa-${iconClass}`;
        nut.appendChild(icon);
        return nut;
    }

    taoHang() {
        const hang = document.createElement('tr');

        // Ô hình ảnh
        const cellHinhAnh = document.createElement('td');
        const img = document.createElement('img');
        img.src = this.hinhAnh;
        cellHinhAnh.appendChild(img);
        hang.appendChild(cellHinhAnh);

        // Ô tên truyện
        const cellTenTruyen = document.createElement('td');
        cellTenTruyen.textContent = this.tenTruyen;
        hang.appendChild(cellTenTruyen);

        // Ô danh mục
        const cellDanhMuc = document.createElement('td');
        cellDanhMuc.textContent = this.danhMuc;
        hang.appendChild(cellDanhMuc);

        // Ô số chương
        const cellSoChuong = document.createElement('td');
        cellSoChuong.textContent = this.soChuong;
        hang.appendChild(cellSoChuong);

        // Ô nổi bật
        const cellNoiBat = document.createElement('td');
        const checkBoxNoiBat = document.createElement('input');
        checkBoxNoiBat.type = 'checkbox';
        checkBoxNoiBat.checked = this.noiBat;
        cellNoiBat.appendChild(checkBoxNoiBat);
        hang.appendChild(cellNoiBat);

        // Ô hiển thị
        const cellHienThi = document.createElement('td');
        const checkBoxHienThi = document.createElement('input');
        checkBoxHienThi.type = 'checkbox';
        checkBoxHienThi.checked = this.hienThi;
        cellHienThi.appendChild(checkBoxHienThi);
        hang.appendChild(cellHienThi);

        // Ô hành động
        const cellHanhDong = document.createElement('td');
        cellHanhDong.appendChild(this.taoNut('edit', 'Chỉnh sửa'));
        cellHanhDong.appendChild(this.taoNut('trash-alt', 'Xóa'));
        cellHanhDong.appendChild(this.taoNut('eye', 'Xem'));
        hang.appendChild(cellHanhDong);

        return hang;
    }
}

const soTruyenMoiTrang = 9; 
let trangHienTai = 1; 
let danhSachTruyen = []; 

function scrollToTop() {
    document.querySelector('.main-content').scrollIntoView({ behavior: 'smooth' });
}

function hienThiBang(trang, danhSachTruyenHienTai = danhSachTruyen) {
    const chiSoBatDau = (trang - 1) * soTruyenMoiTrang;
    const chiSoKetThuc = chiSoBatDau + soTruyenMoiTrang;
    const truyenHienThi = danhSachTruyenHienTai.slice(chiSoBatDau, chiSoKetThuc);

    const bangTruyen = document.getElementById('comicTableBody');
    bangTruyen.innerHTML = '';

    truyenHienThi.forEach(truyen => {
        bangTruyen.appendChild(truyen.taoHang());
    });

    capNhatPhanTrang();
    scrollToTop();
}

function capNhatPhanTrang() {
    const tongSoTrang = Math.ceil(danhSachTruyen.length / soTruyenMoiTrang);
    const pageInfo = document.getElementById('pageInfo');
    pageInfo.innerHTML = '';

    const soTrangHienThiToiDa = 10;

    let trangBatDau = Math.max(1, trangHienTai - Math.floor(soTrangHienThiToiDa / 2));
    let trangKetThuc = trangBatDau + soTrangHienThiToiDa - 1;

    if (trangKetThuc > tongSoTrang) {
        trangKetThuc = tongSoTrang;
        trangBatDau = Math.max(1, trangKetThuc - soTrangHienThiToiDa + 1);
    }

    for (let i = trangBatDau; i <= trangKetThuc; i++) {
        const trang = document.createElement('button');
        trang.textContent = i;
        trang.className = (i === trangHienTai) ? 'current-page' : '';
        trang.addEventListener('click', () => {
            trangHienTai = i;
            hienThiBang(trangHienTai);
        });
        pageInfo.appendChild(trang);
    }

    if (trangKetThuc < tongSoTrang) {
        const dot = document.createElement('span');
        dot.textContent = '...';
        pageInfo.appendChild(dot);

        const trangCuoi = document.createElement('button');
        trangCuoi.textContent = tongSoTrang;
        trangCuoi.addEventListener('click', () => {
            trangHienTai = tongSoTrang;
            hienThiBang(trangHienTai);
        });
        pageInfo.appendChild(trangCuoi);
    }
}

function thayDoiTrang(huong) {
    const trangMoi = trangHienTai + huong;
    if (trangMoi >= 1 && trangMoi <= Math.ceil(danhSachTruyen.length / soTruyenMoiTrang)) {
        trangHienTai = trangMoi;
        hienThiBang(trangHienTai);
    }
}

// Hàm tìm kiếm truyện
function searchComics() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    // Lọc danh sách truyện dựa trên từ khóa tìm kiếm
    const filteredTruyen = danhSachTruyen.filter(truyen => {
        return truyen.tenTruyen.toLowerCase().includes(searchTerm) ||
               truyen.soChuong.toString().includes(searchTerm) ||
               truyen.danhMuc.toLowerCase().includes(searchTerm);
    });
    // Hiển thị bảng với danh sách truyện đã lọc
    hienThiBang(trangHienTai, filteredTruyen);
}

// Xử lý sự kiện tìm kiếm khi nhấn nút tìm kiếm
document.getElementById('searchButton').addEventListener('click', searchComics);

// Xử lý sự kiện tự động tìm kiếm khi nhập dữ liệu
document.getElementById('searchInput').addEventListener('input', searchComics);

document.addEventListener('DOMContentLoaded', () => {
    danhSachTruyen = [
        new HangTruyen('../image/thanhguom.png', 'Thanh gươm diệt quỷ', 'Action', 45, true, true),
        new HangTruyen('../image/Harry_Potter_và_Hòn_đá_phù_thủy_bìa_2003.jpeg', 'Harry Potter và Hòn đá Phù thủy', 'Dremy', 1, true, true),
        new HangTruyen('../image/thanhguom.png', 'Harry Potter và phòng chứa bí mật', 'Dremy', 1, true, true),
        new HangTruyen('../image/thanhguom.png', 'Thanh gươm diệt quỷ', 'Action', 45, true, true),
        new HangTruyen('../image/Harry_Potter_và_Hòn_đá_phù_thủy_bìa_2003.jpeg', 'Harry Potter và Hòn đá Phù thủy', 'Dremy', 1, true, true),
        new HangTruyen('../image/thanhguom.png', 'Harry Potter và phòng chứa bí mật', 'Dremy', 1, true, true),
        new HangTruyen('../image/thanhguom.png', 'Thanh gươm diệt quỷ', 'Action', 45, true, true),
        new HangTruyen('../image/Harry_Potter_và_Hòn_đá_phù_thủy_bìa_2003.jpeg', 'Harry Potter và Hòn đá Phù thủy', 'Dremy', 1, true, true),
        new HangTruyen('../image/thanhguom.png', 'Harry Potter và phòng chứa bí mật', 'Dremy', 1, true, true),
        new HangTruyen('../image/thanhguom.png', 'Thanh gươm diệt quỷ', 'Action', 45, true, true),
        new HangTruyen('../image/thanhguom.png', 'Thanh gươm diệt quỷ', 'Action', 45, true, true),
        new HangTruyen('../image/thanhguom.png', 'Thanh gươm diệt quỷ', 'Action', 45, true, true),
        new HangTruyen('../image/Harry_Potter_và_Hòn_đá_phù_thủy_bìa_2003.jpeg', 'Harry Potter và Hòn đá Phù thủy', 'Dremy', 1, true, true),
        new HangTruyen('../image/thanhguom.png', 'Harry Potter và phòng chứa bí mật', 'Dremy', 1, true, true),
        new HangTruyen('../image/thanhguom.png', 'Thanh gươm diệt quỷ', 'Action', 45, true, true),
        new HangTruyen('../image/thanhguom.png', 'Thanh gươm diệt quỷ', 'Action', 45, true, true),
        new HangTruyen('../image/thanhguom.png', 'Thanh gươm diệt quỷ', 'Action', 45, true, true),
        new HangTruyen('../image/Harry_Potter_và_Hòn_đá_phù_thủy_bìa_2003.jpeg', 'Harry Potter và Hòn đá Phù thủy', 'Dremy', 1, true, true),
        new HangTruyen('../image/thanhguom.png', 'Harry Potter và phòng chứa bí mật', 'Dremy', 1, true, true),
        new HangTruyen('../image/thanhguom.png', 'Thanh gươm diệt quỷ', 'Action', 45, true, true),
        new HangTruyen('../image/thanhguom.png', 'Thanh gươm diệt quỷ', 'Action', 45, true, true),
        new HangTruyen('../image/thanhguom.png', 'Thanh gươm diệt quỷ', 'Action', 45, true, true),
        new HangTruyen('../image/Harry_Potter_và_Hòn_đá_phù_thủy_bìa_2003.jpeg', 'Harry Potter và Hòn đá Phù thủy', 'Dremy', 1, true, true),
        new HangTruyen('../image/thanhguom.png', 'Harry Potter và phòng chứa bí mật', 'Dremy', 1, true, true),
        new HangTruyen('../image/thanhguom.png', 'Thanh gươm diệt quỷ', 'Action', 45, true, true),
        new HangTruyen('../image/thanhguom.png', 'Thanh gươm diệt quỷ', 'Action', 45, true, true),
    
    ];

    hienThiBang(trangHienTai);

    document.getElementById('prevPage').addEventListener('click', () => thayDoiTrang(-1));
    document.getElementById('nextPage').addEventListener('click', () => thayDoiTrang(1));
});
