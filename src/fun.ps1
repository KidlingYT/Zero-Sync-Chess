param (
    [string]$SourceDir = ".",
    [string]$MutatorsFile = "mutators2.ts",
    [string]$QueriesFile = "queries2.ts"
)

$mutateRegex = [regex]'mutate\.([a-zA-Z0-9_]+)\.insert'
$queryRegex  = [regex]'query\.([a-zA-Z0-9_]+)'

$mutators = @{}
$queries = @{}

Get-ChildItem -Path $SourceDir -Recurse -File | ForEach-Object {
    $content = Get-Content $_.FullName -Raw

    foreach ($m in $mutateRegex.Matches($content)) {
        $mutators[$m.Groups[1].Value] = $true
    }

    foreach ($q in $queryRegex.Matches($content)) {
        $queries[$q.Groups[1].Value] = $true
    }
}

# ------------------------
# Generate mutators file
# ------------------------
$mutatorOut = @()

$mutatorOut += 'import { defineMutator, defineMutators } from "@rocicorp/zero";'
$mutatorOut += 'import z from "zod";'
$mutatorOut += ''
$mutatorOut += 'export const mutators = defineMutators({'


foreach ($name in ($mutators.Keys | Sort-Object)) {
    $mutatorOut += @"
  ${name}: {
    create: defineMutator(z.object({}), async ({ tx, args }) => {
      await tx.mutate.${name}.insert(args);
    }),
    update: defineMutator(z.object({}), async ({ tx, args }) => {
      await tx.mutate.${name}.update(args);
    }),
    delete: defineMutator(z.object({}), async ({ tx, args }) => {
      await tx.mutate.${name}.delete(args);
    }),
  },
"@
}

$mutatorOut += "});"

$mutatorOut | Set-Content -Path $MutatorsFile -Encoding UTF8

# ------------------------
# Generate queries file
# ------------------------
$queryOut = @()

$queryOut += 'import { defineQueries, defineQuery } from "@rocicorp/zero";'
$queryOut += 'import { zql } from "schema";'
$queryOut += 'import { z } from "zod";'
$queryOut += ''
$queryOut += 'export const queries = defineQueries({'

foreach ($name in ($queries.Keys | Sort-Object)) {
    $queryOut += @"
  ${name}: {
    all: defineQuery(() =>
      zql.${name}.orderBy("id", "desc")
    ),
    one: defineQuery(
      z.object({ id: z.string() }),
      ({ args: { id } }) =>
        zql.${name}.where("id", id).one()
    ),
  },
"@
}

$queryOut += "});"

$queryOut | Set-Content -Path $QueriesFile -Encoding UTF8

Write-Host "Generated:"
Write-Host " - $MutatorsFile ($($mutators.Count) tables)"
Write-Host " - $QueriesFile ($($queries.Count) tables)"