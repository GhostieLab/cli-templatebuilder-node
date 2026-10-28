export function showHelp() {
  console.log(`TemplateBuilder creates projects from reusable templates.

Usage:
  templatebuilder --type <type> --name <name>
  templatebuilder --init
  templatebuilder [options]

Options:
  --type <type>       Template type to use
  --name <name>       Name of the project to create
  --init              Open the TemplateBuilder configuration file
  -h, --help          Display this help message
  -v, --version       Display the installed version

Example:
  templatebuilder --type nodecli --name myapp`)
}
