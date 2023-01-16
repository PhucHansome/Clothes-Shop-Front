class Helper {
  static formatNumberVND(x) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(x);
  }

}
export default Helper;
