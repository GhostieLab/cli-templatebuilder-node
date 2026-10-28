# TemplateBuilder

**TemplateBuilder** is a command-line tool for generating projects from reusable templates.

Instead of manually copying files and directories between projects, TemplateBuilder lets you define a project structure once and reuse it to create new projects consistently.

## Getting Started

TemplateBuilder is not yet published on npm.

Until the first npm release, you can run it directly from the repository.

### Requirements

- Node.js 18 or later
- npm
- Git (for cloning the repository)
- Vim (only required when using `--init`)

### Installation

```bash
git clone https://github.com/GhostieLab/cli-templatebuilder-node.git
cd cli-templatebuilder-node
npm install
```

### Usage

```bash
node cli/index.js --type <type> --name <name>
```

For example:

```bash
node cli/index.js --type nodecli --name myapp
```

This creates a `myapp/` directory in the current working directory using the `nodecli` template.

### Available Commands

| Command | Description |
|---|---|
| `--type <type>` | Select the template type. |
| `--name <name>` | Specify the new project directory name. |
| `--init` | Create the configuration file if necessary and open it in Vim. |
| `-h`, `--help` | Display CLI help. |
| `-v`, `--version` | Display the installed version. |

Both `--type` and `--name` are required when generating a project.

## Available Templates

TemplateBuilder includes three templates:

| Type | Description |
|---|---|
| `nodecli` | Basic Node.js command-line application. |
| `bash` | Basic Bash script project. |
| `python` | Basic Python application. |

**Note:** The bundled templates are minimal examples intended to demonstrate TemplateBuilder's functionality and allow users to try the tool immediately after installation.

They are not intended to be complete, production-ready project templates. Depending on your project's requirements, you may need to extend them or create your own custom templates.

Examples:

```bash
node cli/index.js --type nodecli --name my-cli
node cli/index.js --type bash --name my-script
node cli/index.js --type python --name my-python-app
```

Custom template types are also supported through the configuration system.

## Configuration

TemplateBuilder uses a JSON configuration file located at:

- **Linux/macOS:** `~/.templatebuilder/config.json`
- **Windows:** `C:\Users\<username>\.templatebuilder\config.json`

The file is created automatically when TemplateBuilder needs to load its configuration and the file does not already exist.

To create or open it manually:

```bash
node cli/index.js --init
```

The `--init` command opens the configuration file using Vim. Vim must be installed and available in your system's `PATH`.

### Configuration Example

```json
{
  "author": "your-name",
  "license": "MIT",
  "Templates": "",
  "NodecliTemplate": "",
  "PythonTemplate": "",
  "BashTemplate": ""
}
```

The `author` and `license` properties provide default values for generated projects.

The `Templates` property specifies a global directory containing template directories organized by type.

Template-specific properties, such as `NodecliTemplate`, specify the directory for a particular template type.

Paths may be absolute. Empty template path values are ignored when selecting a template source.

For custom template types, the configuration key is constructed by capitalizing the first character of the type and appending `Template`. For example, the type `webapp` uses `WebappTemplate`.

### Template Resolution Order

TemplateBuilder resolves templates in the following order:

1. **Template-specific path:** the configured `<Type>Template` directory, if defined.
2. **Global templates path:** `<Templates>/<type>`, if `Templates` is defined.
3. **Bundled templates:** the matching template in the repository's `templates/` directory.

If a configured path is selected but does not exist, TemplateBuilder reports an error instead of falling back to another source.

## Creating Custom Templates

A template consists of a directory containing a `structure` file and a `files/` directory.

For example:

```text
templates/
└── nodecli/
    ├── structure
    └── files/
        ├── index.js
        ├── .gitignore
        ├── README.md
        └── package.json
```

### The `structure` File

The `structure` file describes the files and directories to generate, using one entry per line.

Example:

```text
# Project structure
bin/index.js
lib/
.gitignore
README.md
package.json
```

Rules:

- Each non-empty line describes a file or directory.
- Lines beginning with `#` are treated as comments.
- Directory entries must end with `/`.
- File entries are interpreted as paths relative to the generated project directory.
- TemplateBuilder creates parent directories automatically when writing files.

### The `files/` Directory

The `files/` directory contains the source content for generated files.

TemplateBuilder locates each source file by its filename, regardless of its destination path in `structure`.

For example:

```text
structure entry: bin/index.js
source file:     files/index.js
generated file:  myapp/bin/index.js
```

If a source file is missing, TemplateBuilder displays a warning and creates an empty file at the specified destination.

### Template Variables

TemplateBuilder replaces the following placeholders in generated file contents:

| Variable | Value |
|---|---|
| `${name}` | Project name provided through `--name`. |
| `${author}` | Author defined in the configuration, or `unknown`. |
| `${license}` | License defined in the configuration, or `MIT`. |
| `${version}` | Initial generated project version, currently `0.1.0`. |

For example, the bundled Bash template contains the following source file:

`templates/bash/files/main.sh`

```bash
#!/usr/bin/env bash

echo "${name} started."
```

When generating a project with:

```bash
node cli/index.js --type bash --name my-script
```

TemplateBuilder creates `my-script/bin/main.sh` with the following content:

```bash
#!/usr/bin/env bash

echo "my-script started."
```

This illustrates how template variables are replaced during project generation.

## Template Behavior

- **Missing source files:** If a file listed in `structure` has no corresponding source in `files/`, TemplateBuilder creates an empty file and displays a warning. This allows declaring empty files without creating empty source files.
- **Existing project directories:** TemplateBuilder does not overwrite existing project directories.
- **Configuration editor:** The `--init` command opens the configuration file using Vim. Vim must be installed and available in the system's `PATH`.

## Known Limitations

- **Filename-based source lookup:** Source files are matched by filename only. Different destination paths sharing the same filename cannot use different source contents.
- **Text-based templates:** Source files are processed as UTF-8 text. Binary file copying is not supported.
- **Partial generation:** If an error occurs during generation, previously created files and directories are not automatically removed. Automatic rollback is not currently supported.

## Project Status

**Current version:** `0.1.0`

TemplateBuilder is under active development and has not yet been published on npm.

The command-line interface and project configuration may evolve in future releases.

## License

TemplateBuilder is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Purpose

TemplateBuilder was originally created to automate project creation in my own development workflow.

It is developed primarily to support reusable development environments, while remaining open source and available to anyone who finds it useful.
