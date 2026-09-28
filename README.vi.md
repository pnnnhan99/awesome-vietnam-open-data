# 🇻🇳 Awesome Vietnam Open Data

[![Total APIs](https://img.shields.io/badge/Total_APIs-7-blue?style=for-the-badge)](https://github.com/awesome-vietnam-open-data/awesome-vietnam-open-data)
[![Live APIs](https://img.shields.io/badge/Live_APIs-2-brightgreen?style=for-the-badge)](https://github.com/awesome-vietnam-open-data/awesome-vietnam-open-data)
[![Dead APIs](https://img.shields.io/badge/Dead_APIs-5-red?style=for-the-badge)](https://github.com/awesome-vietnam-open-data/awesome-vietnam-open-data)
[![Auto Update](https://img.shields.io/badge/Auto_Update-Active-purple?style=for-the-badge&logo=github-actions)](https://github.com/awesome-vietnam-open-data/awesome-vietnam-open-data)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

> 🌏 **Kho dữ liệu mở lớn nhất Việt Nam** dành cho lập trình viên — Tổng hợp các Public API miễn phí, hữu ích cho thị trường Việt Nam. Dự án được duy trì tự động bởi GitHub Actions, cập nhật trạng thái API mỗi đêm.
>
> 🤝 **Bạn muốn đóng góp?** Hãy mở một Pull Request hoặc tạo Issue để gợi ý API mới!

## 📋 Tổng quan

| Chỉ số | Giá trị |
|---|---|
| Tổng số API | 7 |
| Đang sống 🟢 | 2 |
| Ngừng hoạt động 🔴 | 5 |
| Cập nhật lần cuối | 13:08:30 28/9/2026 (GMT+7) |

---

## 📂 Phân loại theo danh mục

- [🏛️ Hành chính](#h-nh-ch-nh)
- [💰 Tiện ích/Tài chính](#ti-n-ch-t-i-ch-nh)
- [🧪 Dummy Data](#dummy-data)

---

### 🏛️ Hành chính

| Tên API | Mô tả | Trạng thái | Auth | CORS |
|---|---|---|---|---|
| Tỉnh/Thành Phố Việt Nam | API lấy danh sách tất cả tỉnh và thành phố của Việt Nam, ... | 🔴 Chết | 🔓 Không | Yes |
| Tra Cứu Địa Chỉ VNPost | API tra cứu mã bưu điện và thông tin địa chỉ Việt Nam dựa... | 🔴 Chết | 🔓 Không | Unknown |
| Thống Kê Dân Số | Cung cấp dữ liệu thống kê dân số theo tỉnh/thành phố dựa ... | 🔴 Chết | 🔓 Không | No |

#### 💻 Mẫu code tích hợp nhanh

**Tỉnh/Thành Phố Việt Nam**
```javascript
fetch('https://localapi.epizy.com/api/vn/provinces')
  .then(res => res.json())
  .then(data => console.log(data));

```

**Tra Cứu Địa Chỉ VNPost**
```javascript
fetch('https://api.vnpost.vn/post-code/search?code=10000')
  .then(res => res.json())
  .then(data => console.log(data));
```

**Thống Kê Dân Số**
```javascript
fetch('https://www.gso.govn.gov.vn/data/population')
  .then(res => res.text())
  .then(html => console.log('Dữ liệu dân số:', html.substring(0, 500)));
```

---

### 💰 Tiện ích/Tài chính

| Tên API | Mô tả | Trạng thái | Auth | CORS |
|---|---|---|---|---|
| VietQR Lookup | API tra cứu thông tin QR Code VietQR, kiểm tra tính hợp l... | 🔴 Chết | 🔑 Cần | Yes |
| Giá Vàng SJC | Cập nhật giá vàng SJC theo thời gian thực từ các trang we... | 🔴 Chết | 🔓 Không | No |
| Thời Tiết Hà Nội | API cung cấp dự báo thời tiết 7 ngày cho thành phố Hà Nội... | 🟢 Sống | 🔓 Không | Yes |

#### 💻 Mẫu code tích hợp nhanh

**VietQR Lookup**
```javascript
fetch('https://vietqr.io/api/query', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer YOUR_API_KEY' },
  body: JSON.stringify({ qrData: '090123456789' })
}).then(res => res.json()).then(data => console.log(data));
```

**Giá Vàng SJC**
```javascript
fetch('https://www.sjc.com.vn/market')
  .then(res => res.text())
  .then(html => { const parser = new DOMParser(); const doc = parser.parseFromString(html, 'text/html'); console.log(doc.querySelector('.price').innerText); });
```

**Thời Tiết Hà Nội**
```javascript
fetch('https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&daily=weathercode')
  .then(res => res.json())
  .then(data => console.log(data.daily));

```

---

### 🧪 Dummy Data

| Tên API | Mô tả | Trạng thái | Auth | CORS |
|---|---|---|---|---|
| Fake User Generator | Tạo fake user data ngẫu nhiên cho mục đích test và develo... | 🟢 Sống | 🔓 Không | Yes |

#### 💻 Mẫu code tích hợp nhanh

**Fake User Generator**
```javascript
fetch('https://randomuser.me/api/?results=5')
  .then(res => res.json())
  .then(data => console.log(data.results));

```

---

## 🗺️ Danh sách tất cả API

| # | Tên API | Category | Method | URL |
|---|---|---|---|---|
| 1 | Tỉnh/Thành Phố Việt Nam | Hành chính | GET | [`https://localapi.epizy.com/api/vn/provinces`](https://localapi.epizy.com/api/vn/provinces) |
| 2 | VietQR Lookup | Tiện ích/Tài chính | POST | [`https://vietqr.io/api/query`](https://vietqr.io/api/query) |
| 3 | Giá Vàng SJC | Tiện ích/Tài chính | GET | [`https://www.sjc.com.vn/market`](https://www.sjc.com.vn/market) |
| 4 | Thời Tiết Hà Nội | Tiện ích/Tài chính | GET | [`https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&daily=weathercode`](https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&daily=weathercode) |
| 5 | Fake User Generator | Dummy Data | GET | [`https://randomuser.me/api/?results=5`](https://randomuser.me/api/?results=5) |
| 6 | Tra Cứu Địa Chỉ VNPost | Hành chính | GET | [`https://api.vnpost.vn/post-code/search?code=10000`](https://api.vnpost.vn/post-code/search?code=10000) |
| 7 | Thống Kê Dân Số | Hành chính | GET | [`https://www.gso.govn.gov.vn/data/population`](https://www.gso.govn.gov.vn/data/population) |

---

## 📝 Ghi chú

- **Trạng thái API** được cập nhật tự động mỗi đêm bởi GitHub Actions.
- **CORS "Unknown"** nghĩa là cần kiểm tra thêm từ phía client.
- Nếu API bị đánh dấu 🔴 Chết, có thể API tạm thời ngừng hoạt động hoặc thay đổi endpoint.
- Mọi đóng góp xin gửi PR tại [GitHub](https://github.com/awesome-vietnam-open-data/awesome-vietnam-open-data).

---

<p align="center">
  Made with 💜 bởi cộng đồng <a href="https://github.com/awesome-vietnam-open-data">Awesome Vietnam Open Data</a>
</p>

<p align="center">
  🕐 Last updated: 13:08:30 28/9/2026
</p>
