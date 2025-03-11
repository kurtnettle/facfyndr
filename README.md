<h1 align="center">🔍 Facfyndr</h1>
<p align="center"><b>Part of <a href="https://harukaze.pages.dev/">Project Harukaze</a>🍃</b></p>

<br>

[![BUBT](https://img.shields.io/badge/BUBT-University-002E5D?style=for-the-badge&logo=shield&logoColor=FFD700&color=FFD700&labelColor=002E5D)](https://www.bubt.edu.bd/)
[![Support Chat](https://img.shields.io/badge/Telegram-Join_Chat-2CA5E0?logo=telegram&logoColor=white&style=for-the-badge)](https://t.me/harukaze_bubt)

[![Deployed with Cloudflare Pages](https://img.shields.io/badge/Deployed%20with-Cloudflare%20Pages-%23F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://facfyndr.pages.dev/)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-%23FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://kit.svelte.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2306B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![shadcn](https://img.shields.io/badge/shadcn-%23000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://next.shadcn-svelte.com)
[![Lucide-Svelte](https://img.shields.io/badge/Lucide%20Svelte-%23F56565?style=for-the-badge&logo=lucide&logoColor=white)](https://lucide.dev)
[![Supabase](https://img.shields.io/badge/Supabase-%233ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.io)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-%23007ACC?style=for-the-badge&logo=drizzle&logoColor=white)](https://orm.drizzle.team)
[![Zod](https://img.shields.io/badge/Zod-%233D3D3D?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPLv3-%23B20000?style=for-the-badge&logo=gnu&logoColor=white)](https://opensource.org/licenses/GPL-3.0)

## Overview

A community-driven faculty directory developed to help students easily find and connect with faculty members at [BUBT](http://bubt.edu.bd)

## 🌟 Features

- **Effortless Search:**  
  Find faculty members in seconds by searching for their name, faculty code, or email.

- **QR Code Magic:**  
  Generate QR codes for faculty profiles – perfect for networking events or quick sharing.

- **vCard Downloads:**  
  Save faculty contact details directly to your phone with a single click.

- **Report Incorrect Info:**  
  Help us keep the directory accurate by reporting incorrect information with just a few clicks.  

- **Minimalist Design:**  
  Clean, modern, and distraction-free. Built to work seamlessly on devices.

- **Admin Dashboard (Coming Soon):**  
  A powerful dashboard to manage user reports, faculty data, update information, and ensure the directory stays up-to-date.


## **🧩 Project Structure**
The repository is organized into two main folders, each representing a core part of the project:  

- #### App (SvelteKit)
  The `app` folder contains the fully functional SvelteKit application, including the UI and server-side logics.

- #### Admin (Database Management)  
  The `admin` folder is used to prepare and manage the database. Faculty member data is initially fetched using [BUBT Faculty Scrapper](https://github.com/kurtnettle/bubt-faculty-scraper) and processed here. It also includes plans for an admin dashboard to manage the database.

## 🛠️ Installation

Before you begin, ensure you have the followings:

- [pnpm](https://pnpm.io/installation) (v10.6.2 or later)
- [Node.js](https://pnpm.io/cli/env#add) (v22.14.0 LTS or later)
- [Supabase Account](https://supabase.com/dashboard/sign-up) - For the database
- [Cloudflare Account](https://dash.cloudflare.com/sign-up) - For the turnstile (captcha)

<br>

The repository is divided into two main sections: **`app`** (frontend) and **`admin`** (data processing).

### **1. Setting Up the App (Frontend)**  

1. Clone the repository:  
   ```bash
   git clone https://github.com/kurtnettle/facfyndr.git
   ```
2. Navigate to the `app` folder:
    
   ```bash
   cd facfyndr/app
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Set up environment variables:
   
   Rename the a `.env.example` to `.env` file in the `app` folder and add the following values:
   ```txt
   DATABASE_URL=""
   TURNSTILE_SECRET_KEY=""
   PUBLIC_TURNSTILE_SITE_KEY=""
   ```
5. Run the development server:
   ```bash
   pnpm run dev
   ```

### **2. Setting Up the Admin (Data Processing)**

> [!NOTE]  
> Under Development.


## 🛠️ Tech Stack  

### **Frontend**  

- **[SvelteKit](https://kit.svelte.dev)**: A modern framework for building fast, reactive web apps with built-in server-side rendering (SSR) and API routes.  
- **[Tailwind CSS](https://tailwindcss.com)**: A utility-first CSS framework for rapid UI development.  
- **[Superforms](https://superforms.rocks)**: A powerful SvelteKit form library for seamless form handling and validation.  
- **[Lucide Svelte](https://lucide.dev/guide/packages/lucide-svelte)**: A beautiful, community-driven open-source icon library.  
- **[Shadcn Svelte](https://next.shadcn-svelte.com)**: Elegantly designed UI components for building modern interfaces.  
- **[Svelte Turnstile](https://github.com/ghostdevv/svelte-turnstile)**: Easy integration with Cloudflare Turnstile for bot detection.  

### **Backend & Data Management**  

- **[Supabase](https://supabase.io)**: An open-source Firebase alternative for database and authentication.  
- **[Drizzle ORM](https://orm.drizzle.team/)**: A TypeScript ORM for managing database interactions.
- **[Zod](https://zod.dev/)**: TypeScript-first schema validation for forms and APIs.  
- **[BUBT Faculty Scraper](https://github.com/kurtnettle/bubt-faculty-scraper)**: A custom tool for fetching faculty data from university website.

### **Utility Libraries**

- **[@svelte-put/qr](https://github.com/vnphanquang/svelte-put)**: For generating QR codes with ease.  
- **[vcard-creator](https://github.com/joaocarmo/vcard-creator)**: A JavaScript vCard creator library.

## 💬 Support 

Need help or want to discuss issues? Join our [Telegram group](https://t.me/harukaze_bubt)

## 🤝 Contributing

Contributions are welcome! If you'd like to improve the tool or fix bugs, feel free to submit a pull request. Please ensure your changes align with the project's coding standards.

## 📜 License

This project is licensed under the GPLv3 License. See the [LICENSE](./LICENSE) file for full details.

By contributing to this project, you agree that your contributions will be licensed under the GPLv3 License as well.

## 💌 Acknowledgments

This project wouldn’t have been possible without the incredible work of the **open-source community**.