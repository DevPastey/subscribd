# CI/CD Pipeline Documentation — Subscribd

This document explains the Continuous Integration & Continuous Delivery (CI/CD) setup for the **Subscribd** React Native application using **GitHub Actions**, **EAS Build**, **EAS Update**, and **Jest**.

---

## 🏗️ Architecture & Branching Strategy

```
Feature Branch (e.g. `feat/new-ui`)
  │
  ├──► Pull Request to `dev` or `main`
  │      └──► Trigger: [CI - Quality Checks]
  │             ├── ESLint (`npm run lint`)
  │             ├── TypeScript Typecheck (`npm run typecheck`)
  │             └── Jest Unit Tests & Coverage (`npm run test:ci`)
  │
Merge to `dev` (Staging Environment)
  │
  └──► Trigger: [Preview - Staging CD]
         ├── Quality Checks
         ├── EAS Update published to `preview` channel (OTA)
         └── (Optional via dispatch) EAS Build for `preview` (APK/Internal iOS)
  │
Merge / Tag on `main` (Production Environment)
  │
  └──► Trigger: [Production - Release CD]
         ├── Quality Checks
         ├── EAS Update published to `production` channel (OTA)
         └── EAS Build for `production` profile (Play Store AAB / App Store)
```

---

## 🔑 Required GitHub Secrets

To allow GitHub Actions to communicate with EAS, configure this secret in your repository:

1. Navigate to: **GitHub Repository → Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Add:

| Secret Name | Description | How to Obtain |
|---|---|---|
| `EXPO_TOKEN` | Personal Access Token for Expo account | Generate at [expo.dev/settings/access-tokens](https://expo.dev/settings/access-tokens) |

---

## 📱 EAS Build Configuration (`eas.json`)

The project is configured with 3 build profiles:

| Profile | Channel | Platform Target | Distribution | Use Case |
|---|---|---|---|---|
| `development` | `development` | iOS Simulator + Android APK | Internal | Local dev with `expo-dev-client` |
| `preview` | `preview` | Android APK + iOS AdHoc | Internal | QA / Staging testing on real devices |
| `production` | `production` | Android AAB (Google Play) + iOS App Store | Store | Public store releases & TestFlight |

---

## 🚀 Workflows Overview

### 1. `ci.yml` — Continuous Integration
- **Triggers**: On every `push` and `pull_request` to `main` and `dev`.
- **Jobs**:
  - `lint-and-typecheck`: Validates lint rules and TypeScript types.
  - `unit-tests`: Runs Jest test suite with coverage, uploading the coverage report as an artifact.

### 2. `preview.yml` — Staging / Preview Delivery
- **Triggers**: Automatically on `push` to `dev`, or manually via GitHub Actions UI (`workflow_dispatch`).
- **Jobs**:
  - Validates quality checks.
  - Deploys instant OTA update to the `preview` channel.
  - Can optionally trigger an EAS Build for preview binaries (Android APK).

### 3. `production.yml` — Production Release
- **Triggers**: On `push` to `main`, version tags (`v*.*.*`), or manual dispatch.
- **Jobs**:
  - Validates quality checks.
  - Deploys OTA update to the `production` channel.
  - Triggers production EAS Build for App Store / Google Play distribution.

### 4. `eas-update.yml` — Manual OTA Update
- **Triggers**: Manual dispatch via GitHub Actions tab.
- **Inputs**:
  - `channel`: `preview`, `production`, or `development`
  - `message`: Changelog / reason for the update

---

## 🧪 Local Verification Commands

Before opening a PR, run these commands locally:

```bash
# Run linter
npm run lint

# Run TypeScript type check
npm run typecheck

# Run unit tests
npm test

# Run tests with coverage
npm run test:ci
```

---

## 📋 Initial Setup Checklist for Maintainers

1. [ ] Install EAS CLI: `npm install -g eas-cli`
2. [ ] Login to Expo: `eas login`
3. [ ] Initialize EAS Project: `eas project:init` (updates `projectId` in `app.json`)
4. [ ] Create `EXPO_TOKEN` at [expo.dev/settings/access-tokens](https://expo.dev/settings/access-tokens)
5. [ ] Add `EXPO_TOKEN` to GitHub Repository Secrets
6. [ ] Set up iOS / Android credentials via `eas credentials`
