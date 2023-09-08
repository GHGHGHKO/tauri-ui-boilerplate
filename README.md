# dalgona UI
![Animation-v3](https://github.com/GHGHGHKO/dalgona/assets/26823834/fa93cd0c-de46-4bfc-818b-ab98cd4b95df)

## Getting Started

1. You must have a Tenor API key! [Click here](https://developers.google.com/tenor/guides/quickstart#setup) to get one.
2. Install! https://github.com/GHGHGHKO/dalgona/tags
3. Insert keywords, key, and the desired number of GIFs!

### Set environments
TENOR : `TENOR_API_KEY`  
GIPHY : `GIPHY_API_KEY`

**PowerShell**
```shell
[Environment]::SetEnvironmentVariable(TENOR_API_KEY, "Insert your Tenor Key", "User")
```

**macOS**
```shell
launchctl setenv TENOR_API_KEY "Insert your Tenor Key"
```

### How to build

```shell
gh repo clone GHGHGHKO/dalgona
cd dalgona
pnpm i
```

```shell
pnpm tauri dev
pnpm tauri build
```


## Wiki
https://github.com/GHGHGHKO/dalgona/wiki

## To-Do

- [x] TENOR API
- [x] GIPHY API
- [x] Updater  

## Folder Structure

```js
.
├── next-env.d.ts
├── next.config.js    //nextjs config file https://nextjs.org/docs/api-reference/next.config.js/introduction
├── package.json
├── postcss.config.js
├── README.md
├── public
├── src               //frontend src:
│   ├── app           //next.js appdir https://beta.nextjs.org/docs/routing/fundamentals
│   ├── assets
│   ├── components    //from shadcn/ui
│   │   └── ui
│   ├── data
│   ├── hooks
│   ├── lib
│   └── styles
├── src-tauri         //backend src:
│   ├── build.rs
│   ├── Cargo.lock
│   ├── Cargo.toml    //https://doc.rust-lang.org/cargo/reference/manifest.html
│   ├── icons         //https://tauri.app/v1/guides/features/icons/
│   ├── src           //rust codes
│   └── tauri.conf.json  //tauri config file https://next--tauri.netlify.app/next/api/config
├── prettier.config.js     //prettier config file https://prettier.io/docs/en/configuration.html
├── tailwind.config.js     //tailwind config file https://tailwindcss.com/docs/configuration
└── tsconfig.json          //typescript config file https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
```

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) or [Jetbrains IntelliJ](https://www.jetbrains.com/idea/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
