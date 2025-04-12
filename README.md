# GuYue-Admin -- A High-Quality Admin Dashboard

### Introduction 📖

GuYue-Admin is an open-source admin management framework based on Vue3.0, TypeScript, Vite3.2, Pinia, Ant Design Vue, and Unocss, developed using the latest technology stack. It provides simple components based on antd vue ProTable (please forgive any imperfections in the implementation), which can improve your development efficiency to some extent. Additionally, this project also encapsulates some commonly used components (right-click menu, etc.), Hooks, directives, dynamic routing, button-level permission control, and other features.

### Online Preview 👀

- Link: Not available yet

### Code Repository ⭐

- Gitee: https://gitee.com/Y_lao/GuYue-Admin
- GitHub: https://github.com/Y-Lao/GuYue-Admin.git

### Project Documentation 📚

- Project update log: Not available yet
- Project documentation: Not available yet

### Project Features 🔨

- Developed with Vue3.0 + TypeScript, single file components **＜ script setup ＞**
- Uses Vite3.2 as the project development and packaging tool (configured with Gzip packaging, TSX syntax, cross-domain proxy...)
- Uses Pinia instead of Vuex - lightweight, simple, easy to use, with Pinia persistence plugin integration
- Complete second encapsulation of Axios using TypeScript (request interception, cancellation, common request encapsulation...)
- Simple ProTable component based on Ant Design Vue secondary encapsulation (please forgive any imperfections) -- many features not yet implemented
- Supports Ant Design Vue component size switching, i18n internationalization, color theme switching, dark mode not yet supported
- Uses VueRouter for route permission interception, page button permission configuration, route lazy loading
- Uses KeepAlive to cache pages, supports multi-level nested page caching
- Common custom directive development (permissions, copying, watermark, drag and drop, throttling, debouncing, long press...)
- Uses Prettier to unify code formatting, integrated with ESLint and Stylelint code verification standards
- Uses husky, lint-staged, commitlint, czg, cz-git to standardize commit information
- Uses Unocss, a high-performance and extremely flexible instant atomic CSS engine

### Installation and Usage Steps 📔

- **Clone:**

```text
# Gitee
git clone https://gitee.com/Y_lao/GuYue-Admin
# GitHub
git clone https://github.com/Y-Lao/GuYue-Admin.git
```

- **Install:**

```text
yarn
```

- **Run:**

```text
yarn dev
yarn serve
```

- **Build:**

```text
# Development environment
yarn build:dev

# Testing environment
yarn build:test

# Production environment
yarn build:pro
```

- **Start dist after build:**

```build
# Install service
npm i -g serve
# Navigate to directory
cd dist
# Start
serve
```

- **Lint:**

```text
# eslint code checking
yarn lint:eslint

# prettier code formatting
yarn lint:prettier

# stylelint style formatting
yarn lint:stylelint
```

- **Commit:**

```text
# Commit code (lint:lint-staged command will be automatically executed before submission)
yarn commit
```

### Project Screenshots 📷

- Login page:

![login_light](https://i.imgtg.com/2023/06/20/OT8kGx.png)

- Workbench:

![home_light](https://i.imgtg.com/2023/06/20/OT8xIj.png)

- Monitoring console:

![monitoring_light](https://i.imgtg.com/2023/06/20/OUWAli.png)

- Table page:

![table_light](https://i.imgtg.com/2023/06/20/OUWrJL.png)

- Form:

![form_light](https://i.imgtg.com/2023/06/20/OUsB51.png)

- Theme:

![theme](https://i.imgtg.com/2023/06/20/OUsTAI.png)

- Data dashboard:

![dataScreen](https://i.imgtg.com/2023/06/20/OT8Fhp.png)

### Directory Structure 📚

```text
GuYue-Admin
├─ .husky                 # husky configuration files
├─ .vscode                # VSCode recommended configuration
├─ build                  # Vite configuration items
├─ public                 # Static resource files (this folder will not be packaged)
├─ src
│  ├─ api                 # API interface management
│  ├─ assets              # Static resource files
│  ├─ components          # Global components
│  ├─ config              # Global configuration items
│  ├─ directives          # Global directive files
│  ├─ enums               # Project common enumerations
│  ├─ hooks               # Common Hooks encapsulation
│  ├─ languages           # Language internationalization i18n
│  ├─ layouts             # Framework layout module
│  ├─ routers             # Route management
│  ├─ stores              # pinia store
│  ├─ styles              # Global style files
│  ├─ typings             # Global ts declarations
│  ├─ utils               # Common utility libraries
│  ├─ views               # All project pages
│  ├─ App.vue             # Main project component
│  ├─ main.ts             # Project entry file
│  └─ vite-env.d.ts       # Specify ts recognition for vue
├─ .editorconfig          # Standardize coding styles across different editors
├─ .env                   # vite common configuration
├─ .env.development       # Development environment configuration
├─ .env.production        # Production environment configuration
├─ .env.test              # Test environment configuration
├─ .eslintignore          # Ignore Eslint validation
├─ .eslintrc.js           # Eslint validation configuration file
├─ .gitignore             # Ignore git submission
├─ .prettierignore        # Ignore Prettier formatting
├─ .prettierrc.js         # Prettier formatting configuration
├─ .stylelintignore       # Ignore stylelint formatting
├─ .stylelintrc.js        # stylelint style formatting configuration
├─ commitlint.config.js   # git submission specification configuration
├─ index.html             # Entry html
├─ lint-staged.config.js  # lint-staged configuration file
├─ package-lock.json      # Dependency package version lock
├─ package.json           # Dependency package management
├─ README.md              # README introduction
├─ tsconfig.json          # typescript global configuration
├─ uno.config.ts          # unocss global configuration
└─ vite.config.ts         # vite global configuration file
```

### Browser Support 🌎

- Local development recommends using the latest version of Chrome browser [Download](https://www.google.com/intl/zh-CN/chrome/).
- Production environment supports modern browsers, no longer supports IE browser, more browsers can be found at [Can I Use Es Module](https://caniuse.com/?search=ESModule).

| ![IE](https://i.imgtg.com/2023/04/11/8z7ot.png) | ![Edge](https://i.imgtg.com/2023/04/11/8zr3p.png) | ![Firefox](https://i.imgtg.com/2023/04/11/8zKiU.png) | ![Chrome](https://i.imgtg.com/2023/04/11/8zNrx.png) | ![Safari](https://i.imgtg.com/2023/04/11/8zeGj.png) |
| :---------------------------------------------: | :-----------------------------------------------: | :--------------------------------------------------: | :-------------------------------------------------: | :-------------------------------------------------: |
|                   not support                   |                  last 2 versions                  |                   last 2 versions                    |                   last 2 versions                   |                   last 2 versions                   |

### Project Backend API 🧩

The project's backend API completely uses Mock data, thanks to the following Mock platforms for support:

- FastMock: https://www.fastmock.site
- EasyMock: https://mock.mengxuegu.com

### Technical Exchange Group

With guidance from teachers with 10+ years of experience, our code community is dedicated to sharing, helping, learning, and more. Join us, and a salary of 20k+ is no problem.

|                                     Personal WeChat                                      |                                       WeChat Group                                       |
| :--------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: |
| <img src="https://img1.imgtp.com/2023/09/01/YynuEdSw.png" alt="Alipay QRcode" width=170> | <img src="https://img1.imgtp.com/2023/09/01/cJxuuMu4.png" alt="Wechat QRcode" width=170> |

### Support the Project 🧩

|                                       WeChat                                        |                                       Alipay                                        |
| :---------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------: |
| <img src="https://i.imgtg.com/2023/06/20/OUse0a.jpg" alt="Alipay QRcode" width=170> | <img src="https://i.imgtg.com/2023/06/20/OUsNKK.png" alt="Wechat QRcode" width=170> |

### License

This project is based on the [MIT](./LICENSE) license, provided only for reference and learning by front-end beginners. Use caution for commercial purposes. The author does not provide warranties or take responsibility for the software.
