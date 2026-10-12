import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { App } from './app';
import { cookingRows, guideCards, matchesSearch } from './guide';

describe('Salubri reference', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  function createApp() {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    return fixture;
  }

  it('renders the French reference and all cards by default', () => {
    const fixture = createApp();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('h1')?.textContent).toContain('Les bons réflexes');
    expect(element.querySelectorAll('article').length).toBe(guideCards.length);
    expect(document.documentElement.lang).toBe('fr');
  });

  it('switches content, controls and document language to English', () => {
    const fixture = createApp();
    const element: HTMLElement = fixture.nativeElement;
    element.querySelector<HTMLButtonElement>('button[lang="en"]')!.click();
    fixture.detectChanges();
    expect(element.querySelector('h1')?.textContent).toContain('Good practices');
    expect(element.querySelector('h3')?.textContent).toBe('Keep food at the right temperature');
    expect(document.documentElement.lang).toBe('en');
    expect(document.title).toContain('Grocery');
  });

  it('searches both languages, without accents, including expanded-only content', () => {
    const app = createApp().componentInstance;
    app.query.set('decongelation');
    expect(app.visibleCards().some((card) => card.id === 'thawing')).toBe(true);
    app.query.set('handwashing');
    expect(app.visibleCards().map((card) => card.id)).toContain('hands');
    app.query.set('opaque');
    expect(app.visibleCards().map((card) => card.id)).toContain('cooking');
    app.query.set('zzzz-no-result');
    expect(app.visibleCards()).toHaveLength(0);
  });

  it('handles input events and displays the empty-search state', () => {
    const fixture = createApp();
    const element: HTMLElement = fixture.nativeElement;
    const input = element.querySelector<HTMLInputElement>('#guide-search')!;
    input.value = 'zzzz-no-result';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(element.querySelector('.empty-state h3')?.textContent?.trim()).toBe('Aucune fiche trouvée');
    expect(element.querySelectorAll('article')).toHaveLength(0);
    fixture.componentInstance.resetFilters();
    fixture.detectChanges();
    expect(element.querySelectorAll('article')).toHaveLength(guideCards.length);
  });

  it('combines category and search and resets quick-search filters', () => {
    const app = createApp().componentInstance;
    app.selectCategory('temperature');
    expect(app.visibleCards()).toHaveLength(4);
    app.query.set('refroidissement');
    expect(app.visibleCards().map((card) => card.id)).toEqual(['cooling']);
    app.showFavorites();
    expect(app.visibleCards()).toHaveLength(0);
    app.searchFor('Allergènes');
    expect(app.favoritesOnly()).toBe(false);
    expect(app.selectedCategory()).toBe('all');
    expect(app.visibleCards().some((card) => card.id === 'labels')).toBe(true);
  });

  it('persists favourites and language across app recreation', () => {
    const first = createApp();
    first.componentInstance.toggleFavorite('cooling');
    first.componentInstance.setLanguage('en');
    first.destroy();
    const next = createApp().componentInstance;
    expect(next.language()).toBe('en');
    next.showFavorites();
    expect(next.visibleCards().map((card) => card.id)).toEqual(['cooling']);
    next.toggleFavorite('cooling');
    expect(next.visibleCards()).toHaveLength(0);
  });

  it('reports invalid preferences instead of silently accepting them', () => {
    localStorage.setItem('salubri.preferences.v1', '{"language":"xx","favorites":[]}');
    const logger = vi.spyOn(console, 'error').mockImplementation(() => {});
    const fixture = createApp();
    const element: HTMLElement = fixture.nativeElement;
    expect(fixture.componentInstance.storageError()).toBe(true);
    expect(element.querySelector('[role="alert"]')?.textContent).toContain('Impossible');
    expect(logger).toHaveBeenCalled();
  });

  it('keeps favourites usable in memory when storage writes fail', () => {
    const fixture = createApp();
    const logger = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Storage denied', 'SecurityError');
    });
    fixture.componentInstance.toggleFavorite('hands');
    expect(fixture.componentInstance.isFavorite('hands')).toBe(true);
    expect(fixture.componentInstance.storageError()).toBe(true);
    expect(logger).toHaveBeenCalled();
  });

  it('expands instructions with an accessible control and source links', () => {
    const fixture = createApp();
    const element: HTMLElement = fixture.nativeElement;
    const button = element.querySelector<HTMLButtonElement>('[aria-controls="details-cooling"]')!;
    expect(button.getAttribute('aria-expanded')).toBe('false');
    button.click();
    fixture.detectChanges();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(element.querySelector<HTMLElement>('#details-cooling')?.hidden).toBe(false);
    expect(element.querySelector('#details-cooling a')?.getAttribute('href')).toBe(
      'source.pdf#page=21',
    );
  });

  it('retains the exact source-specific cooking and cooling thresholds', () => {
    const row = (name: string) => cookingRows.find((item) => item.food.en === name)!;
    expect(row('Whole poultry').target.en).toBe('82 °C');
    expect(row('Fish').target.en).toBe('70 °C');
    expect(row('Poultry pieces').target.en).toBe('74 °C');
    expect(row('Mechanically tenderized beef or veal').target.en).toBe('63 °C');
    expect(row('Whole eggs').target.en).toBe('Firm white and yolk');
    expect(guideCards.find((card) => card.id === 'cooling')?.summary.en).toBe(
      '60 → 21 °C in under 2 h; 60 → 4 °C in under 6 h total.',
    );
    expect(guideCards.find((card) => card.id === 'reheating')?.summary.en).toBe(
      'Reach 74 °C or 63 °C for 3 min, in under 2 h.',
    );
  });

  it('provides complete bilingual content and valid citations for every card', () => {
    expect(new Set(guideCards.map((card) => card.id)).size).toBe(guideCards.length);
    for (const card of guideCards) {
      expect(card.pages.length).toBeGreaterThan(0);
      expect(card.pages.every((page) => Number.isInteger(page) && page >= 1 && page <= 36)).toBe(
        true,
      );
      for (const translation of [card.title, card.summary, ...card.steps]) {
        expect(translation.fr.length).toBeGreaterThan(0);
        expect(translation.en.length).toBeGreaterThan(0);
      }
      expect(matchesSearch(card, '')).toBe(true);
    }
  });

  it('uses the browser print action', () => {
    const app = createApp().componentInstance;
    const print = vi.spyOn(window, 'print').mockImplementation(() => {});
    app.print();
    expect(print).toHaveBeenCalledOnce();
  });
});
