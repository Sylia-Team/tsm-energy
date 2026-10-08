import type { LegalPageContent, LegalSlug } from "@/types/legal";

/**
 * MAQUETTE — pages légales à faire valider par TSM (et idéalement relire par
 * un conseil). Les mentions `[INFORMATION À CONFIRMER]` doivent toutes être
 * remplacées avant mise en production.
 */
export const legalPages: Record<LegalSlug, LegalPageContent> = {
  "mentions-legales": {
    title: "Mentions légales",
    seoDescription:
      "Mentions légales du site de TSM Énergies Services : éditeur, hébergeur, propriété intellectuelle.",
    updatedAt: "[INFORMATION À CONFIRMER]",
    body: `## Éditeur du site

TSM Énergies Services — [INFORMATION À CONFIRMER : forme juridique] au capital de [INFORMATION À CONFIRMER] €.

Siège social : Parc d’activité de la Baou, 95 rue de l’Innovation, 83110 Sanary-sur-Mer.

Téléphone : 04 94 32 36 15. E-mail : [INFORMATION À CONFIRMER].

RCS [INFORMATION À CONFIRMER : ville] — SIRET [INFORMATION À CONFIRMER]. TVA intracommunautaire : [INFORMATION À CONFIRMER].

Directeur de la publication : [INFORMATION À CONFIRMER].

## Hébergeur

[INFORMATION À CONFIRMER : nom de l’hébergeur], [INFORMATION À CONFIRMER : adresse], [INFORMATION À CONFIRMER : téléphone].

## Assurance professionnelle

Assurance décennale souscrite auprès de [INFORMATION À CONFIRMER : assureur], couvrant [INFORMATION À CONFIRMER : zone géographique et activités].

## Médiation de la consommation

En cas de litige, le client consommateur peut recourir gratuitement au médiateur de la consommation : [INFORMATION À CONFIRMER : nom et coordonnées du médiateur].

## Propriété intellectuelle

L’ensemble des contenus de ce site (textes, photos, logo) est la propriété de TSM Énergies Services ou de ses partenaires. Toute reproduction sans autorisation est interdite.

Certaines photos sont des illustrations issues de banques d’images et ne représentent pas des chantiers réalisés par l’entreprise.

## Données personnelles

Le traitement des données transmises via le formulaire de devis est décrit dans la politique de confidentialité.`,
  },
  "politique-confidentialite": {
    title: "Politique de confidentialité",
    seoDescription:
      "Comment TSM Énergies Services collecte et utilise les données transmises via le formulaire de devis.",
    updatedAt: "[INFORMATION À CONFIRMER]",
    body: `## Responsable du traitement

TSM Énergies Services, Parc d’activité de la Baou, 95 rue de l’Innovation, 83110 Sanary-sur-Mer. Contact pour toute question sur vos données : [INFORMATION À CONFIRMER : e-mail].

## Données collectées

Via le formulaire de demande de devis : nom, téléphone, e-mail, commune et code postal, type et description du projet, photos éventuelles.

Aucune donnée n’est collectée à votre insu. Le site n’utilise pas d’outil de mesure d’audience à ce jour.

## Finalité

Ces données servent uniquement à répondre à votre demande : vous recontacter, organiser une visite et établir un devis. Elles ne sont ni vendues ni cédées.

## Base légale

Le traitement repose sur votre consentement, donné en cochant la case prévue avant l’envoi du formulaire, et sur les mesures précontractuelles prises à votre demande.

## Destinataires

Les demandes sont accessibles à l’équipe de TSM Énergies Services. Elles sont transmises à [INFORMATION À CONFIRMER : outil de gestion des demandes / CRM].

## Durée de conservation

[INFORMATION À CONFIRMER : durée] à compter du dernier contact, sauf si un contrat est conclu (conservation alors liée aux obligations légales).

## Vos droits

Vous pouvez accéder à vos données, les rectifier, les effacer, limiter leur traitement ou vous y opposer, en écrivant à [INFORMATION À CONFIRMER : e-mail]. Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).`,
  },
  cookies: {
    title: "Cookies",
    seoDescription:
      "Les cookies utilisés sur le site de TSM Énergies Services.",
    updatedAt: "[INFORMATION À CONFIRMER]",
    body: `## Cookies utilisés

Le site ne dépose aucun cookie publicitaire ni de mesure d’audience.

Seul un cookie technique est utilisé pour l’espace d’administration réservé à l’entreprise. Il n’est jamais déposé chez les visiteurs du site.

## Contenus tiers

Les avis clients affichés sont récupérés par notre serveur : aucun script ni cookie Google n’est chargé dans votre navigateur.

## Évolutions

Si un outil de mesure d’audience est ajouté, un bandeau vous permettra de l’accepter ou de le refuser avant tout dépôt de cookie, et cette page sera mise à jour. [INFORMATION À CONFIRMER : outil d’analytics prévu ou non]`,
  },
};
