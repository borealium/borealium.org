import { parse as tomlParse } from "std/toml/mod.ts"
import { L10nPath } from "~types/l10n.ts"
import { LangTag } from "~types/language.ts"
import { fluentBundle, message } from "~plugins/fluent.ts"

export function getL10NLanguages(resourceLang: string): string[] {
  const tomlContent = Deno.readTextFileSync(`${Deno.cwd()}/resources/${resourceLang}-l10n.toml`)
  const toml = tomlParse(tomlContent) as Record<string, L10nPath[]>
  return [
    ...toml.paths[0].locales,
    "en",
  ]
}

export function makeResourceTranslations(
  key: string,
  resourceLang: string,
  languages: LangTag[],
): Record<LangTag, string> {
  return languages.reduce((acc, language) => {
    const bundle = fluentBundle(`${resourceLang}-resources`, language)
    acc[language] = message(bundle, null, `~${resourceLang}-resources`, key)

    return acc
  }, {} as Record<LangTag, string>)
}
