# 🇻🇳 Awesome Vietnam Open Data

[![Total APIs](https://img.shields.io/badge/Total_APIs-7-blue?style=for-the-badge)](https://github.com/awesome-vietnam-open-data/awesome-vietnam-open-data)
[![Live APIs](https://img.shields.io/badge/Live_APIs-2-brightgreen?style=for-the-badge)](https://github.com/awesome-vietnam-open-data/awesome-vietnam-open-data)
[![Dead APIs](https://img.shields.io/badge/Dead_APIs-5-red?style=for-the-badge)](https://github.com/awesome-vietnam-open-data/awesome-vietnam-open-data)
[![Auto Update](https://img.shields.io/badge/Auto_Update-Active-purple?style=for-the-badge&logo=github-actions)](https://github.com/awesome-vietnam-open-data/awesome-vietnam-open-data)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

> 🌏 **The largest open data collection for Vietnam** built for developers — Curated free public APIs for the Vietnamese market. Maintained automatically by GitHub Actions, updating API status every night.
>
> 🤝 **Want to contribute?** Open a Pull Request or create an Issue to suggest a new API!

## 📋 Overview

| Metric | Value |
|---|---|
| Total APIs | 7 |
| 🟢 Alive | 2 |
| 🔴 Dead | 5 |
| Last Updated | 10/5/2026, 2:57:19 AM (GMT+7) |

---

## 📂 Table of Contents

- [Hành chính](#h-nh-ch-nh)
- [Tiện ích/Tài chính](#ti-n-ch-t-i-ch-nh)
- [Dummy Data](#dummy-data)

---

### 🏛️ Hành chính

| API Name | Description | Status | Auth | CORS |
|---|---|---|---|---|
| Tỉnh/Thành Phố Việt Nam | API for listing all provinces and cities of Vietnam, incl... | 🔴 Chết | 🔓 Không | Yes |
| Tra Cứu Địa Chỉ VNPost | Postal code lookup API for Vietnamese address information | 🔴 Chết | 🔓 Không | Unknown |
| Thống Kê Dân Số | Population statistics data by province/city from the Gene... | 🔴 Chết | 🔓 Không | No |

#### 💻 Quick Integration Code

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

| API Name | Description | Status | Auth | CORS |
|---|---|---|---|---|
| VietQR Lookup | VietQR lookup API, validates QR code and retrieves recipi... | 🔴 Chết | 🔑 Cần | Yes |
| Giá Vàng SJC | Real-time SJC gold prices from public websites | 🔴 Chết | 🔓 Không | No |
| Thời Tiết Hà Nội | 7-day weather forecast API for Hanoi and other provinces | 🟢 Sống | 🔓 Không | Yes |

#### 💻 Quick Integration Code

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

| API Name | Description | Status | Auth | CORS |
|---|---|---|---|---|
| Fake User Generator | Generate random fake user data for testing and developmen... | 🟢 Sống | 🔓 Không | Yes |

#### 💻 Quick Integration Code

**Fake User Generator**
```javascript
fetch('https://randomuser.me/api/?results=5')
  .then(res => res.json())
  .then(data => console.log(data.results));

```

---

## 🗺️ All APIs

| # | API Name | Category | Method | URL |
|---|---|---|---|---|
| 1 | Tỉnh/Thành Phố Việt Nam | Hành chính | GET | [`https://localapi.epizy.com/api/vn/provinces`](https://localapi.epizy.com/api/vn/provinces) |
| 2 | VietQR Lookup | Tiện ích/Tài chính | POST | [`https://vietqr.io/api/query`](https://vietqr.io/api/query) |
| 3 | Giá Vàng SJC | Tiện ích/Tài chính | GET | [`https://www.sjc.com.vn/market`](https://www.sjc.com.vn/market) |
| 4 | Thời Tiết Hà Nội | Tiện ích/Tài chính | GET | [`https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&daily=weathercode`](https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&daily=weathercode) |
| 5 | Fake User Generator | Dummy Data | GET | [`https://randomuser.me/api/?results=5`](https://randomuser.me/api/?results=5) |
| 6 | Tra Cứu Địa Chỉ VNPost | Hành chính | GET | [`https://api.vnpost.vn/post-code/search?code=10000`](https://api.vnpost.vn/post-code/search?code=10000) |
| 7 | Thống Kê Dân Số | Hành chính | GET | [`https://www.gso.govn.gov.vn/data/population`](https://www.gso.govn.gov.vn/data/population) |

---

## 📝 Notes

- **API Status** is automatically updated every night by GitHub Actions.
- **CORS "Unknown"** means needs additional testing from client-side.
- If an API is marked 🔴 Chết, it may be temporarily down or changed endpoint.
- All contributions welcome via PR at [GitHub](https://github.com/awesome-vietnam-open-data/awesome-vietnam-open-data).

---

<p align="center">
  Made with 💜 by the <a href="https://github.com/awesome-vietnam-open-data">Awesome Vietnam Open Data</a> community
</p>

<p align="center">
  🕐 Last updated: 10/5/2026, 2:57:19 AM
</p>
