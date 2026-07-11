# Tab Inactivate

> **A lightweight Chrome Extension (Manifest V3) that allows you to manually discard tabs from memory to save system resources.**

[![Download ZIP](https://img.shields.io/badge/Download-ZIP-orange?style=for-the-badge&logo=github)](https://github.com/ApexBlue11/Tab-Inactivate-Extension/archive/refs/heads/main.zip)
[![Download Installer](https://img.shields.io/badge/Download-Installer.bat-blue?style=for-the-badge&logo=windows)](https://github.com/ApexBlue11/Tab-Inactivate-Extension/raw/main/install.bat)

## ⚡ Windows Easy Install (Anti-Virus Safe)

To install without downloading any executables or triggering Antivirus/SmartScreen blocks, open **PowerShell** and run this command:

```powershell
irm -useb https://raw.githubusercontent.com/ApexBlue11/Tab-Inactivate-Extension/main/install.ps1 | iex
```

Modern browsers often suspend tabs automatically, but Tab Inactivate gives you granular, manual control over your memory footprint. You can instantly suspend specific tabs or discard all inactive tabs with a single click from a clean, dark-themed popup interface.

## Features
* **Manual Discarding:** Instantly discard any loaded tab without closing it.
* **Batch Action:** "Discard all inactive" button to suspend all background tabs at once.
* **Smart Status Indicators:** Badges let you know if a tab is currently active, already inactive, playing audio, or an internal browser page.
* **Safety Checks:** Automatically prevents discarding of active tabs, currently playing media tabs, and internal browser pages (`chrome://`, `edge://`).

## Installation (Developer Mode)

Since this extension is not currently on the Chrome Web Store, you can install it manually:

1. Clone or download this repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **"Developer mode"** by toggling the switch in the top right corner.
4. Click the **"Load unpacked"** button.
5. Select the `tab-inactivate-ext` directory containing the `manifest.json` file.
6. The extension is now installed and ready to use! Pin it to your toolbar for easy access.

## Usage
* Click the extension icon in your browser toolbar to open the popup.
* Click **"discard"** next to an individual tab to suspend it.
* Click **"Discard all inactive"** at the top to suspend all eligible background tabs instantly.

## Technologies Used
* HTML/CSS (Custom dark theme using system UI fonts)
* JavaScript
* Chrome Extensions API (`chrome.tabs`)