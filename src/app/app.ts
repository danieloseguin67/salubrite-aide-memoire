import { DOCUMENT } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { categories, Category, cookingRows, guideCards, Language, matchesSearch } from './guide';

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
    referenceNotProcedure: 'A quick reference, not a replacement for training.',
    disclaimer:
      'Unofficial summaries and translations of the supplied guide, 2018 edition. Check the source pages, current rules and your store’s procedures. When unsure, ask your supervisor.',
    sourceEdition: 'Source · Québec, 2018',
  },
};

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly document = inject(DOCUMENT);
  private readonly storageKey = 'salubri.preferences.v1';
  readonly categories = categories;
  readonly cookingRows = cookingRows;
  readonly language = signal<Language>('fr');
  readonly query = signal('');
  readonly selectedCategory = signal<Category>('all');
  readonly favoritesOnly = signal(false);
  readonly favorites = signal<string[]>([]);
  readonly expanded = signal<string[]>([]);
  readonly storageError = signal(false);
  readonly visibleCards = computed(() =>
    guideCards.filter(
      (card) =>
        (this.selectedCategory() === 'all' || card.category === this.selectedCategory()) &&
        (!this.favoritesOnly() || this.isFavorite(card.id)) &&
        matchesSearch(card, this.query()),
    ),
  );
  readonly quickSearches = computed(() =>
    this.language() === 'fr'
      ? ['Cuisson', 'Refroidissement', 'Allergènes']
      : ['Cooking', 'Cooling', 'Allergens'],
  );
  readonly sectionTitle = computed(() =>
    this.favoritesOnly() ? this.text('favorites') : this.categoryLabel(this.selectedCategory()),
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
  }

  showFavorites(): void {
    this.selectedCategory.set('all');
    this.favoritesOnly.set(true);
  }

  searchFor(term: string): void {
    this.resetFilters();
    this.query.set(term);
  }

  updateSearch(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.query.set(event.target.value);
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

  private updateDocumentLanguage(): void {
    this.document.documentElement.lang = this.language();
    this.document.title =
      this.language() === 'fr'
        ? 'Salubri — Aide-mémoire en épicerie'
        : 'Salubri — Grocery quick reference';
  }

  private isPreferences(value: unknown): value is { language: Language; favorites: string[] } {
    return (
      typeof value === 'object' &&
      value !== null &&
      'language' in value &&
      (value.language === 'fr' || value.language === 'en') &&
      'favorites' in value &&
      Array.isArray(value.favorites) &&
      value.favorites.every(
        (id: unknown) => typeof id === 'string' && guideCards.some((card) => card.id === id),
      )
    );
  }

  private savePreferences(): void {
    try {
      this.document.defaultView?.localStorage.setItem(
        this.storageKey,
        JSON.stringify({
          language: this.language(),
          favorites: this.favorites(),
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
