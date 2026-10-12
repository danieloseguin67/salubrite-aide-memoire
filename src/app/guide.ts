export type Language = 'fr' | 'en';
export type Translation = Record<Language, string>;
export type Category = 'all' | 'temperature' | 'receiving' | 'preparation' | 'hygiene' | 'cleaning';

export interface GuideCard {
  id: string;
  category: Exclude<Category, 'all'>;
  title: Translation;
  summary: Translation;
  steps: Translation[];
  warning?: Translation;
  pages: number[];
  keywords: string;
}

const t = (fr: string, en: string): Translation => ({ fr, en });

export const categories: { id: Category; label: Translation; symbol: string }[] = [
  { id: 'all', label: t('Toutes les fiches', 'All reference cards'), symbol: '▦' },
  { id: 'temperature', label: t('Températures', 'Temperatures'), symbol: '°' },
  { id: 'receiving', label: t('Réception & stockage', 'Receiving & storage'), symbol: '↓' },
  { id: 'preparation', label: t('Préparation', 'Preparation'), symbol: '◇' },
  { id: 'hygiene', label: t('Hygiène personnelle', 'Personal hygiene'), symbol: '✧' },
  { id: 'cleaning', label: t('Nettoyage & locaux', 'Cleaning & premises'), symbol: '≋' },
];

export const cookingRows: { food: Translation; target: Translation }[] = [
  { food: t('Volaille entière', 'Whole poultry'), target: t('82 °C', '82 °C') },
  { food: t('Morceaux de volaille', 'Poultry pieces'), target: t('74 °C', '74 °C') },
  {
    food: t('Volaille, gibier ou viande exotique hachés', 'Ground poultry, game or exotic meat'),
    target: t('74 °C', '74 °C'),
  },
  {
    food: t(
      'Bœuf, veau, agneau, porc, chèvre ou cheval hachés',
      'Ground beef, veal, lamb, pork, goat or horse',
    ),
    target: t('71 °C', '71 °C'),
  },
  {
    food: t('Pièces de bœuf, veau, agneau ou chèvre', 'Beef, veal, lamb or goat cuts'),
    target: t(
      '63 °C mi-saignant · 71 °C à point · 77 °C bien cuit',
      '63 °C medium-rare · 71 °C medium · 77 °C well-done',
    ),
  },
  {
    food: t('Bœuf ou veau attendri mécaniquement', 'Mechanically tenderized beef or veal'),
    target: t('63 °C', '63 °C'),
  },
  {
    food: t(
      'Porc (côtelettes, rôtis), jambon à cuire, cheval',
      'Pork chops/roasts, uncooked ham, horse',
    ),
    target: t('71 °C', '71 °C'),
  },
  {
    food: t('Pièces de gibier ou viande exotique', 'Game or exotic meat cuts'),
    target: t('74 °C', '74 °C'),
  },
  { food: t('Poisson', 'Fish'), target: t('70 °C', '70 °C') },
  {
    food: t('Fruits de mer', 'Seafood'),
    target: t(
      '74 °C OU crustacés : chair opaque; huîtres/moules : coquille ouverte',
      '74 °C OR crustaceans: opaque flesh; oysters/mussels: open shell',
    ),
  },
  {
    food: t('Œufs entiers', 'Whole eggs'),
    target: t('Blanc et jaune fermes', 'Firm white and yolk'),
  },
  { food: t('Mets à base d’œufs', 'Egg dishes'), target: t('74 °C', '74 °C') },
];

export const guideCards: GuideCard[] = [
  {
    id: 'holding',
    category: 'temperature',
    pages: [11, 12, 13],
    keywords: 'froid chaud cold hot fridge freezer danger refrigeration congélateur réfrigérateur',
    title: t('Conserver à la bonne température', 'Keep food at the right temperature'),
    summary: t(
      'Froid ≤ 4 °C · congelé ≤ −18 °C · chaud ≥ 60 °C.',
      'Cold ≤ 4 °C · frozen ≤ −18 °C · hot ≥ 60 °C.',
    ),
    steps: [
      t(
        'Contrôler les appareils avec un thermomètre fiable et calibré; consigner les relevés chaque jour.',
        'Check equipment with a reliable, calibrated thermometer; record readings daily.',
      ),
      t(
        'Limiter le temps entre 4 °C et 60 °C. Sortir seulement les quantités à préparer et remettre au froid sans tarder.',
        'Minimize time between 4 °C and 60 °C. Take out only what you need and return it to refrigeration promptly.',
      ),
      t(
        'Nettoyer et assainir la sonde entre les mesures. Pour vérifier sa fiabilité : glace et eau, une minute, 0 °C ± 1 °C.',
        'Clean and sanitize the probe between measurements. Check accuracy in ice and water for one minute: 0 °C ± 1 °C.',
      ),
    ],
    warning: t(
      'Un aliment peut contenir des pathogènes sans changement d’odeur ou d’apparence (p. 11). Une température seule ne prouve pas son innocuité.',
      'Food can contain pathogens without a change in smell or appearance (p. 11). Temperature alone does not establish safety.',
    ),
  },
  {
    id: 'cooking',
    category: 'temperature',
    pages: [18, 19],
    keywords: 'poulet chicken fish poisson viande meat egg oeuf boeuf beef cuisson',
    title: t('Cuisson : températures internes', 'Cooking: internal temperatures'),
    summary: t(
      'Mesurer au centre de l’aliment, sans toucher l’os ni le gras.',
      'Measure at the centre of the food, away from bone and fat.',
    ),
    steps: [
      t(
        'Utiliser un thermomètre fiable et calibré. Le tableau donne les températures internes minimales du guide.',
        'Use a reliable, calibrated thermometer. The table gives the guide’s minimum internal temperatures.',
      ),
      t(
        'Cuire les abats selon leur espèce. Les procédés à température plus basse nécessitent les barèmes ou conditions reconnus décrits à la page 19.',
        'Cook offal according to its species. Lower-temperature methods require the recognized schedules or conditions described on page 19.',
      ),
      t(
        'Au micro-ondes : couvrir, remuer ou retourner; atteindre 74 °C partout et laisser reposer deux minutes.',
        'For microwave cooking: cover, stir or turn; reach 74 °C throughout and let stand for two minutes.',
      ),
    ],
    warning: t(
      'Ne pas interrompre la cuisson pour la terminer plus tard : la semi-cuisson n’est pas recommandée.',
      'Do not partially cook food to finish it later: partial cooking is not recommended.',
    ),
  },
  {
    id: 'cooling',
    category: 'temperature',
    pages: [21],
    keywords: 'refroidissement cooling soup soupe riz rice',
    title: t('Refroidir en deux étapes', 'Cool in two stages'),
    summary: t(
      '60 → 21 °C en moins de 2 h; 60 → 4 °C en moins de 6 h au total.',
      '60 → 21 °C in under 2 h; 60 → 4 °C in under 6 h total.',
    ),
    steps: [
      t(
        'Mesurer et noter le temps et la température : les six heures commencent à 60 °C, pas après la première étape.',
        'Measure and record time and temperature: the six hours start at 60 °C, not after the first stage.',
      ),
      t(
        'Répartir en petites portions dans de grands récipients peu profonds; découper les grosses pièces.',
        'Divide into small portions in wide, shallow containers; cut large pieces.',
      ),
      t(
        'Utiliser un bain d’eau glacée en remuant, une cellule ou une cuillère de refroidissement. Laisser circuler l’air et ne pas fermer hermétiquement durant le refroidissement.',
        'Use a stirred ice-water bath, blast chiller or cooling paddle. Allow airflow and avoid airtight lids while cooling.',
      ),
    ],
  },
  {
    id: 'reheating',
    category: 'temperature',
    pages: [12, 21],
    keywords: 'réchauffage reheat deli chaud hot soup soupe',
    title: t('Réchauffer avant le maintien chaud', 'Reheat before hot holding'),
    summary: t(
      'Atteindre 74 °C ou 63 °C pendant 3 min, en moins de 2 h.',
      'Reach 74 °C or 63 °C for 3 min, in under 2 h.',
    ),
    steps: [
      t(
        'Ces critères visent les aliments cuits et réfrigérés réchauffés pour être maintenus chauds; vérifier toutes les parties.',
        'These criteria apply to cooked, refrigerated food reheated for hot holding; check all parts.',
      ),
      t(
        'Ne pas réchauffer dans un équipement de maintien chaud (soupière, réchaud de service).',
        'Do not reheat in hot-holding equipment such as a soup warmer or service warmer.',
      ),
      t(
        'Au micro-ondes : 74 °C partout, remuer ou retourner, puis garder couvert deux minutes. Maintenir ensuite à au moins 60 °C (p. 12).',
        'For microwaves: 74 °C throughout, stir or turn, then leave covered for two minutes. Afterwards hold at least 60 °C (p. 12).',
      ),
    ],
  },
  {
    id: 'receiving',
    category: 'receiving',
    pages: [11, 13],
    keywords: 'delivery livraison réception fournisseur supplier fifo rotation stock',
    title: t('Réceptionner & faire la rotation', 'Receive deliveries & rotate stock'),
    summary: t(
      'Vérifier les produits et préserver la chaîne de froid dès l’arrivée.',
      'Check products and preserve the cold chain on arrival.',
    ),
    steps: [
      t(
        'Examiner les produits : écarter les aliments altérés, les pommes de terre à chair verte et les conserves bombées ou fendues.',
        'Inspect products: set aside spoiled food, green-fleshed potatoes and bulging or cracked cans.',
      ),
      t(
        'Placer rapidement les produits au réfrigérateur ou au congélateur. Ne pas surcharger les appareils ni bloquer les grilles.',
        'Refrigerate or freeze promptly. Do not overload equipment or block vents.',
      ),
      t(
        'Appliquer « premier entré, premier sorti » et vérifier les durées de conservation.',
        'Use first in, first out and check shelf-life information.',
      ),
      t(
        'Vérifier la provenance : viandes sous inspection, œufs classés, laiterie reconnue. Conserver les factures et le registre des fournisseurs; vérifier espèce, date et zone de récolte des bivalves.',
        'Check origin: inspected meat, graded eggs, recognized dairy. Keep invoices and supplier records; check species, harvest date and area for bivalves.',
      ),
    ],
  },
  {
    id: 'storage',
    category: 'receiving',
    pages: [17],
    keywords: 'shelf étagère raw cru contamination rangement storage',
    title: t('Organiser le stockage', 'Organize storage safely'),
    summary: t(
      'Cru en dessous du prêt-à-manger; rien directement au sol.',
      'Raw below ready-to-eat; nothing directly on the floor.',
    ),
    steps: [
      t(
        'Garder viandes, volailles et poissons crus couverts, sous les aliments prêts à manger pour éviter les écoulements.',
        'Keep raw meat, poultry and fish covered, below ready-to-eat food to prevent drips.',
      ),
      t(
        'Séparer les produits selon leur nature et leur état; ranger ceux contenant des allergènes sous ceux qui n’en contiennent pas.',
        'Separate products by type and condition; store foods containing allergens below foods without them.',
      ),
      t(
        'Hauteur des supports : au moins 10 cm pour les supports fixes, 8 cm pour les supports amovibles.',
        'Rack clearance: at least 10 cm for fixed racks, 8 cm for movable racks.',
      ),
      t(
        'Protéger les produits non emballés des manipulations du public, sauf les fruits et légumes frais.',
        'Protect unpackaged products from public handling, except fresh fruit and vegetables.',
      ),
    ],
  },
  {
    id: 'labels',
    category: 'receiving',
    pages: [14, 15],
    keywords: 'label étiquette best before meilleur avant allergens allergènes gluten sulfites',
    title: t('Étiquettes & allergènes', 'Labels & allergens'),
    summary: t(
      'Vérifier les ingrédients, les allergènes et les indications de conservation.',
      'Check ingredients, allergens and storage instructions.',
    ),
    steps: [
      t(
        'Vérifier notamment le nom, les ingrédients en ordre décroissant, la quantité nette et le responsable du produit. Consulter la page 14 pour l’ensemble des mentions applicables.',
        'Check the name, ingredients in descending order, net quantity and responsible business. See page 14 for the full applicable particulars.',
      ),
      t(
        'Le guide exige une date limite de conservation pour les produits ayant une durée de conservation de 90 jours ou moins. Pour l’emballage en magasin : meilleur avant + conservation, ou date d’emballage + durée.',
        'The guide requires date marking for products with a shelf life of 90 days or less. For in-store packaging: best-before plus storage instructions, or packaging date plus shelf life.',
      ),
      t(
        'Déclarer : noix, arachides, sésame, blé/triticale, œufs, lait, soja, poissons, crustacés, mollusques et moutarde; ainsi que les sources de gluten et les sulfites.',
        'Declare: tree nuts, peanuts, sesame, wheat/triticale, eggs, milk, soy, fish, crustaceans, molluscs and mustard; also gluten sources and sulphites.',
      ),
      t(
        'Indiquer les allergènes dans les ingrédients ou dans une mention « Contient ». Identifier comme décongelés les viandes et produits marins concernés.',
        'Identify allergens in the ingredients or a “Contains” statement. Mark applicable thawed meat and seafood as thawed.',
      ),
    ],
    warning: t(
      'Ne pas deviner la présence d’un allergène pour un client. Vérifier la fiche du produit avec le responsable. Confirmer les règles d’étiquetage actuelles : ce résumé vient du guide de 2018.',
      'Do not guess allergen information for a customer. Check the product information with your supervisor. Confirm current labelling rules: this summary is based on the 2018 guide.',
    ),
  },
  {
    id: 'cross-contamination',
    category: 'preparation',
    pages: [17],
    keywords: 'cross contamination croisée allergen planche cutting board',
    title: t('Éviter la contamination croisée', 'Prevent cross-contamination'),
    summary: t(
      'Séparer le cru et le prêt-à-manger, y compris les mains et les outils.',
      'Separate raw and ready-to-eat food, including hands and tools.',
    ),
    steps: [
      t(
        'Nettoyer et assainir les surfaces, équipements et ustensiles après le cru, avant de passer au cuit ou au prêt-à-manger.',
        'Clean and sanitize surfaces, equipment and utensils after raw food, before cooked or ready-to-eat food.',
      ),
      t(
        'Se laver les mains souvent. Laver et assainir les chiffons et brosses, et les remplacer régulièrement.',
        'Wash hands often. Clean and sanitize cloths and brushes, and replace them regularly.',
      ),
      t(
        'Ne pas utiliser la même huile de friture pour des aliments différents, notamment le poisson (allergène) et les frites.',
        'Do not use the same frying oil for different foods, especially fish (an allergen) and fries.',
      ),
      t(
        'Ne pas poser sur un comptoir un contenant qui a touché le sol.',
        'Do not put a container that touched the floor onto a counter.',
      ),
    ],
  },
  {
    id: 'thawing',
    category: 'preparation',
    pages: [18],
    keywords: 'defrost thaw décongeler poisson fish vacuum sous vide',
    title: t('Décongeler sans risque', 'Thaw safely'),
    summary: t(
      'Jamais à température ambiante. Privilégier le réfrigérateur.',
      'Never at room temperature. Prefer the refrigerator.',
    ),
    steps: [
      t(
        'Décongeler au réfrigérateur; au micro-ondes juste avant la cuisson; ou au four en combinant décongélation et cuisson.',
        'Thaw in the refrigerator; in a microwave immediately before cooking; or in an oven as part of cooking.',
      ),
      t(
        'Autre méthode du guide : aliment totalement submergé dans un contenant sous de l’eau potable maintenue à 21 °C ou moins.',
        'Another guide method: fully submerge food in a container under potable water maintained at 21 °C or below.',
      ),
      t(
        'Pour le poisson fumé sous vide, ouvrir ou retirer l’emballage avant la décongélation au réfrigérateur.',
        'For vacuum-packed smoked fish, open or remove the packaging before refrigerator thawing.',
      ),
    ],
    warning: t(
      'Selon le guide, un aliment potentiellement dangereux décongelé ne devrait pas être recongelé.',
      'According to the guide, thawed potentially hazardous food should not be refrozen.',
    ),
  },
  {
    id: 'raw-food',
    category: 'preparation',
    pages: [20],
    keywords: 'sushi tartare riz rice raw cru parasites',
    title: t('Tartares & sushis : précautions', 'Tartare & sushi: precautions'),
    summary: t(
      'Procédés à risque : suivre une procédure validée, pas seulement cette fiche.',
      'Higher-risk processes: follow a validated procedure, not just this card.',
    ),
    steps: [
      t(
        'Tartare : utiliser une pièce intacte et très fraîche, jamais de viande hachée; retirer une mince couche externe. Consommer dans les 24 h suivant la préparation.',
        'Tartare: use a very fresh, intact cut, never ground meat; remove a thin outer layer. Consume within 24 h of preparation.',
      ),
      t(
        'Riz à sushi à température ambiante : pH cible 4,2 et durée maximale 16 h. Si l’acidification n’est pas correcte, garder au réfrigérateur.',
        'Sushi rice at room temperature: target pH 4.2 and maximum 16 h. If acidification is inadequate, keep refrigerated.',
      ),
      t(
        'La majorité des poissons nécessitent au moins 7 jours à −20 °C avant préparation pour les parasites. Le guide prévoit des exemptions pour certains thons et poissons d’élevage; vérifier les exigences pour le produit exact.',
        'Most fish require at least 7 days at −20 °C before preparation for parasite control. The guide lists exemptions for some tuna and farmed fish; verify requirements for the exact product.',
      ),
    ],
    warning: t(
      'Ces aliments présentent toujours un risque; le guide recommande aux personnes vulnérables de les éviter.',
      'These foods always carry risk; the guide recommends that vulnerable people avoid them.',
    ),
  },
  {
    id: 'hands',
    category: 'hygiene',
    pages: [25],
    keywords: 'hand wash lavage mains savon soap gel',
    title: t('Bien se laver les mains', 'Wash hands properly'),
    summary: t(
      'Avant le travail et après tout risque de contamination.',
      'Before work and after every contamination risk.',
    ),
    steps: [
      t(
        'Mouiller → savonner → frotter ongles, mains et poignets → rincer → sécher. Laver aussi les avant-bras, avec eau chaude et savon distribué.',
        'Wet → soap → rub nails, hands and wrists → rinse → dry. Also wash forearms, using warm water and dispensed soap.',
      ),
      t(
        'Recommencer après les toilettes, le tabac et la manipulation du cru. Ne pas essuyer les mains sur les vêtements.',
        'Repeat after the toilet, tobacco use and handling raw food. Do not dry hands on clothing.',
      ),
      t(
        'Vérifier le poste : eau potable chaude et froide, savon, serviettes individuelles à usage unique et évacuation des eaux usées.',
        'Check the station: hot and cold potable water, soap, individual single-use towels and wastewater drainage.',
      ),
    ],
    warning: t(
      'Le gel antiseptique et les gants ne remplacent pas le lavage des mains.',
      'Hand sanitizer and gloves do not replace handwashing.',
    ),
  },
  {
    id: 'illness',
    category: 'hygiene',
    pages: [26],
    keywords: 'sick malade vomissement vomiting diarrhea diarrhée injury blessure gloves gants',
    title: t('Maladie, blessures & gants', 'Illness, wounds & gloves'),
    summary: t(
      'Signaler les symptômes au responsable et éviter le contact alimentaire.',
      'Report symptoms to your supervisor and avoid food contact.',
    ),
    steps: [
      t(
        'Diarrhée ou vomissements : retrait ou réaffectation sans risque de transmission, jusqu’à 48 h après disparition complète des symptômes selon le guide. Jaunisse : retrait jusqu’à une semaine après le début de la maladie.',
        'Diarrhea or vomiting: exclusion or reassignment without transmission risk, up to 48 h after symptoms fully stop according to the guide. Jaundice: exclusion until one week after illness begins.',
      ),
      t(
        'Lésion infectée visible : pas de préparation ni de lavage du matériel. Plaie non infectée : pansement propre et étanche; gants par-dessus sur mains, poignets ou avant-bras.',
        'Visible infected lesion: no preparation or equipment washing. Uninfected wound: clean waterproof dressing; gloves over it on hands, wrists or forearms.',
      ),
      t(
        'Gants sans latex, à usage unique. Se laver les mains avant de les enfiler et à chaque remplacement; changer après le cru, une nouvelle tâche, une contamination ou une déchirure.',
        'Use latex-free single-use gloves. Wash hands before putting them on and at each replacement; change after raw food, a task change, contamination or a tear.',
      ),
    ],
    warning: t(
      'Suivre les consignes du responsable et les recommandations médicales pour le retour au travail.',
      'Follow your supervisor’s instructions and medical advice before returning to work.',
    ),
  },
  {
    id: 'clothing',
    category: 'hygiene',
    pages: [27],
    keywords: 'hair cheveux résille uniform uniforme bijoux jewelry nails ongles',
    title: t('Tenue & déplacements', 'Workwear & movement'),
    summary: t(
      'Vêtements propres, cheveux couverts, ongles courts et sans vernis.',
      'Clean work clothes, covered hair, short unpolished nails.',
    ),
    steps: [
      t(
        'Porter une tenue réservée au travail, une résille ou un bonnet couvrant les cheveux et un couvre-barbe si nécessaire.',
        'Wear work-only clothing, a hairnet or cap covering hair, and a beard cover when needed.',
      ),
      t(
        'Retirer bijoux et objets pouvant tomber dans les aliments, ainsi que faux ongles et faux cils. Les aides au handicap, MedicAlert et outils de travail doivent être sécurisés.',
        'Remove jewellery and items that could fall into food, plus false nails and lashes. Disability aids, MedicAlert items and work tools must be secured.',
      ),
      t(
        'Ne pas manger dans les zones de préparation/nettoyage. Pour goûter, éviter de contaminer le plat et laver la cuillère ensuite.',
        'Do not eat in preparation/cleaning areas. When tasting, avoid contaminating the dish and wash the spoon afterwards.',
      ),
      t(
        'Limiter les déplacements entre zones propres et zones contaminées.',
        'Limit movement between clean and contaminated areas.',
      ),
    ],
  },
  {
    id: 'cleaning',
    category: 'cleaning',
    pages: [22, 23],
    keywords: 'sanitize assainissement detergent détergent dish lave vaisselle',
    title: t('Nettoyer, puis assainir', 'Clean, then sanitize'),
    summary: t(
      'Prélaver → laver au détergent → rincer → assainir.',
      'Prewash → wash with detergent → rinse → sanitize.',
    ),
    steps: [
      t(
        'Inspecter visuellement après le nettoyage; recommencer s’il reste des saletés.',
        'Inspect visually after cleaning; repeat if soil remains.',
      ),
      t(
        'Assainissement chimique : respecter concentration, température, durée de contact et rinçage indiqués par le fabricant.',
        'Chemical sanitizing: follow the manufacturer’s concentration, temperature, contact time and rinsing instructions.',
      ),
      t(
        'Assainissement thermique : au moins 82 °C en automatique; ou 77 °C pendant au moins 30 s en manuel. Maintenir la température et le contact requis.',
        'Thermal sanitizing: at least 82 °C for automatic systems; or 77 °C for at least 30 s manually. Maintain the required temperature and contact.',
      ),
      t(
        'Garder les produits chimiques à l’écart des aliments. Laver et rincer les chiffons; maintenir propre leur solution d’assainissement. Ne pas utiliser de brosses ou tampons métalliques.',
        'Keep chemicals away from food. Wash and rinse cloths; keep their sanitizer solution clean. Do not use metal brushes or scouring pads.',
      ),
    ],
  },
  {
    id: 'equipment',
    category: 'cleaning',
    pages: [23, 29],
    keywords: 'equipment matériel registre log thermometer thermomètre emballage packaging',
    title: t('Matériel & registres', 'Equipment & records'),
    summary: t(
      'Matériel en bon état et registres accessibles au personnel.',
      'Sound equipment and records accessible to staff.',
    ),
    steps: [
      t(
        'Surfaces alimentaires lisses, non absorbantes, imperméables, sans fissures et résistantes au nettoyage. Utiliser des emballages propres, adaptés à leur traitement.',
        'Food-contact surfaces must be smooth, non-absorbent, waterproof, crack-free and cleaning-resistant. Use clean packaging suited to its treatment.',
      ),
      t(
        'Équiper les appareils de froid et de maintien chaud d’un thermomètre fiable et calibré; dégivrer et nettoyer régulièrement.',
        'Fit cold and hot-holding equipment with reliable, calibrated thermometers; defrost and clean regularly.',
      ),
      t(
        'Garder les registres remplis et accessibles : fournisseurs, cuisson, refroidissement, températures de conservation, nettoyage et formation. Certains sont obligatoires; consulter la page 23.',
        'Keep completed records accessible: suppliers, cooking, cooling, holding temperatures, cleaning and training. Some are mandatory; see page 23.',
      ),
    ],
  },
  {
    id: 'premises',
    category: 'cleaning',
    pages: [31, 32],
    keywords: 'water eau potable boil ébullition pest insecte rongeur waste déchets milieu',
    title: t('Locaux, nuisibles & eau potable', 'Premises, pests & potable water'),
    summary: t(
      'Protéger les aliments, maîtriser les déchets et utiliser de l’eau potable.',
      'Protect food, control waste and use potable water.',
    ),
    steps: [
      t(
        'Maintenir les surfaces des locaux propres et lavables; protéger les éclairages et empêcher l’entrée des insectes et rongeurs.',
        'Keep premises surfaces clean and washable; protect lights and prevent insect and rodent entry.',
      ),
      t(
        'Fermer les déchets dans des récipients étanches; vider souvent et nettoyer/assainir. Vérifier les traces de nuisibles et signaler les problèmes.',
        'Keep waste in closed, leakproof containers; empty frequently and clean/sanitize. Check for pest signs and report problems.',
      ),
      t(
        'Eau potable pour préparation, glace, nettoyage et assainissement. Eau non municipale : analyses deux fois par an, de préférence au printemps et à l’automne.',
        'Use potable water for preparation, ice, cleaning and sanitizing. Non-municipal water: test twice a year, preferably spring and autumn.',
      ),
    ],
    warning: t(
      'Avis d’ébullition : utiliser une autre source d’eau potable pour préparation, glace, lavage des mains et nettoyage/assainissement des surfaces alimentaires. Suivre les mesures d’urgence du responsable.',
      'Boil-water advisory: use another potable water source for preparation, ice, handwashing and cleaning/sanitizing food-contact surfaces. Follow your supervisor’s emergency procedures.',
    ),
  },
];

export function normalizeSearch(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/œ/g, 'oe');
}

export function matchesSearch(card: GuideCard, query: string): boolean {
  const searchable = normalizeSearch(
    [
      card.title.fr,
      card.title.en,
      card.summary.fr,
      card.summary.en,
      card.keywords,
      ...card.steps.flatMap((step) => [step.fr, step.en]),
      card.warning?.fr ?? '',
      card.warning?.en ?? '',
      ...(card.id === 'cooking'
        ? cookingRows.flatMap((row) => Object.values(row.food).concat(Object.values(row.target)))
        : []),
    ].join(' '),
  );
  return normalizeSearch(query)
    .trim()
    .split(/\s+/)
    .every((word) => searchable.includes(word));
}
