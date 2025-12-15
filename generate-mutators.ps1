param (
    [string]$SourceDir = ".",
    [string]$OutputFile = "generatedMutators.ts"
)

# Regex to match mutate.<name>.insert
$regex = [regex]'mutate\.([a-zA-Z0-9_]+)\.[insert|update]'

$found = @{}

Get-ChildItem -Path $SourceDir -Recurse -File | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $matches = $regex.Matches($content)

    foreach ($match in $matches) {
        $name = $match.Groups[1].Value
        $found[$name] = $true
    }
}

$output = @()
$output += "export const mutators = {"

foreach ($name in ($found.Keys | Sort-Object)) {
    $output += @"
  ${name}: {
    create: defineMutator({}, async ({ tx, ctx, args: {} }) => {
      await tx.mutate.${name}.insert({});
    }),
    update: defineMutator({}, async ({ tx, ctx, args: {} }) => {
      await tx.mutate.${name}.update({});
    }),
    delete: defineMutator({}, async ({ tx, ctx, args: {} }) => {
      await tx.mutate.${name}.delete({});
    }),
  },
"@
}

$output += "};"

$output | Set-Content -Path $OutputFile -Encoding UTF8

Write-Host "Generated $OutputFile with $($found.Count) mutator definitions."
