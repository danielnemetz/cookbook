import { Recipe } from "./types";

import belgischeWaffeln from "../../data/recipes/belgische-waffeln.json";
import chinakohlsalatAsia from "../../data/recipes/chinakohlsalat-asia.json";
import couscousSalatWuerzig from "../../data/recipes/couscous-salat-wuerzig.json";
import eierpfannkuchen from "../../data/recipes/eierpfannkuchen.json";
import fenchelKartoffelGefluegelbrei from "../../data/recipes/fenchel-kartoffel-gefluegelbrei.json";
import gefuelltePaprika from "../../data/recipes/gefuellte-paprika.json";
import kasimirsGeburtstagskuchen from "../../data/recipes/kasimirs-geburtstagskuchen.json";
import koenigsbergerKlopseEinfach from "../../data/recipes/koenigsberger-klopse-einfach.json";
import koenigsbergerKlopseKapernsauce from "../../data/recipes/koenigsberger-klopse-kapernsauce.json";
import lachsfiletZucchiniDillSenfSauce from "../../data/recipes/lachsfilet-zucchini-dill-senf-sauce.json";
import philadelphiaOrangenErdbeerTorte from "../../data/recipes/philadelphia-orangen-erdbeer-torte.json";
import philadelphiaTorteBeeren from "../../data/recipes/philadelphia-torte-beeren.json";
import pizzateig from "../../data/recipes/pizzateig.json";
import polnischesBigos from "../../data/recipes/polnisches-bigos.json";
import schwedentorte from "../../data/recipes/schwedentorte.json";
import spaghettiBolognese from "../../data/recipes/spaghetti-bolognese.json";
import spinatlasagne from "../../data/recipes/spinatlasagne.json";
import texanischesChili from "../../data/recipes/texanisches-chili.json";
import vegetarischerGruenkohl from "../../data/recipes/vegetarischer-gruenkohl.json";
import zebraHimbeerKaesekuchen from "../../data/recipes/zebra-himbeer-kaesekuchen.json";
import zucchiniAuflauf from "../../data/recipes/zucchini-auflauf.json";
import zuericherGeschnetzeltes from "../../data/recipes/zuericher-geschnetzeltes.json";

const allRecipes: Recipe[] = [
  belgischeWaffeln,
  chinakohlsalatAsia,
  couscousSalatWuerzig,
  eierpfannkuchen,
  fenchelKartoffelGefluegelbrei,
  gefuelltePaprika,
  kasimirsGeburtstagskuchen,
  koenigsbergerKlopseEinfach,
  koenigsbergerKlopseKapernsauce,
  lachsfiletZucchiniDillSenfSauce,
  philadelphiaOrangenErdbeerTorte,
  philadelphiaTorteBeeren,
  pizzateig,
  polnischesBigos,
  schwedentorte,
  spaghettiBolognese,
  spinatlasagne,
  texanischesChili,
  vegetarischerGruenkohl,
  zebraHimbeerKaesekuchen,
  zucchiniAuflauf,
  zuericherGeschnetzeltes,
] as Recipe[];

export function getAllRecipes(): Recipe[] {
  return allRecipes.sort((a, b) => a.title.localeCompare(b.title, "de"));
}

export function getRecipeById(id: string): Recipe | undefined {
  return allRecipes.find((r) => r.id === id);
}

export function getAllCategories(): string[] {
  const cats = new Set(allRecipes.map((r) => r.category));
  return Array.from(cats).sort((a, b) => a.localeCompare(b, "de"));
}

export function getAllTags(): string[] {
  const tags = new Set(allRecipes.flatMap((r) => r.tags));
  return Array.from(tags).sort((a, b) => a.localeCompare(b, "de"));
}
