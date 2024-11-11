import { defineConfig, devices } from '@playwright/test';

module.exports = defineConfig(
    {
        // Đường dẫn tới thư mục chứa các bài kiểm thử
        testDir: 'tests',

        // Thời gian chờ tối đa cho mỗi bài kiểm thử (mặc định là 30s)
        timeout: 30000, // 30 giây

        // Cấu hình các lần thử lại nếu kiểm thử thất bại
        retries: 1, // Số lần thử lại nếu một bài kiểm thử thất bại

        // Cấu hình trình duyệt
        use: {
            // Dùng Chrome thay vì Chromium
            channel: 'chrome',  // Đảm bảo Playwright sử dụng trình duyệt Chrome

            // Chế độ không giao diện, có thể bật lên để chạy kiểm thử nhanh hơn
            headless: false,  // Set false nếu bạn muốn nhìn thấy trình duyệt khi kiểm thử

            // Tạo màn hình với kích thước cố định cho mỗi bài kiểm thử
            viewport: { width: 1280, height: 720 },  // Đặt độ phân giải mặc định cho trình duyệt

            // Định cấu hình để không có lỗi khi vào trang web không có cookie
            ignoreHTTPSErrors: true,  // Bỏ qua các lỗi SSL nếu bạn làm việc với các trang không có chứng chỉ SSL hợp lệ
        },

        // Sử dụng thời gian chờ mặc định cho mỗi bài kiểm thử là 5 giây
        expect: {
            timeout: 5000,  // Mặc định là 5 giây cho các hành động như expect(page).toHaveText()
        },

        // Cấu hình báo cáo kết quả kiểm thử
        reporter: 'list', // Các kiểu báo cáo khác: 'dot', 'line', 'json', 'html'

        // Nếu muốn chạy kiểm thử với các option bổ sung khác, ví dụ như môi trường
        projects: [
            {
                name: 'chrome',
                use: {
                    browserName: 'chromium',
                    channel: 'chrome',  // Sử dụng Chrome
                },
            },
        ],

    }
)