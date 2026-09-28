const fs = require("fs");
const axios = require("axios");
const path = require("path");

const APIS_FILE = path.join(__dirname, "..", "data", "apis.json");
const README_EN = path.join(__dirname, "..", "README.md");
const README_VI = path.join(__dirname, "..", "README.vi.md");

const STATUS_ALIVE = "🟢 Sống";
const STATUS_DEAD = "🔴 Chết";
const AUTH_NO = "🔓 Không";
const AUTH_YES = "🔑 Cần";

async function pingApi(api) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await axios({
      method: api.method || "GET",
      url: api.url,
      timeout: 5000,
      validateStatus: () => true,
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (res.status >= 200 && res.status <= 299) {
      return { status: STATUS_ALIVE, httpCode: res.status };
    }
    return { status: STATUS_DEAD, httpCode: res.status };
  } catch (err) {
    return { status: STATUS_DEAD, httpCode: "timeout/error" };
  }
}

function getAuthIcon(auth) {
  return auth ? AUTH_YES : AUTH_NO;
}

function groupByCategory(apisWithStatus) {
  const groups = {};
  for (const item of apisWithStatus) {
    const cat = item.api.category || "Khác";
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(item);
  }
  return groups;
}

function getCategoryEmoji(category) {
  const map = { "Hành chính": "🏛️", "Tiện ích/Tài chính": "💰", "Dummy Data": "🧪" };
  return map[category] || "📦";
}

function slug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/**
 * Translate Vietnamese API description to English for the English README.
 */
function translateDescription(name, desc) {
  const map = {
    "API lấy danh sách tất cả tỉnh và thành phố của Việt Nam, bao gồm mã hành chính": "API for listing all provinces and cities of Vietnam, including administrative codes",
    "API tra cứu thông tin QR Code VietQR, kiểm tra tính hợp lệ và thông tin người nhận": "VietQR lookup API, validates QR code and retrieves recipient information",
    "Cập nhật giá vàng SJC theo thời gian thực từ các trang web công khai": "Real-time SJC gold prices from public websites",
    "API cung cấp dự báo thời tiết 7 ngày cho thành phố Hà Nội và các tỉnh thành khác": "7-day weather forecast API for Hanoi and other provinces",
    "Tạo fake user data ngẫu nhiên cho mục đích test và development, bao gồm tên, email, địa chỉ Việt Nam": "Generate random fake user data for testing and development, including names, emails, Vietnamese addresses",
    "API tra cứu mã bưu điện và thông tin địa chỉ Việt Nam dựa trên mã bưu điện": "Postal code lookup API for Vietnamese address information",
    "Cung cấp dữ liệu thống kê dân số theo tỉnh/thành phố dựa trên dữ liệu từ Tổng cục Thống kê": "Population statistics data by province/city from the General Statistics Office",
  };
  return map[desc] || desc;
}

/**
 * Generate English README.md content.
 */
function generateEnglishMarkdown(apisWithStatus) {
  const total = apisWithStatus.length;
  const alive = apisWithStatus.filter((a) => a.status === STATUS_ALIVE).length;
  const dead = total - alive;
  const groups = groupByCategory(apisWithStatus);
  const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" });

  let md = `# 🇻🇳 Awesome Vietnam Open Data

[![Total APIs](https://img.shields.io/badge/Total_APIs-${total}-blue?style=for-the-badge)](https://github.com/awesome-vietnam-open-data/awesome-vietnam-open-data)
[![Live APIs](https://img.shields.io/badge/Live_APIs-${alive}-brightgreen?style=for-the-badge)](https://github.com/awesome-vietnam-open-data/awesome-vietnam-open-data)
[![Dead APIs](https://img.shields.io/badge/Dead_APIs-${dead}-red?style=for-the-badge)](https://github.com/awesome-vietnam-open-data/awesome-vietnam-open-data)
[![Auto Update](https://img.shields.io/badge/Auto_Update-Active-purple?style=for-the-badge&logo=github-actions)](https://github.com/awesome-vietnam-open-data/awesome-vietnam-open-data)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

> 🌏 **The largest open data collection for Vietnam** built for developers — Curated free public APIs for the Vietnamese market. Maintained automatically by GitHub Actions, updating API status every night.
>
> 🤝 **Want to contribute?** Open a Pull Request or create an Issue to suggest a new API!

## 📋 Overview

| Metric | Value |
|---|---|
| Total APIs | ${total} |
| 🟢 Alive | ${alive} |
| 🔴 Dead | ${dead} |
| Last Updated | ${now} (GMT+7) |

---

## 📂 Table of Contents

`;

  for (const category of Object.keys(groups)) {
    md += `- [${category}](#${slug(category)})\n`;
  }

  md += `\n---\n\n`;

  for (const [category, items] of Object.entries(groups)) {
    md += `### ${getCategoryEmoji(category)} ${category}\n\n`;
    md += `| API Name | Description | Status | Auth | CORS |\n`;
    md += `|---|---|---|---|---|\n`;
    for (const item of items) {
      const descEn = translateDescription(item.api.name, item.api.description);
      const descShort = descEn.length > 60 ? descEn.substring(0, 57) + "..." : descEn;
      md += `| ${item.api.name} | ${descShort} | ${item.status} | ${getAuthIcon(item.api.auth)} | ${item.api.cors} |\n`;
    }
    md += `\n#### 💻 Quick Integration Code\n\n`;
    for (const item of items) {
      md += `**${item.api.name}**\n\`\`\`javascript\n${item.api.codeSnippet || "No snippet available"}\n\`\`\`\n\n`;
    }
    md += `---\n\n`;
  }

  md += `## 🗺️ All APIs\n\n| # | API Name | Category | Method | URL |\n|---|---|---|---|---|\n`;
  for (let i = 0; i < apisWithStatus.length; i++) {
    const item = apisWithStatus[i];
    md += `| ${i + 1} | ${item.api.name} | ${item.api.category} | ${item.api.method} | [\`${item.api.url}\`](${item.api.url}) |\n`;
  }

  md += `\n---\n\n## 📝 Notes

- **API Status** is automatically updated every night by GitHub Actions.
- **CORS "Unknown"** means needs additional testing from client-side.
- If an API is marked 🔴 Chết, it may be temporarily down or changed endpoint.
- All contributions welcome via PR at [GitHub](https://github.com/awesome-vietnam-open-data/awesome-vietnam-open-data).

---

<p align="center">
  Made with 💜 by the <a href="https://github.com/awesome-vietnam-open-data">Awesome Vietnam Open Data</a> community
</p>

<p align="center">
  🕐 Last updated: ${now}
</p>
`;

  return md;
}

/**
 * Generate Vietnamese README.vi.md content.
 */
function generateVietnameseMarkdown(apisWithStatus) {
  const total = apisWithStatus.length;
  const alive = apisWithStatus.filter((a) => a.status === STATUS_ALIVE).length;
  const dead = total - alive;
  const groups = groupByCategory(apisWithStatus);
  const now = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

  let md = `# 🇻🇳 Awesome Vietnam Open Data

[![Total APIs](https://img.shields.io/badge/Total_APIs-${total}-blue?style=for-the-badge)](https://github.com/awesome-vietnam-open-data/awesome-vietnam-open-data)
[![Live APIs](https://img.shields.io/badge/Live_APIs-${alive}-brightgreen?style=for-the-badge)](https://github.com/awesome-vietnam-open-data/awesome-vietnam-open-data)
[![Dead APIs](https://img.shields.io/badge/Dead_APIs-${dead}-red?style=for-the-badge)](https://github.com/awesome-vietnam-open-data/awesome-vietnam-open-data)
[![Auto Update](https://img.shields.io/badge/Auto_Update-Active-purple?style=for-the-badge&logo=github-actions)](https://github.com/awesome-vietnam-open-data/awesome-vietnam-open-data)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

> 🌏 **Kho dữ liệu mở lớn nhất Việt Nam** dành cho lập trình viên — Tổng hợp các Public API miễn phí, hữu ích cho thị trường Việt Nam. Dự án được duy trì tự động bởi GitHub Actions, cập nhật trạng thái API mỗi đêm.
>
> 🤝 **Bạn muốn đóng góp?** Hãy mở một Pull Request hoặc tạo Issue để gợi ý API mới!

## 📋 Tổng quan

| Chỉ số | Giá trị |
|---|---|
| Tổng số API | ${total} |
| Đang sống 🟢 | ${alive} |
| Ngừng hoạt động 🔴 | ${dead} |
| Cập nhật lần cuối | ${now} (GMT+7) |

---

## 📂 Phân loại theo danh mục

`;

  for (const category of Object.keys(groups)) {
    md += `- [${getCategoryEmoji(category)} ${category}](#${slug(category)})\n`;
  }

  md += `\n---\n\n`;

  for (const [category, items] of Object.entries(groups)) {
    md += `### ${getCategoryEmoji(category)} ${category}\n\n`;
    md += `| Tên API | Mô tả | Trạng thái | Auth | CORS |\n`;
    md += `|---|---|---|---|---|\n`;
    for (const item of items) {
      const desc = item.api.description.length > 60 ? item.api.description.substring(0, 57) + "..." : item.api.description;
      md += `| ${item.api.name} | ${desc} | ${item.status} | ${getAuthIcon(item.api.auth)} | ${item.api.cors} |\n`;
    }
    md += `\n#### 💻 Mẫu code tích hợp nhanh\n\n`;
    for (const item of items) {
      md += `**${item.api.name}**\n\`\`\`javascript\n${item.api.codeSnippet || "No snippet available"}\n\`\`\`\n\n`;
    }
    md += `---\n\n`;
  }

  md += `## 🗺️ Danh sách tất cả API\n\n| # | Tên API | Category | Method | URL |\n|---|---|---|---|---|\n`;
  for (let i = 0; i < apisWithStatus.length; i++) {
    const item = apisWithStatus[i];
    md += `| ${i + 1} | ${item.api.name} | ${item.api.category} | ${item.api.method} | [\`${item.api.url}\`](${item.api.url}) |\n`;
  }

  md += `\n---\n\n## 📝 Ghi chú

- **Trạng thái API** được cập nhật tự động mỗi đêm bởi GitHub Actions.
- **CORS "Unknown"** nghĩa là cần kiểm tra thêm từ phía client.
- Nếu API bị đánh dấu 🔴 Chết, có thể API tạm thời ngừng hoạt động hoặc thay đổi endpoint.
- Mọi đóng góp xin gửi PR tại [GitHub](https://github.com/awesome-vietnam-open-data/awesome-vietnam-open-data).

---

<p align="center">
  Made with 💜 bởi cộng đồng <a href="https://github.com/awesome-vietnam-open-data">Awesome Vietnam Open Data</a>
</p>

<p align="center">
  🕐 Last updated: ${now}
</p>
`;

  return md;
}

async function main() {
  console.log("🚀 Starting build-readme.js...");
  console.log(`📂 Reading APIs from: ${APIS_FILE}`);

  const raw = fs.readFileSync(APIS_FILE, "utf-8");
  const apis = JSON.parse(raw);
  console.log(`✅ Loaded ${apis.length} APIs.`);

  console.log("\n🔍 Pinging APIs (timeout: 5s each)...");
  const results = [];

  for (const api of apis) {
    console.log(`  ⏳ Pinging: ${api.name} (${api.url})...`);
    const result = await pingApi(api);
    results.push({ api, ...result });
    console.log(`  ✅ ${api.name}: ${result.status} (${result.httpCode})`);
  }

  const aliveCount = results.filter((r) => r.status === STATUS_ALIVE).length;
  console.log(`\n📊 Results: ${aliveCount}/${results.length} APIs are alive.`);

  console.log("✨ Generating README.md (English) and README.vi.md (Vietnamese)...");

  const mdEN = generateEnglishMarkdown(results);
  fs.writeFileSync(README_EN, mdEN, "utf-8");
  console.log(`✅ README.md written (English).`);

  const mdVI = generateVietnameseMarkdown(results);
  fs.writeFileSync(README_VI, mdVI, "utf-8");
  console.log(`✅ README.vi.md written (Vietnamese).`);

  // Check changes
  const currentEN = fs.existsSync(README_EN) ? fs.readFileSync(README_EN, "utf-8") : "";
  const currentVI = fs.existsSync(README_VI) ? fs.readFileSync(README_VI, "utf-8") : "";
  if (currentEN !== mdEN) console.log("🔄 README.md updated.");
  else console.log("ℹ️  README.md unchanged.");
  if (currentVI !== mdVI) console.log("🔄 README.vi.md updated.");
  else console.log("ℹ️  README.vi.md unchanged.");
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
