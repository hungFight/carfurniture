import React from "react";
import styles from "../../../styleHomePage.module.scss";
const page = () => {
  return (
    <div className="w-full min-[1000px]:flex justify-center">
      <div className="w-full min-[1200px]:w-[1200px] relative mt-15 border-t p-5">
        <div>
          <div className="min-[1000px]:flex">
            <div className="w-full h-[300px] min-[600px]:w-[500px]  ">
              <img
                src="https://i.pinimg.com/originals/07/8c/71/078c71955fe352c544e395fbafddf82c.jpg"
                alt="car"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-1 min-[1000px]:ml-3 ">
              <h3
                className={`font-bold text-sm md:text-base ${styles.nameTag}`}
              >
                Super Car HD Wallpaper in 2023s
              </h3>
              <div className="w-full mt-1 md:mt-2 flex  items-center border-b border-solid">
                <p className="text-[13px] md:text-[14px] font-medium text-[crimson]">
                  100.000.000đ
                </p>
                <p className="text-[10px] md:text-[11px] mt-[5px] ml-2 line-through">
                  102.000.000đ
                </p>
              </div>
              <div className="mt-3 flex ">
                <div className="w-fit mr-2 my-2 text-white py-2 px-5 rounded-[20px] bg-slate-700">
                  Link others
                </div>
                <div className="w-fit mr-2 my-2 text-white py-2 px-5 rounded-[20px] bg-slate-700">
                  Link others
                </div>
                <div className="w-fit mr-2 my-2 text-white py-2 px-5 rounded-[20px] bg-slate-700">
                  Link others
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-sm font-semibold">Mô tả</h3>
            <p className="text-xs md:text-[13px]">
              👉Full tính năng ẩn chi tiết cho từng dòng xe Mazda:
              https://goo.gl/U7mbC7 #Hotline_CSKH/Tư Vấn:
              0948382898#Mazda_VN_Shop_49_Tỉnh_Tại_Việt_Nam#Bảo_Hành_Cập_Nhật_Phần_Mềm_Trọn_Đời_Xe-----------------------------1.
              Việt Hóa Full Mazda Connect: đưa thêm giao diện ngôn ngữ Tiếng
              Việt vào màn hình Mazda Connect. "Có thể thay đổi nhiều thứ tiếng:
              Anh, Việt, Thái, Indo, Malai,...." 2. Bản đồ chính hãng Navigation
              cho Mazda 2 - 3. Việt hóa bản đồ trên Mazda 6 và Cx5. 3. Cài đặt
              xem DVD khi xe di chuyển. Nguyên bản xe hạ thắng tay sẽ không xem
              được DVD. 4. Cài đặt cảm ứng màn hình khi xe di chuyển. Giúp thao
              tác nhanh hơn khi lái xe như: trả lời cuộc gọi, chọn bài hát,
              v.v... 5. Cài đặt xem Video bằng USB. Trong chuyến du lịch vài
              ngày, bạn cảm thấy buồn chán khi phải xem đi, xem lại 1 đĩa DVD
              đó. Giờ bạn sẽ thích thú hơn khi được tải các Video mình yêu thích
              về USB. Ưu điểm: độ nét cao, âm thanh hay hơn DVD. 6. Cài đặt
              Android Auto trên màn hình Mazda Connect: ra lệnh bằng giọng nói
              và chọn điều hướng tìm đường nhanh chóng và tiện lợi với Gogle
              Map,nghe nhạc trực tuyến, nghe gọi, v.v... Xem Yutube nếu điện
              thoại bạn đã Root. 7. Cài đặt hiển thị thêm ngày tháng trên vị trí
              giờ để xem nhanh ngày chẵn lẻ. 8. AIO Tweak: tùy biến icon Mazda
              Connect và các thao tác cài đặt nhanh. Reboot Mazda Connect = 1
              cái click. 9. Cài đặt Hình nền: đưa hình gia đình bạn lên màn hình
              xe rất đẹp. 10. Reload và Update Firmware Mới / Firmware gốc nếu
              khách muốn bảo hành: 56.00.100/240/513 hoặc 59.00.443/502 -
              59.00.540...
            </p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default page;
