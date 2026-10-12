import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import {
  categories,
  Category,
  cookingRows,
  guideCards,
  Language,
  searchScore,
  t,
  Translation,
} from './guide';

const copy = {
  fr: {
    skip: 'Aller aux fiches',
    brandSubtitle: 'L’essentiel en épicerie',
    yourGuide: 'VOTRE GUIDE',
    categories: 'Catégories',
    favorites: 'Mes favoris',
    sourceTitle: 'La source, à portée de main',
    sourceDescription: 'Guide des bonnes pratiques d’hygiène et de salubrité alimentaires · Québec',
    openGuide: 'Consulter le PDF',
    madeFor: 'Pensé pour votre quotidien en magasin.',
    workspace: 'Mon espace',
    quickReference: 'Aide-mémoire',
    language: 'Langue',
    print: 'Imprimer',
    eyebrow: 'VOTRE COMPAGNON EN MAGASIN',
    heading: 'Les bons réflexes, en un coup d’œil',
    description:
      'Moins de temps à chercher. Plus de confiance au quotidien. Retrouvez l’essentiel de la salubrité alimentaire, du quai de réception au comptoir.',
    searchLabel: 'Rechercher dans toutes les fiches',
    searchPlaceholder: 'Une question ? Cherchez : poulet, refroidissement, allergènes…',
    clearSearch: 'Effacer la recherche',
    searchResultsTitle: 'Résultats de recherche',
    searchResultsCount: 'fiches trouvées',
    jumpToResults: 'Voir les résultats',
    fullGuideSearch: 'Rechercher dans le guide complet (36 pages) ↗',
    fullGuideSearchHint:
      'Ouvrez le PDF, puis utilisez Ctrl+F ou ⌘F pour chercher dans toutes ses pages.',
    sourcePage: 'Ouvrir la page',
    quickSearch: 'Accès rapide :',
    storageError:
      'Impossible de lire ou d’enregistrer vos préférences sur cet appareil. Les favoris et la langue restent disponibles pour cette visite, mais leur conservation n’est pas garantie.',
    dismiss: 'Fermer',
    essentialTemps: 'Les températures à retenir',
    alwaysKeep: 'Conservation · guide p. 12',
    refrigerated: 'Réfrigéré',
    frozen: 'Congelé',
    hotHolding: 'Maintien chaud',
    dangerZone: 'Zone de danger',
    tempSource: 'Lire la source des températures, page 12',
    cardsCount: 'fiches à consulter',
    resetFilters: 'Tout réinitialiser',
    cardHint: 'Les gestes utiles, sans le superflu.',
    removeFavorite: 'Retirer des favoris',
    addFavorite: 'Ajouter aux favoris',
    guidePages: 'Guide · p.',
    less: 'Réduire',
    steps: 'Voir les étapes',
    cookingCaption: 'Températures internes minimales · p. 19',
    food: 'Aliment',
    target: 'Cuisson',
    attention: 'À retenir.',
    verifySource: 'Vérifier dans le guide :',
    noFavorites: 'Vos essentiels, juste ici',
    favoriteHint: 'Touchez l’étoile d’une fiche pour la retrouver rapidement dans vos favoris.',
    noResults: 'Aucune fiche trouvée',
    searchHint: 'Essayez un autre mot, en français ou en anglais, ou réinitialisez les filtres.',
    showAll: 'Voir toutes les fiches',
    relatedTopicsTitle: 'Sujets liés au magasin',
    relatedTopicsDescription: 'Les points-clés à surveiller dans un rayon ou un poste de travail.',
    askSectionTitle: 'Poser une question à ChatGPT',
    askSectionDescription:
      'Suivez ces étapes dans l’ordre : l’application ne communique pas automatiquement avec ChatGPT.',
    workflowStepOneTitle: '1. Écrivez votre question',
    workflowStepOne: 'Entrez votre question ci-dessous, puis cliquez sur « Créer le prompt ».',
    workflowStepTwoTitle: '2. Envoyez-la à ChatGPT',
    workflowStepTwo:
      'Cliquez sur « Copier le prompt », ouvrez ChatGPT, collez le texte (Ctrl+V) et envoyez-le.',
    workflowStepThreeTitle: '3. Enregistrez la réponse',
    workflowStepThree:
      'Copiez la réponse de ChatGPT, collez-la dans le champ « Réponse », puis cliquez sur « Ajouter à ma base de connaissances ».',
    imageLinkNote:
      'Une adresse ou un lien d’image dans le texte ne l’ajoute pas à la fiche. Téléchargez l’image, puis joignez le fichier ou collez l’image elle-même.',
    questionLabel: 'Votre question',
    questionPlaceholder: 'Ex. : Comment éviter la contamination croisée pendant la préparation ?',
    createPrompt: 'Créer le prompt',
    promptLabel: 'Prompt à copier dans ChatGPT',
    copyPrompt: 'Copier le prompt',
    copiedPrompt: 'Prompt copié.',
    copyFailed: 'La copie automatique a échoué. Sélectionnez le texte du prompt et copiez-le.',
    openChatGpt: 'Ouvrir ChatGPT',
    answerLabel: 'Réponse de ChatGPT',
    answerPlaceholder: 'Collez ici la réponse obtenue dans ChatGPT…',
    addAnswerImage: 'Joindre des images',
    imageHelp:
      'Placez le curseur où insérer l’image, puis collez-la ou choisissez-la avec « Joindre des images ». Le repère [Image 1] sera remplacé par l’image dans la fiche (maximum 5).',
    imageAttached: 'Image(s) insérée(s) dans la réponse.',
    imageRemoved: 'Retirer',
    imageError: 'Image non ajoutée. Utilisez un fichier JPEG, PNG ou WebP de moins de 8 Mo.',
    imageLimit: 'Maximum de 5 images par réponse.',
    questionColumn: 'Question',
    answerColumn: 'Réponse',
    actionColumn: 'Action',
    viewKnowledge: 'Voir',
    hideKnowledge: 'Masquer',
    saveAnswer: 'Ajouter à ma base de connaissances',
    knowledgeBaseTitle: 'Ma base de connaissances',
    knowledgeCount: 'réponses enregistrées',
    knowledgeEmpty: 'Les réponses que vous choisirez de conserver apparaîtront ici.',
    exportKnowledge: 'Exporter JSON',
    importKnowledge: 'Importer JSON',
    importKnowledgeLabel: 'Importer une base de connaissances JSON',
    knowledgeExportSuccess: 'Base de connaissances exportée.',
    knowledgeImportSuccess:
      'Import terminé. Nouvelles fiches : {added}; doublons ignorés : {skipped}.',
    knowledgeImportError:
      'Import impossible. Choisissez un fichier JSON Salubri valide; aucune entrée n’a été ajoutée.',
    removeKnowledgeAction: 'Supprimer',
    removeKnowledgeEntry: 'Supprimer cette entrée',
    shareKnowledgeNote: 'Le partage comprend la question et la réponse, mais pas les images.',
    shareWhatsapp: 'WhatsApp',
    shareEmail: 'Courriel',
    shareWhatsappLabel: 'Partager cette réponse avec WhatsApp',
    shareEmailLabel: 'Partager cette réponse par courriel',
    shareQuestion: 'Question',
    shareAnswer: 'Réponse',
    answerImageAlt: 'Image associée à la réponse',
    referenceNotProcedure: 'Un aide-mémoire, pas un remplacement de votre formation.',
    disclaimer:
      'Résumés et traductions non officiels du guide fourni, édition 2018. Vérifiez les pages sources, les règles en vigueur et les procédures de votre magasin. En cas de doute, demandez au responsable.',
    sourceEdition: 'Source · Québec, 2018',
  },
  en: {
    skip: 'Skip to reference cards',
    brandSubtitle: 'Grocery essentials',
    yourGuide: 'YOUR GUIDE',
    categories: 'Categories',
    favorites: 'My favourites',
    sourceTitle: 'The source, close at hand',
    sourceDescription: 'Guide to good food hygiene and safety practices · Québec',
    openGuide: 'Open the PDF',
    madeFor: 'Made for your everyday work in store.',
    workspace: 'My workspace',
    quickReference: 'Quick reference',
    language: 'Language',
    print: 'Print',
    eyebrow: 'YOUR IN-STORE COMPANION',
    heading: 'Good practices, at a glance',
    description:
      'Less time searching. More confidence every day. Find the food safety essentials, from the receiving dock to the service counter.',
    searchLabel: 'Search all reference cards',
    searchPlaceholder: 'Have a question? Search: chicken, cooling, allergens…',
    clearSearch: 'Clear search',
    searchResultsTitle: 'Search results',
    searchResultsCount: 'references found',
    jumpToResults: 'View results',
    fullGuideSearch: 'Search the complete guide (36 pages) ↗',
    fullGuideSearchHint: 'Open the PDF, then use Ctrl+F or ⌘F to search all its pages.',
    sourcePage: 'Open page',
    quickSearch: 'Quick access:',
    storageError:
      'Your preferences could not be read or saved on this device. Favourites and language still work for this visit, but may not be retained.',
    dismiss: 'Dismiss',
    essentialTemps: 'Temperatures to remember',
    alwaysKeep: 'Holding · guide p. 12',
    refrigerated: 'Refrigerated',
    frozen: 'Frozen',
    hotHolding: 'Hot holding',
    dangerZone: 'Danger zone',
    tempSource: 'Read the temperature source, page 12',
    cardsCount: 'reference cards',
    resetFilters: 'Reset all filters',
    cardHint: 'Useful actions. No unnecessary detail.',
    removeFavorite: 'Remove from favourites',
    addFavorite: 'Add to favourites',
    guidePages: 'Guide · p.',
    less: 'Show less',
    steps: 'See the steps',
    cookingCaption: 'Minimum internal temperatures · p. 19',
    food: 'Food',
    target: 'Cooking',
    attention: 'Remember.',
    verifySource: 'Check the original guide:',
    noFavorites: 'Your essentials, right here',
    favoriteHint: 'Tap the star on a card to find it quickly in your favourites.',
    noResults: 'No matching cards',
    searchHint: 'Try another word, in French or English, or reset your filters.',
    showAll: 'Show all cards',
    relatedTopicsTitle: 'Related grocery topics',
    relatedTopicsDescription: 'Key points to monitor in any aisle, prep area or service counter.',
    askSectionTitle: 'Ask ChatGPT a question',
    askSectionDescription:
      'Follow these steps in order: the app does not communicate with ChatGPT automatically.',
    workflowStepOneTitle: '1. Write your question',
    workflowStepOne: 'Enter your question below, then click “Create prompt.”',
    workflowStepTwoTitle: '2. Send it to ChatGPT',
    workflowStepTwo: 'Click “Copy prompt,” open ChatGPT, paste the text (Ctrl+V), and send it.',
    workflowStepThreeTitle: '3. Save the answer',
    workflowStepThree:
      'Copy ChatGPT’s response, paste it in the “Response” field, then click “Add to my knowledge base.”',
    imageLinkNote:
      'An image URL or link in the text does not add the image to the entry. Download the image, then attach the file or paste the image itself.',
    questionLabel: 'Your question',
    questionPlaceholder: 'e.g. How can I prevent cross-contamination during food preparation?',
    createPrompt: 'Create prompt',
    promptLabel: 'Prompt to copy into ChatGPT',
    copyPrompt: 'Copy prompt',
    copiedPrompt: 'Prompt copied.',
    copyFailed: 'Automatic copying failed. Select the prompt text and copy it.',
    openChatGpt: 'Open ChatGPT',
    answerLabel: 'ChatGPT response',
    answerPlaceholder: 'Paste the response you got from ChatGPT here…',
    addAnswerImage: 'Attach images',
    imageHelp:
      'Place the cursor where the image should go, then paste it or choose it with “Attach images.” The [Image 1] marker will be replaced by the image in the saved entry (maximum 5).',
    imageAttached: 'Image(s) inserted in the response.',
    imageRemoved: 'Remove',
    imageError: 'Image not added. Use a JPEG, PNG or WebP file under 8 MB.',
    imageLimit: 'Maximum of 5 images per answer.',
    questionColumn: 'Question',
    answerColumn: 'Answer',
    actionColumn: 'Action',
    viewKnowledge: 'View',
    hideKnowledge: 'Hide',
    saveAnswer: 'Add to my knowledge base',
    knowledgeBaseTitle: 'My knowledge base',
    knowledgeCount: 'saved answers',
    knowledgeEmpty: 'Answers you choose to keep will appear here.',
    exportKnowledge: 'Export JSON',
    importKnowledge: 'Import JSON',
    importKnowledgeLabel: 'Import a JSON knowledge base',
    knowledgeExportSuccess: 'Knowledge base exported.',
    knowledgeImportSuccess: 'Import complete. New entries: {added}; duplicates skipped: {skipped}.',
    knowledgeImportError: 'Import failed. Choose a valid Salubri JSON file; no entries were added.',
    removeKnowledgeAction: 'Delete',
    removeKnowledgeEntry: 'Delete this entry',
    shareKnowledgeNote: 'Sharing includes the question and answer, but not the images.',
    shareWhatsapp: 'WhatsApp',
    shareEmail: 'Email',
    shareWhatsappLabel: 'Share this answer with WhatsApp',
    shareEmailLabel: 'Share this answer by email',
    shareQuestion: 'Question',
    shareAnswer: 'Answer',
    answerImageAlt: 'Image attached to the answer',
    referenceNotProcedure: 'A quick reference, not a replacement for training.',
    disclaimer:
      'Unofficial summaries and translations of the supplied guide, 2018 edition. Check the source pages, current rules and your store’s procedures. When unsure, ask your supervisor.',
    sourceEdition: 'Source · Québec, 2018',
  },
};

interface KnowledgeEntry {
  id: string;
  question: string;
  answer: string;
  images?: AnswerImage[];
  image?: AnswerImage;
}

interface AnswerImage {
  dataUrl: string;
  name: string;
}

interface KnowledgeAnswerPart {
  text: string;
  image: AnswerImage | null;
}

interface KnowledgeTransferStatus {
  kind: 'success' | 'error' | 'exported';
  added?: number;
  skipped?: number;
}

function isAnswerImage(value: unknown): value is AnswerImage {
  return (
    typeof value === 'object' &&
    value !== null &&
    'dataUrl' in value &&
    typeof value.dataUrl === 'string' &&
    /^data:image\/webp;base64,[A-Za-z0-9+/]+=*$/.test(value.dataUrl) &&
    value.dataUrl.length < 450_000 &&
    'name' in value &&
    typeof value.name === 'string'
  );
}

function isKnowledgeEntry(value: unknown): value is KnowledgeEntry {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof value.id === 'string' &&
    value.id.trim().length > 0 &&
    'question' in value &&
    typeof value.question === 'string' &&
    value.question.trim().length > 0 &&
    'answer' in value &&
    typeof value.answer === 'string' &&
    value.answer.trim().length > 0 &&
    (!('images' in value) ||
      (Array.isArray(value.images) &&
        value.images.length <= 5 &&
        value.images.every(isAnswerImage))) &&
    (!('image' in value) || isAnswerImage(value.image))
  );
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly document = inject(DOCUMENT);
  private readonly storageKey = 'salubri.preferences.v1';
  private promptSequence = 0;
  private attachingImageCount = 0;
  readonly categories = categories;
  readonly relatedCategories: Array<{
    id: Exclude<Category, 'all'>;
    label: Translation;
    symbol: string;
  }> = categories.filter(
    (category): category is { id: Exclude<Category, 'all'>; label: Translation; symbol: string } =>
      category.id !== 'all',
  );
  readonly cookingRows = cookingRows;
  readonly language = signal<Language>('fr');
  readonly query = signal('');
  readonly selectedCategory = signal<Category>('all');
  readonly favoritesOnly = signal(false);
  readonly favorites = signal<string[]>([]);
  readonly expanded = signal<string[]>([]);
  readonly storageError = signal(false);
  readonly question = signal('');
  readonly generatedPrompt = signal('');
  readonly answer = signal('');
  readonly answerImages = signal<AnswerImage[]>([]);
  readonly imageStatus = signal<'idle' | 'added' | 'error' | 'limit'>('idle');
  readonly expandedKnowledgeEntry = signal<string | null>(null);
  readonly copyStatus = signal<'idle' | 'copied' | 'error'>('idle');
  readonly knowledgeTransferStatus = signal<KnowledgeTransferStatus | null>(null);
  readonly knowledgeBase = signal<KnowledgeEntry[]>([]);
  readonly visibleCards = computed(() => {
    const query = this.query();
    const allMatches = guideCards
      .map((card) => ({ card, score: searchScore(card, query) }))
      .filter(({ score }) => score > 0)
      .sort((first, second) => second.score - first.score)
      .map(({ card }) => card);

    if (query.trim()) {
      return allMatches;
    }

    return allMatches.filter(
      (card) =>
        (this.selectedCategory() === 'all' || card.category === this.selectedCategory()) &&
        (!this.favoritesOnly() || this.isFavorite(card.id)),
    );
  });
  readonly quickSearches = computed(() =>
    this.language() === 'fr'
      ? ['Cuisson', 'Refroidissement', 'Allergènes']
      : ['Cooking', 'Cooling', 'Allergens'],
  );
  readonly sectionTitle = computed(() =>
    this.query().trim()
      ? this.text('searchResultsTitle')
      : this.favoritesOnly()
        ? this.text('favorites')
        : this.categoryLabel(this.selectedCategory()),
  );

  constructor() {
    try {
      const stored = this.document.defaultView?.localStorage.getItem(this.storageKey);
      if (stored) {
        const value: unknown = JSON.parse(stored);
        if (!this.isPreferences(value)) {
          throw new Error('Invalid saved Salubri preferences');
        }
        this.language.set(value.language);
        this.favorites.set([...new Set(value.favorites)]);
        this.knowledgeBase.set(value.knowledgeBase ?? []);
      }
    } catch (error) {
      this.reportStorageError(error);
    }
    this.updateDocumentLanguage();
  }

  text(key: keyof typeof copy.fr): string {
    return copy[this.language()][key];
  }

  categoryLabel(id: Category): string {
    return categories.find((category) => category.id === id)!.label[this.language()];
  }

  relatedTopicSummary(id: Exclude<Category, 'all'>): string {
    const summaries: Record<Exclude<Category, 'all'>, Translation> = {
      temperature: t(
        'Thermomètres, zones de danger et conservation',
        'Thermometers, danger zones and holding',
      ),
      receiving: t(
        'Réception, stockage et vigilance sur les livraisons',
        'Receiving, storage and delivery checks',
      ),
      preparation: t(
        'Préparation, cuisson et manipulation sûre',
        'Preparation, cooking and safe handling',
      ),
      hygiene: t(
        'Hygiène personnelle et prévention des contaminants',
        'Personal hygiene and contamination prevention',
      ),
      cleaning: t(
        'Nettoyage, désinfection et entretien des locaux',
        'Cleaning, sanitation and facility upkeep',
      ),
    };

    return summaries[id][this.language()];
  }

  updateQuestion(event: Event): void {
    if (event.target instanceof HTMLTextAreaElement) {
      this.question.set(event.target.value);
    }
  }

  updateAnswer(event: Event): void {
    if (event.target instanceof HTMLTextAreaElement) {
      this.answer.set(event.target.value);
    }
  }

  handleAnswerPaste(event: ClipboardEvent): void {
    const clipboard = event.clipboardData;
    const images = Array.from(clipboard?.items ?? [])
      .filter((item) => item.type.startsWith('image/'))
      .map((item) => item.getAsFile())
      .filter((image): image is File => image !== null);
    for (const image of Array.from(clipboard?.files ?? [])) {
      if (!images.includes(image) && image.type.startsWith('image/')) {
        images.push(image);
      }
    }
    if (images.length) {
      event.preventDefault();
      const text = clipboard?.getData('text/plain') ?? '';
      let insertionPosition =
        event.target instanceof HTMLTextAreaElement
          ? event.target.selectionStart
          : this.answer().length;
      if (text && event.target instanceof HTMLTextAreaElement) {
        const textarea = event.target;
        const start = textarea.selectionStart;
        textarea.setRangeText(text, start, textarea.selectionEnd, 'end');
        this.answer.set(textarea.value);
        insertionPosition = start + text.length;
      }
      void this.attachAnswerImages(images, {
        answer: this.answer(),
        position: insertionPosition,
      });
    }
  }

  handleImageSelection(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      const images = Array.from(event.target.files ?? []);
      if (images.length) {
        const textarea = this.document.querySelector<HTMLTextAreaElement>('#chatgpt-answer');
        const answer = textarea?.value ?? this.answer();
        void this.attachAnswerImages(images, {
          answer,
          position: textarea?.selectionStart ?? answer.length,
        });
      }
      event.target.value = '';
    }
  }

  removeAnswerImage(index: number): void {
    this.answerImages.update((images) => images.filter((_, imageIndex) => imageIndex !== index));
    this.answer.update((answer) =>
      answer.replace(/ ?\[Image ([1-5])\]/g, (marker, number: string) => {
        const markerIndex = Number(number);
        if (markerIndex === index + 1) {
          return '';
        }
        return markerIndex > index + 1
          ? `${marker.startsWith(' ') ? ' ' : ''}[Image ${markerIndex - 1}]`
          : marker;
      }),
    );
    if (
      this.imageStatus() === 'added' ||
      (this.imageStatus() === 'limit' && this.answerImages().length < 5)
    ) {
      this.imageStatus.set('idle');
    }
  }

  createPrompt(): void {
    const question = this.question().trim();
    if (!question) {
      return;
    }

    const context =
      this.language() === 'fr'
        ? 'Tu aides un employé d’épicerie à répondre à une question sur la salubrité alimentaire. Réponds en français, clairement et de façon pratique. Distingue les règles confirmées des recommandations générales, n’invente pas de règlement ni de température. Signale les incertitudes et conseille de vérifier les exigences locales et les procédures du magasin ou de consulter un responsable.'
        : 'Help a grocery store employee answer a food-safety question. Reply in English, clearly and practically. Distinguish confirmed requirements from general advice; do not invent regulations or temperatures. Flag uncertainty and recommend checking local requirements and store procedures or asking a supervisor.';
    this.generatedPrompt.set(`${context}\n\nQuestion: ${question}`);
    this.answer.set('');
    this.copyStatus.set('idle');
  }

  async copyPrompt(): Promise<void> {
    try {
      const clipboard = this.document.defaultView?.navigator.clipboard;
      if (!clipboard) {
        throw new Error('Clipboard API is unavailable');
      }
      await clipboard.writeText(this.generatedPrompt());
      this.copyStatus.set('copied');
    } catch (error) {
      console.error('Unable to copy the ChatGPT prompt:', error);
      this.copyStatus.set('error');
    }
  }

  saveKnowledgeEntry(): void {
    const question = this.question().trim();
    const answer = this.answer().trim();
    if (!question || !answer || !this.generatedPrompt()) {
      return;
    }

    const images = this.answerImages();
    this.knowledgeBase.update((entries) => [
      {
        id: `${Date.now()}-${this.promptSequence++}`,
        question,
        answer,
        ...(images.length ? { images } : {}),
      },
      ...entries,
    ]);
    this.savePreferences();
    this.question.set('');
    this.generatedPrompt.set('');
    this.answer.set('');
    this.answerImages.set([]);
    this.imageStatus.set('idle');
    this.expandedKnowledgeEntry.set(null);
    this.copyStatus.set('idle');
  }

  toggleKnowledgeDetails(id: string): void {
    this.expandedKnowledgeEntry.update((expandedId) => (expandedId === id ? null : id));
  }

  knowledgeShareText(entry: KnowledgeEntry): string {
    return `${this.text('shareQuestion')}: ${entry.question}\n\n${this.text('shareAnswer')}: ${entry.answer}`;
  }

  whatsappShareUrl(entry: KnowledgeEntry): string {
    return `https://wa.me/?text=${encodeURIComponent(this.knowledgeShareText(entry))}`;
  }

  emailShareUrl(entry: KnowledgeEntry): string {
    const subject = `${this.text('knowledgeBaseTitle')} — ${entry.question}`;
    return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(this.knowledgeShareText(entry))}`;
  }

  exportKnowledgeBase(): void {
    const view = this.document.defaultView;
    if (!view) {
      this.knowledgeTransferStatus.set({ kind: 'error' });
      return;
    }

    let downloadUrl: string | null = null;
    try {
      const exportData = {
        format: 'salubri-knowledge-base',
        version: 1,
        exportedAt: new Date().toISOString(),
        entries: this.knowledgeBase(),
      };
      const file = new view.Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json',
      });
      downloadUrl = view.URL.createObjectURL(file);
      const link = this.document.createElement('a');
      link.href = downloadUrl;
      link.download = 'salubri-knowledge-base.json';
      link.click();
      this.knowledgeTransferStatus.set({ kind: 'exported' });
    } catch (error) {
      console.error('Unable to export the knowledge base:', error);
      this.knowledgeTransferStatus.set({ kind: 'error' });
    } finally {
      if (downloadUrl) {
        const url = downloadUrl;
        view.setTimeout(() => view.URL.revokeObjectURL(url), 0);
      }
    }
  }

  async importKnowledgeBase(event: Event): Promise<void> {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) {
      return;
    }
    const file = input.files?.[0];
    input.value = '';
    if (!file) {
      return;
    }

    try {
      const parsed: unknown = JSON.parse(await file.text());
      if (
        typeof parsed !== 'object' ||
        parsed === null ||
        !('format' in parsed) ||
        parsed.format !== 'salubri-knowledge-base' ||
        !('version' in parsed) ||
        parsed.version !== 1 ||
        !('entries' in parsed) ||
        !Array.isArray(parsed.entries) ||
        !parsed.entries.every(isKnowledgeEntry)
      ) {
        throw new Error('Invalid knowledge base export');
      }

      const existingIds = new Set(this.knowledgeBase().map((entry) => entry.id));
      const importedIds = new Set<string>();
      let skipped = 0;
      const newEntries = parsed.entries.filter((entry) => {
        if (existingIds.has(entry.id) || importedIds.has(entry.id)) {
          skipped += 1;
          return false;
        }
        importedIds.add(entry.id);
        return true;
      });
      if (newEntries.length) {
        this.knowledgeBase.update((entries) => [...entries, ...newEntries]);
        this.savePreferences();
      }
      this.knowledgeTransferStatus.set({
        kind: 'success',
        added: newEntries.length,
        skipped,
      });
    } catch (error) {
      console.error('Unable to import the knowledge base:', error);
      this.knowledgeTransferStatus.set({ kind: 'error' });
    }
  }

  knowledgeTransferMessage(): string {
    const status = this.knowledgeTransferStatus();
    if (!status) {
      return '';
    }
    if (status.kind === 'error') {
      return this.text('knowledgeImportError');
    }
    if (status.kind === 'exported') {
      return this.text('knowledgeExportSuccess');
    }
    return this.text('knowledgeImportSuccess')
      .replace('{added}', String(status.added ?? 0))
      .replace('{skipped}', String(status.skipped ?? 0));
  }

  openKnowledgeImportPicker(): void {
    this.document.getElementById('knowledge-import')?.click();
  }

  removeKnowledgeEntry(id: string): void {
    this.knowledgeBase.update((entries) => entries.filter((entry) => entry.id !== id));
    if (this.expandedKnowledgeEntry() === id) {
      this.expandedKnowledgeEntry.set(null);
    }
    this.savePreferences();
  }

  categoryCount(id: Category): number {
    return guideCards.filter((card) => id === 'all' || card.category === id).length;
  }

  setLanguage(language: Language): void {
    this.language.set(language);
    this.updateDocumentLanguage();
    this.savePreferences();
  }

  selectCategory(category: Category): void {
    this.selectedCategory.set(category);
    this.favoritesOnly.set(false);
    this.query.set('');
  }

  showFavorites(): void {
    this.selectedCategory.set('all');
    this.favoritesOnly.set(true);
    this.query.set('');
  }

  searchFor(term: string): void {
    this.resetFilters();
    this.query.set(term);
  }

  updateSearch(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.query.set(event.target.value);
      if (event.target.value.trim()) {
        this.selectedCategory.set('all');
        this.favoritesOnly.set(false);
      }
    }
  }

  resetFilters(): void {
    this.query.set('');
    this.selectedCategory.set('all');
    this.favoritesOnly.set(false);
  }

  isFavorite(id: string): boolean {
    return this.favorites().includes(id);
  }

  toggleFavorite(id: string): void {
    this.favorites.update((values) =>
      this.isFavorite(id) ? values.filter((value) => value !== id) : [...values, id],
    );
    this.savePreferences();
  }

  isExpanded(id: string): boolean {
    return this.expanded().includes(id);
  }

  toggleExpanded(id: string): void {
    this.expanded.update((values) =>
      this.isExpanded(id) ? values.filter((value) => value !== id) : [...values, id],
    );
  }

  print(): void {
    this.document.defaultView?.print();
  }

  getKnowledgeImages(entry: KnowledgeEntry): AnswerImage[] {
    return entry.images ?? (entry.image ? [entry.image] : []);
  }

  knowledgeAnswerParts(entry: KnowledgeEntry): KnowledgeAnswerPart[] {
    const images = this.getKnowledgeImages(entry);
    const parts: KnowledgeAnswerPart[] = [];
    const markerPattern = /\[Image ([1-5])\]/g;
    let lastIndex = 0;

    for (const match of entry.answer.matchAll(markerPattern)) {
      const markerIndex = Number(match[1]) - 1;
      if (markerIndex >= images.length || match.index === undefined) {
        continue;
      }
      if (match.index > lastIndex) {
        parts.push({ text: entry.answer.slice(lastIndex, match.index), image: null });
      }
      parts.push({ text: '', image: images[markerIndex] });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < entry.answer.length || !parts.length) {
      parts.push({ text: entry.answer.slice(lastIndex), image: null });
    }
    return parts;
  }

  getUnplacedKnowledgeImages(entry: KnowledgeEntry): AnswerImage[] {
    const images = this.getKnowledgeImages(entry);
    const placedIndexes = new Set(
      Array.from(entry.answer.matchAll(/\[Image ([1-5])\]/g))
        .map((match) => Number(match[1]) - 1)
        .filter((index) => index >= 0 && index < images.length),
    );
    return images.filter((_, index) => !placedIndexes.has(index));
  }

  private async attachAnswerImages(
    files: File[],
    insertion: { answer: string; position: number },
  ): Promise<void> {
    const room = Math.max(0, 5 - this.answerImages().length - this.attachingImageCount);
    if (files.length > room) {
      this.imageStatus.set('limit');
    }
    const acceptedFiles = files.slice(0, room);
    this.attachingImageCount += acceptedFiles.length;
    let hasError = files.length > acceptedFiles.length;
    const acceptedImages: AnswerImage[] = [];

    try {
      for (const file of acceptedFiles) {
        if (
          file.size > 8 * 1024 * 1024 ||
          !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
        ) {
          hasError = true;
          continue;
        }
        try {
          acceptedImages.push({ dataUrl: await this.compressImage(file), name: file.name });
        } catch (error) {
          console.error('Unable to attach the answer image:', error);
          hasError = true;
        }
      }
    } finally {
      this.attachingImageCount -= acceptedFiles.length;
    }

    if (acceptedImages.length) {
      let firstImageIndex = 0;
      this.answerImages.update((images) => {
        firstImageIndex = images.length;
        return [...images, ...acceptedImages];
      });
      const currentAnswer = this.answer();
      const position =
        currentAnswer === insertion.answer
          ? Math.min(insertion.position, currentAnswer.length)
          : currentAnswer.length;
      const markers = acceptedImages
        .map((_, index) => `[Image ${firstImageIndex + index + 1}]`)
        .join(' ');
      const prefix = position > 0 && !/\s$/.test(currentAnswer.slice(0, position)) ? ' ' : '';
      const suffix =
        position < currentAnswer.length && !/^\s/.test(currentAnswer.slice(position)) ? ' ' : '';
      this.answer.set(
        `${currentAnswer.slice(0, position)}${prefix}${markers}${suffix}${currentAnswer.slice(position)}`,
      );
    }
    this.imageStatus.set(
      files.length > acceptedFiles.length
        ? 'limit'
        : hasError
          ? 'error'
          : acceptedImages.length
            ? 'added'
            : 'error',
    );
  }

  private async compressImage(file: File): Promise<string> {
    const view = this.document.defaultView;
    if (!view) {
      throw new Error('Image processing is unavailable');
    }

    const source = await new Promise<string>((resolve, reject) => {
      const reader = new view.FileReader();
      reader.addEventListener('load', () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Unable to read image file'));
        }
      });
      reader.addEventListener('error', () =>
        reject(reader.error ?? new Error('Image read failed')),
      );
      reader.readAsDataURL(file);
    });
    const image = new view.Image();
    await new Promise<void>((resolve, reject) => {
      image.addEventListener('load', () => resolve(), { once: true });
      image.addEventListener('error', () => reject(new Error('Image could not be decoded')), {
        once: true,
      });
      image.src = source;
    });

    const canvas = this.document.createElement('canvas');
    const scale = Math.min(1, 1400 / Math.max(image.naturalWidth, image.naturalHeight));
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Canvas image processing is unavailable');
    }
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    for (const quality of [0.78, 0.62, 0.48]) {
      const compressed = canvas.toDataURL('image/webp', quality);
      if (compressed.startsWith('data:image/webp') && compressed.length < 450_000) {
        return compressed;
      }
    }
    throw new Error('Compressed image exceeds the supported storage size');
  }

  private updateDocumentLanguage(): void {
    this.document.documentElement.lang = this.language();
    this.document.title =
      this.language() === 'fr'
        ? 'Salubri — Aide-mémoire en épicerie'
        : 'Salubri — Grocery quick reference';
  }

  private isPreferences(
    value: unknown,
  ): value is { language: Language; favorites: string[]; knowledgeBase?: KnowledgeEntry[] } {
    return (
      typeof value === 'object' &&
      value !== null &&
      'language' in value &&
      (value.language === 'fr' || value.language === 'en') &&
      'favorites' in value &&
      Array.isArray(value.favorites) &&
      value.favorites.every(
        (id: unknown) => typeof id === 'string' && guideCards.some((card) => card.id === id),
      ) &&
      (!('knowledgeBase' in value) ||
        (Array.isArray(value.knowledgeBase) &&
          value.knowledgeBase.every(
            (entry: unknown) =>
              typeof entry === 'object' &&
              entry !== null &&
              'id' in entry &&
              typeof entry.id === 'string' &&
              'question' in entry &&
              typeof entry.question === 'string' &&
              entry.question.trim().length > 0 &&
              'answer' in entry &&
              typeof entry.answer === 'string' &&
              entry.answer.trim().length > 0 &&
              (!('images' in entry) ||
                (Array.isArray(entry.images) &&
                  entry.images.length <= 5 &&
                  entry.images.every(
                    (image: unknown) =>
                      typeof image === 'object' &&
                      image !== null &&
                      'dataUrl' in image &&
                      typeof image.dataUrl === 'string' &&
                      /^data:image\/webp;base64,[A-Za-z0-9+/]+=*$/.test(image.dataUrl) &&
                      image.dataUrl.length < 450_000 &&
                      'name' in image &&
                      typeof image.name === 'string',
                  ))) &&
              (!('image' in entry) ||
                (typeof entry.image === 'object' &&
                  entry.image !== null &&
                  'dataUrl' in entry.image &&
                  typeof entry.image.dataUrl === 'string' &&
                  /^data:image\/webp;base64,[A-Za-z0-9+/]+=*$/.test(entry.image.dataUrl) &&
                  entry.image.dataUrl.length < 450_000 &&
                  'name' in entry.image &&
                  typeof entry.image.name === 'string')),
          )))
    );
  }

  private savePreferences(): void {
    try {
      this.document.defaultView?.localStorage.setItem(
        this.storageKey,
        JSON.stringify({
          language: this.language(),
          favorites: this.favorites(),
          knowledgeBase: this.knowledgeBase(),
        }),
      );
    } catch (error) {
      this.reportStorageError(error);
    }
  }

  private reportStorageError(error: unknown): void {
    console.error('Unable to access Salubri preferences:', error);
    this.storageError.set(true);
  }
}
