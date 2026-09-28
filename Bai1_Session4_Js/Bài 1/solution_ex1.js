/*
Giải thích 2 lỗi logic:
1. Lỗi lệch một đơn vị (Off-by-one Error): Vòng lặp for sử dụng điều kiện `cupIndex < orderQuantity`, khiến cho với số lượng là 3 thì vòng lặp chỉ chạy 2 lần (tính sót ly cuối cùng). Cần sửa thành `<=`.
2. Lỗi phạm vi tính chiết khấu: Câu lệnh `totalBill = totalBill * 0.9;` bị đặt bên trong vòng lặp. Việc này khiến chiết khấu thẻ Gold bị áp dụng lặp đi lặp lại nhiều lần chồng chéo lên số tiền cộng dồn (thay vì chỉ giảm 10% một lần). Chiết khấu thẻ Gold cần được đưa ra ngoài vòng lặp, tính 1 lần duy nhất sau khi đã cộng dồn xong toàn bộ hóa đơn.
*/

const drinkName = "Phin Sữa Đá";
const basePrice = 29000;
const drinkSize = "M";
const toppingsPerCup = 2;
const orderQuantity = 3;
const isGoldMember = true;
const toppingPrice = 8000;

let sizeUpcharge = 0;
if (drinkSize === "M") sizeUpcharge = 6000;
else if (drinkSize === "L") sizeUpcharge = 10000;

const singleCupPrice = basePrice + sizeUpcharge + (toppingsPerCup * toppingPrice);

let totalBill = 0;

for (let cupIndex = 1; cupIndex <= orderQuantity; cupIndex++) {
  totalBill += singleCupPrice;
}

if (isGoldMember) {
  totalBill = totalBill * 0.9;
}

console.log("Tổng thanh toán:", totalBill, "VNĐ");
