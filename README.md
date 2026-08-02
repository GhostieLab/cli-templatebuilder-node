# TemplateBuilder

**TemplateBuilder** is a CLI tool that helps you create projects from your own reusable templates.

Instead of copying folders and files between projects, TemplateBuilder lets you define project structures once and generate new projects quickly and consistently.

---

## Getting Started

TemplateBuilder is not yet available on npm.

Until the first npm release, run it directly from the repository:

```bash
git clone https://github.com/...
cd templatebuilder
npm install

node cli/index.js ...
```

An npm package will be published once the command-line interface is considered stable.

---

## Usage

```bash
node cli/index.js --type <type> --name <name>
```

Example:

```bash
node cli/index.js --type node --name myapp
```

This will create a `myapp/` directory using the template defined for the `node` type.

---

## Configuration (Upcoming)

> **Note:** Configuration file support is already available. Custom template directories will be supported in a future release.

```bash
node cli/index.js --init
```

This command creates (if necessary) and opens the configuration file located at:

- **Linux/macOS:** `~/.templatebuilder/config.json`
- **Windows:** `C:\Users\<username>\.templatebuilder\config.json`

The configuration file allows you to define custom template paths.

Example:

```json
{
  "Templates": "G:/MyTemplates",
  "NodeTemplate": "D:/CustomTemplates/node"
}
```

- If `"NodeTemplate"` is defined, it overrides the default `Templates/node` directory.
- If a key is set to `""`, that template is disabled.

---

## Template Structure

Each template type (for example `templates/node/`) must contain:

- `structure`: a plain text file describing the project structure (one entry per line).

  ```
  bin/index.js
  lib/
  config/config.json
  .gitignore
  package.json
  ```

- `files/`: a directory containing all the files that will be copied into the generated project. Files do not need to match the folder hierarchy; TemplateBuilder places them automatically according to the `structure` file.

---

## Example

```
templates/
├── node/
│   ├── structure
│   └── files/
│       ├── index.js
│       ├── .gitignore
│       ├── config.json
│       ├── README.md
│       └── package.json
├── python/
│   ├── structure
│   └── files/
```

---

## Requirements

- Node.js 18 or later

---

## Project Status

**Version:** `v0.1.0`

The project is under active development.

It is published for anyone interested in using or exploring it, but the command-line interface may still evolve before the first stable release.

---

## Purpose

TemplateBuilder was originally created to automate my own project creation workflow.

It is being developed primarily to support my daily development environment, while remaining available for anyone who finds it useful.
