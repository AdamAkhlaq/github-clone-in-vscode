# Clone Anywhere for GitHub 🚀

> Adds a "Clone in …" button to GitHub repositories that opens any repo in VS Code, Cursor, Windsurf, VSCodium, or VS Code Insiders — or downloads it as a .zip. One click, no terminal.

<div align="center">

![VS Code Clone Button](.github/images/vscode-option.png)

</div>

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/effhdkonnknoebahhnnciakckbbfmcpi?style=flat-square&logo=googlechrome&logoColor=white&label=Chrome%20Web%20Store)](https://chromewebstore.google.com/detail/github-clone-in-vs-code/effhdkonnknoebahhnnciakckbbfmcpi)
[![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/effhdkonnknoebahhnnciakckbbfmcpi?style=flat-square&color=blue&label=Users)](https://chromewebstore.google.com/detail/github-clone-in-vs-code/effhdkonnknoebahhnnciakckbbfmcpi)
[![Chrome Web Store Rating](https://img.shields.io/chrome-web-store/rating/effhdkonnknoebahhnnciakckbbfmcpi?style=flat-square&color=orange&label=Rating)](https://chromewebstore.google.com/detail/github-clone-in-vs-code/effhdkonnknoebahhnnciakckbbfmcpi)
[![GitHub stars](https://img.shields.io/github/stars/AdamAkhlaq/github-clone-in-vscode?style=flat-square&logo=github)](https://github.com/AdamAkhlaq/github-clone-in-vscode/stargazers)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-green?style=flat-square)](https://developer.chrome.com/docs/extensions/mv3/)
[![MIT License](https://img.shields.io/github/license/AdamAkhlaq/github-clone-in-vscode?style=flat-square)](LICENSE)

---

## 🚀 **Get Started Now**

<div align="center">

### **Install from Chrome Web Store**

[![Add to Chrome](https://img.shields.io/badge/Add%20to%20Chrome-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](https://chromewebstore.google.com/detail/github-clone-in-vs-code/effhdkonnknoebahhnnciakckbbfmcpi)

_Available for Chrome, Edge, Brave, Opera, and all Chromium-based browsers_

</div>

---

## 🎯 What it does

This Chrome extension seamlessly integrates with GitHub's interface by adding a **"Clone in …"** button directly to repository pages. With one click, it opens the repository in your chosen editor — VS Code, Cursor, Windsurf, VSCodium, or VS Code Insiders — using its `vscode://`-style deep link, eliminating the need to manually copy URLs and run git commands. Prefer the files without an editor? Pick the **`.zip`** destination to download a source archive instead.

### ✨ Key Features

- 🎯 **One-click cloning** - Instantly clone and open repositories in your editor
- 🧩 **Choose your editor** - VS Code, VS Code Insiders, VSCodium, Cursor, or Windsurf, set from the toolbar popup
- 📁 **Or download a .zip** - Pick the `.zip` destination to grab a source archive of the current branch — no editor needed
- 🔗 **Native GitHub integration** - Blends perfectly with GitHub's existing UI
- ⚡ **Lightweight & Fast** - Minimal permissions, maximum performance
- 🚫 **No popup clutter** - Clean button injection without intrusive UI
- 🔄 **SPA support** - Works seamlessly with GitHub's single-page navigation
- 🎨 **Native styling** - Matches GitHub's design language perfectly
- 🛡️ **Privacy-focused** - Only accesses GitHub pages, no data collection

---

## 🚀 How it works

1. **Visit any GitHub repository** (e.g., [github.com/AdamAkhlaq/github-clone-in-vscode](https://github.com/AdamAkhlaq/github-clone-in-vscode))
2. **Click the green "Code" button** on the repository page

   ![Code Dropdown](.github/images/dropdown.png)

3. **See "Clone in …" as the first option** in the dropdown menu (named for your chosen editor)
4. **Click it** and your editor opens with the clone dialog ready!
5. **Start coding immediately** - No manual URL copying or terminal commands needed

The extension generates a deep link your editor recognizes and handles automatically — for example `vscode://vscode.git/clone?url=https://github.com/owner/repo.git`, or `cursor://…` / `windsurf://…` depending on the editor you picked.

### Choosing your destination

Click the extension's toolbar icon to open the popup and pick where repos go — VS Code, VS Code Insiders, VSCodium, Cursor, or Windsurf. Your choice is remembered, and the button on GitHub updates to match. All of these are VS Code-family editors, so they share the same `…/vscode.git/clone` deep link and only differ by URL scheme.

Prefer the source files without an editor? Pick the **`.zip`** destination and the button becomes **"Download .zip"**, fetching GitHub's archive of the branch you're viewing (`…/archive/refs/heads/<branch>.zip`, falling back to `…/archive/HEAD.zip` for the default branch).

---

## 💻 Installation

### Chrome Web Store (Recommended)

1. Visit the [Chrome Web Store page](https://chromewebstore.google.com/detail/github-clone-in-vs-code/effhdkonnknoebahhnnciakckbbfmcpi)
2. Click "Add to Chrome"
3. Navigate to any GitHub repository and start cloning!

### Manual Installation (For Developers)

1. Download the latest release from [GitHub Releases](https://github.com/AdamAkhlaq/github-clone-in-vscode/releases)
2. Extract the ZIP file
3. Open Chrome and navigate to `chrome://extensions/`
4. Enable "Developer mode" in the top right
5. Click "Load unpacked" and select the extracted folder

---

## 🛠️ Technical Details

- **Framework**: TypeScript with Chrome Manifest V3
- **Architecture**: Lightweight content script injection
- **Permissions**: Minimal - `*://github.com/*` host permission and `storage` (to remember your chosen editor)
- **Compatibility**: All Chromium-based browsers (Chrome, Edge, Brave, etc.)
- **Editor Support**: VS Code, VS Code Insiders, VSCodium, Cursor, and Windsurf — pick yours from the toolbar popup, or choose `.zip` to download a source archive instead

### Browser Compatibility

This extension works seamlessly across all Chromium-based browsers, providing the same consistent experience regardless of your browser choice. Firefox support is planned for a future release.

---

## 🔧 Development

### Prerequisites

- Node.js 16+ and npm
- TypeScript knowledge
- Chrome browser for testing

### Setup

```bash
# Clone the repository
git clone https://github.com/AdamAkhlaq/github-clone-in-vscode.git
cd github-clone-in-vscode

# Install dependencies
npm install

# Build the extension
npm run build

# For development with auto-reload
npm run dev
```

### Project Structure

```text
├── src/
│   └── content.ts          # Main content script
├── icons/                  # Extension icons
├── manifest.json           # Extension manifest
├── package.json           # Node.js dependencies
└── tsconfig.json          # TypeScript configuration
```

### Building

```bash
# Build for production
npm run build

# Build and package for distribution
npm run package
```

---

## 🤝 Contributing

Contributions are welcomed! Here's how you can help:

1. **⭐ Star the repository** to show your support
2. **🐛 Report bugs** by [opening an issue](https://github.com/AdamAkhlaq/github-clone-in-vscode/issues)
3. **💡 Suggest features** via [GitHub discussions](https://github.com/AdamAkhlaq/github-clone-in-vscode/discussions)
4. **🔧 Submit pull requests** for fixes and improvements

---

## 🐛 Troubleshooting

### Common Issues

#### VS Code doesn't open when clicking the button

- Ensure VS Code is installed and associated with `vscode://` URLs
- Try reinstalling VS Code or running `code --version` in terminal

#### Button doesn't appear on GitHub

- Refresh the page or disable/re-enable the extension
- Check that the extension has permission for `github.com`

#### Extension not working after GitHub updates

- GitHub UI changes may affect the extension - please report issues

### Getting Help

- Check [existing issues](https://github.com/AdamAkhlaq/github-clone-in-vscode/issues)
- Create a new issue with detailed information
- Include browser version, OS, and steps to reproduce

---

## 📊 Privacy & Permissions

This extension:

- ✅ Only accesses GitHub.com pages
- ✅ Does not collect or transmit any personal data
- ✅ Does not track user behavior
- ✅ Uses minimal permissions required for functionality
- ✅ Is fully open source for transparency

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ❤️ Support the Project

If you find this extension useful:

- ⭐ **Star this repository** to help others discover it
- 📝 **Leave a review** on the Chrome Web Store
- 🐛 **Report issues** to help improve the extension
- 📢 **Share it** with other developers who might find it useful
- ☕ **Buy me a coffee** if you'd like to support development

[![GitHub Sponsors](https://img.shields.io/badge/GitHub-Sponsor-ea4aaa?style=flat-square&logo=github&logoColor=white)](https://github.com/sponsors/AdamAkhlaq)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-Donate-ff5e5b?style=flat-square&logo=kofi&logoColor=white)](https://ko-fi.com/adamakhlaq)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy_Me_A_Coffee-Donate-FFDD00?style=flat-square&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/adamakhlaq)

---
