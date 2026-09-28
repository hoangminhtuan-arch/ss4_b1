# Phân tích lỗi - Quản trị Tồn kho Hàng hóa

## 1. Phân tích lỗi
- **Lỗi 1 (Lệch một đơn vị - Off-by-one Error):** 
  - **Dòng lệnh:** `for (let cupIndex = 1; cupIndex < orderQuantity; cupIndex++)`
  - **Nguyên nhân:** Vòng lặp khởi tạo từ `1` nhưng điều kiện lại là `< orderQuantity`. Với đơn hàng 3 ly, vòng lặp chỉ chạy 2 lần (1 và 2), bỏ sót ly thứ 3, dẫn đến tính thiếu tiền 1 ly.
  - **Cách sửa:** Đổi `<` thành `<=`.

- **Lỗi 2 (Đặt sai phạm vi tính toán chiết khấu):**
  - **Dòng lệnh:** `totalBill = totalBill * 0.9;` đặt bên trong thân vòng lặp.
  - **Nguyên nhân:** Khi khách là thành viên Gold, mỗi lần cộng thêm tiền 1 ly vào `totalBill`, hệ thống lại lấy toàn bộ tổng tiền lũy kế giảm đi 10%. Điều này làm cho ly đầu tiên bị giảm giá nhiều lần (nếu có nhiều ly) một cách sai lệch, gây thất thoát nghiêm trọng.
  - **Cách sửa:** Đưa khối lệnh kiểm tra và tính chiết khấu `isGoldMember` ra ngoài vòng lặp, tính 1 lần duy nhất trên tổng số hóa đơn.

## 2. Bảng Test Cases

| Trường hợp kiểm thử | Dữ liệu đầu vào | Kết quả sai thực tế (Lỗi hiện tại) | Kết quả đúng mong đợi |
| :--- | :--- | :--- | :--- |
| **TC01:** Tính tiền 3 ly size M, 2 topping, thẻ Gold | orderQuantity: 3<br>isGoldMember: true<br>drinkSize: "M"<br>toppings: 2 | Giá 1 ly: 51.000 VNĐ.<br>Lặp lần 1: 51k * 0.9 = 45.9k<br>Lặp lần 2: (45.9k + 51k)*0.9 = 87.21k<br>Kết quả sai: **87210 VNĐ** (thiếu 1 ly) | Giá 1 ly: 51.000 VNĐ.<br>Tổng 3 ly: 153.000 VNĐ<br>Giảm 10%: 153k * 0.9 = **137700 VNĐ** |
| **TC02:** Tính tiền 1 ly size M, 2 topping, thẻ Gold | orderQuantity: 1<br>isGoldMember: true<br>drinkSize: "M"<br>toppings: 2 | Vòng lặp không chạy do `1 < 1` là sai.<br>Kết quả sai: **0 VNĐ** | Chạy 1 lần (1 <= 1).<br>1 ly: 51k.<br>Giảm 10%: **45900 VNĐ** |
