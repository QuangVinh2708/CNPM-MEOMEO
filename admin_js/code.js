function showSection(section) {
    // Ẩn tất cả các phần
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.classList.add('hidden'));

    // Hiện phần được chọn
    document.getElementById(section).classList.remove('hidden');
}

// Hiển thị tổng quan mặc định khi trang tải
// window.onload = function() {
//     showSection('tongquan');
// };
function openEditModal(button) {
    // Lấy dòng cha của nút edit được bấm
    const row = button.closest('tr');

    // Lấy dữ liệu từ các cột trong dòng
    const chapterNumber = row.cells[0].textContent;
    const title = row.cells[1].textContent;
    const category = row.cells[2].textContent;

    // Điền dữ liệu vào modal
    document.getElementById('chapter-number').value = chapterNumber;
    document.getElementById('title').value = title;
    document.getElementById('category').value = category;

    // Hiển thị modal
    document.getElementById('editModal').classList.remove('hidden');
}

function closeEditModal() {
    document.getElementById('editModal').classList.add('hidden');
}
