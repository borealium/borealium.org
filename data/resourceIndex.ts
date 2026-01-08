import type { Resource, ResourceRelease } from "~types/resource.ts"
import { ResourceType } from "~types/resource.ts"
import {
  getCachedPahkatRepo,
  type PahkatPackage,
  type PahkatRelease,
} from "./pahkat.ts"
import languagesData from "./languages.ts"

// Import all resource files
// This is generated from the files in data/resources/
import fao_browser_asr from "./resources/fao-browser-asr.ts"
import fao_dictus_asr from "./resources/fao-dictus-asr.ts"
import fao_fid from "./resources/fao-fid.ts"
import fao_foen_ms_mt from "./resources/fao-foen-ms-mt.ts"
import fao_foenmt from "./resources/fao-foenmt.ts"
import fao_korp from "./resources/fao-korp.ts"
import fao_malradid from "./resources/fao-malradid.ts"
import fao_online_speller from "./resources/fao-online-speller.ts"
import fao_sprotin from "./resources/fao-sprotin.ts"
import fao_stavseting from "./resources/fao-stavseting.ts"
import fao_voisit_asr from "./resources/fao-voisit-asr.ts"
import fit_dictionary from "./resources/fit-dictionary.ts"
import fit_korp from "./resources/fit-korp.ts"
import fit_nds from "./resources/fit-nds.ts"
import fit_online_speller from "./resources/fit-online-speller.ts"
import fkv_korp from "./resources/fkv-korp.ts"
import fkv_mjoukko from "./resources/fkv-mjoukko.ts"
import fkv_nds from "./resources/fkv-nds.ts"
import fkv_oahpa from "./resources/fkv-oahpa.ts"
import fkv_online_speller from "./resources/fkv-online-speller.ts"
import isl_arnastofnun_hyph from "./resources/isl-arnastofnun-hyph.ts"
import isl_bin from "./resources/isl-bin.ts"
import isl_korp from "./resources/isl-korp.ts"
import isl_lexia from "./resources/isl-lexia.ts"
import isl_malid from "./resources/isl-malid.ts"
import isl_malstadur from "./resources/isl-malstadur.ts"
import isl_misdict from "./resources/isl-misdict.ts"
import isl_mismt from "./resources/isl-mismt.ts"
import isl_nutima_ob from "./resources/isl-nutima-ob.ts"
import isl_puki from "./resources/isl-puki.ts"
import isl_tiro from "./resources/isl-tiro.ts"
import isl_velthyding from "./resources/isl-velthyding.ts"
import kal_dictionaries from "./resources/kal-dictionaries.ts"
import kal_learngrl from "./resources/kal-learngrl.ts"
import kal_martha_tts from "./resources/kal-martha-tts.ts"
import kal_mt from "./resources/kal-mt.ts"
import kal_online_speller from "./resources/kal-online-speller.ts"
import krl_dictionary from "./resources/krl-dictionary.ts"
import mul_divvun_keyboard from "./resources/mul-divvun-keyboard.ts"
import mul_divvun_manager from "./resources/mul-divvun-manager.ts"
import mul_divvunspell_libreoffice from "./resources/mul-divvunspell-libreoffice.ts"
import mul_gramdivvun from "./resources/mul-gramdivvun.ts"
import mul_islex from "./resources/mul-islex.ts"
import mul_newamigos from "./resources/mul-newamigos.ts"
import mul_satni from "./resources/mul-satni.ts"
import mul_skuolfi from "./resources/mul-skuolfi.ts"
import mul_smi_mt from "./resources/mul-smi-mt.ts"
import mul_webdict from "./resources/mul-webdict.ts"
import sjd_nds from "./resources/sjd-nds.ts"
import sje_nds from "./resources/sje-nds.ts"
import sje_online_speller from "./resources/sje-online-speller.ts"
import sje_sjelex from "./resources/sje-sjelex.ts"
import sma_gielese from "./resources/sma-gielese.ts"
import sma_korp from "./resources/sma-korp.ts"
import sma_nds from "./resources/sma-nds.ts"
import sma_oahpa from "./resources/sma-oahpa.ts"
import sma_online_speller from "./resources/sma-online-speller.ts"
import sme_jounivest from "./resources/sme-jounivest.ts"
import sme_juridisk from "./resources/sme-juridisk.ts"
import sme_korp from "./resources/sme-korp.ts"
import sme_mt from "./resources/sme-mt.ts"
import sme_nds_fin from "./resources/sme-nds-fin.ts"
import sme_nds_nob from "./resources/sme-nds-nob.ts"
import sme_nds_smn from "./resources/sme-nds-smn.ts"
import sme_nds_spa from "./resources/sme-nds-spa.ts"
import sme_oahpa from "./resources/sme-oahpa.ts"
import sme_online_speller from "./resources/sme-online-speller.ts"
import smj_kintelnob from "./resources/smj-kintelnob.ts"
import smj_kintelsmj from "./resources/smj-kintelsmj.ts"
import smj_korp from "./resources/smj-korp.ts"
import smj_online_speller from "./resources/smj-online-speller.ts"
import smn_korp from "./resources/smn-korp.ts"
import smn_nds from "./resources/smn-nds.ts"
import smn_oahpa from "./resources/smn-oahpa.ts"
import smn_online_speller from "./resources/smn-online-speller.ts"
import sms_korp from "./resources/sms-korp.ts"
import sms_nds from "./resources/sms-nds.ts"
import sms_oahpa from "./resources/sms-oahpa.ts"
import sms_online_speller from "./resources/sms-online-speller.ts"
import yid_dictionary from "./resources/yid-dictionary.ts"

// Collect all resources into a map by ID
const resourcesMap = new Map<string, Resource>()

const allResources: Resource[] = [
  fao_browser_asr,
  fao_dictus_asr,
  fao_fid,
  fao_foen_ms_mt,
  fao_foenmt,
  fao_korp,
  fao_malradid,
  fao_online_speller,
  fao_sprotin,
  fao_stavseting,
  fao_voisit_asr,
  fit_dictionary,
  fit_korp,
  fit_nds,
  fit_online_speller,
  fkv_korp,
  fkv_mjoukko,
  fkv_nds,
  fkv_oahpa,
  fkv_online_speller,
  isl_arnastofnun_hyph,
  isl_bin,
  isl_korp,
  isl_lexia,
  isl_malid,
  isl_malstadur,
  isl_misdict,
  isl_mismt,
  isl_nutima_ob,
  isl_puki,
  isl_tiro,
  isl_velthyding,
  kal_dictionaries,
  kal_learngrl,
  kal_martha_tts,
  kal_mt,
  kal_online_speller,
  krl_dictionary,
  mul_divvun_keyboard,
  mul_divvun_manager,
  mul_divvunspell_libreoffice,
  mul_gramdivvun,
  mul_islex,
  mul_newamigos,
  mul_satni,
  mul_skuolfi,
  mul_smi_mt,
  mul_webdict,
  sjd_nds,
  sje_nds,
  sje_online_speller,
  sje_sjelex,
  sma_gielese,
  sma_korp,
  sma_nds,
  sma_oahpa,
  sma_online_speller,
  sme_jounivest,
  sme_juridisk,
  sme_korp,
  sme_mt,
  sme_nds_fin,
  sme_nds_nob,
  sme_nds_smn,
  sme_nds_spa,
  sme_oahpa,
  sme_online_speller,
  smj_kintelnob,
  smj_kintelsmj,
  smj_korp,
  smj_online_speller,
  smn_korp,
  smn_nds,
  smn_oahpa,
  smn_online_speller,
  sms_korp,
  sms_nds,
  sms_oahpa,
  sms_online_speller,
  yid_dictionary,
]

// Populate the map
for (const resource of allResources) {
  resourcesMap.set(resource.id, resource)
}

/**
 * Get a resource by ID (checks both static and Pahkat resources)
 */
export function getResourceById(id: string): Resource | undefined {
  // Check static resources first
  const staticResource = resourcesMap.get(id)
  if (staticResource) { return staticResource }

  // Check Pahkat resources
  return getPahkatResources().find((r) => r.id === id)
}

/**
 * Get resources by category (includes Pahkat resources)
 */
export function getResourcesByCategory(category: string): Resource[] {
  return getAllResources().filter((r) => r.category === category)
}

/**
 * Get resources by language (includes Pahkat resources)
 */
export function getResourcesByLanguage(language: string): Resource[] {
  return getAllResources().filter((r) => r.languages.includes(language))
}

/**
 * Get all resource IDs
 */
export function getAllResourceIds(): string[] {
  return getAllResources().map((r) => r.id)
}

// --- Pahkat Integration ---

const languageKeys = Object.keys(languagesData.languages)
  .filter((x) => !languagesData.uiOnly.includes(x))

function findStableRelease(
  releases: PahkatRelease[],
): PahkatRelease | undefined {
  // Get all unique platform/arch combinations from all releases
  const targets = new Set(
    releases.flatMap((rel) =>
      rel.target.map((t) => (t.arch ? `${t.platform}/${t.arch}` : t.platform))
    ),
  )

  // Find the stable release (channel === null)
  const stable = releases.find((rel) => rel.channel === null)
  if (!stable) { return undefined }

  // Merge all targets into the stable release
  stable.target = Array.from(targets).map((x) => {
    const [platform, arch] = x.split("/")
    return { platform, arch: arch ?? null }
  })

  return stable
}

function toResourceRelease(rel?: PahkatRelease): ResourceRelease | undefined {
  if (!rel) { return undefined }

  return {
    version: rel.version,
    platforms: rel.target.map((
      t,
    ) => (t.arch ? `${t.platform}/${t.arch}` : t.platform)),
    authors: rel.authors,
    license: rel.license,
    licenseUrl: rel.licenseUrl ? new URL(rel.licenseUrl) : undefined,
  }
}

function pahkatPackageToResource(pkg: PahkatPackage): Resource | null {
  const stable = findStableRelease(pkg.release)
  if (!stable) { return null }

  const languages = pkg.tags
    .filter((t) => t.startsWith("lang:") && t !== "lang:zxx")
    .map((t) => t.replace("lang:", ""))

  const category =
    pkg.tags.find((t) => t.startsWith("cat:"))?.replace("cat:", "") ?? ""

  // Filter out packages that don't have any supported languages
  // (unless they have no language tags, meaning they're multi-language)
  if (
    languages.length > 0 && !languages.some((l) => languageKeys.includes(l))
  ) {
    return null
  }

  return {
    id: pkg.id,
    type: ResourceType.Pahkat,
    languages,
    category,
    name: pkg.name,
    description: pkg.description,
    release: toResourceRelease(stable),
  }
}

// Cached Pahkat resources
let pahkatResources: Resource[] | null = null

function getPahkatResources(): Resource[] {
  // Return cached if available
  if (pahkatResources !== null) {
    return pahkatResources
  }

  const repo = getCachedPahkatRepo()
  if (!repo) {
    return []
  }

  pahkatResources = repo.packages
    .filter((pkg) => pkg.release.length > 0)
    .map(pahkatPackageToResource)
    .filter((r): r is Resource => r !== null)

  console.log(
    `Converted ${pahkatResources.length} Pahkat packages to resources`,
  )
  return pahkatResources
}

/**
 * Clear the Pahkat resources cache (called when Pahkat data is refreshed)
 */
export function clearPahkatResourcesCache(): void {
  pahkatResources = null
}

/**
 * Get all resources including Pahkat packages
 */
export function getAllResources(): Resource[] {
  return [...allResources, ...getPahkatResources()]
}
