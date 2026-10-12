import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { App } from './app';
import { cookingRows, guideCards, matchesSearch, searchScore } from './guide';

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
    expect(element.querySelector('.empty-state h3')?.textContent?.trim()).toBe(
      'Aucune fiche trouvée',
    );
    expect(element.querySelectorAll('article')).toHaveLength(0);
    fixture.componentInstance.resetFilters();
    fixture.detectChanges();
    expect(element.querySelectorAll('article')).toHaveLength(guideCards.length);
  });

  it('searches across every category and provides direct PDF page links', () => {
    const fixture = createApp();
    const app = fixture.componentInstance;
    const element: HTMLElement = fixture.nativeElement;
    app.selectCategory('temperature');
    app.showFavorites();

    const input = element.querySelector<HTMLInputElement>('#guide-search')!;
    input.value = 'allergènes';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(app.selectedCategory()).toBe('all');
    expect(app.favoritesOnly()).toBe(false);
    expect(app.visibleCards().map((card) => card.id)).toContain('labels');
    const labelsCard = Array.from(element.querySelectorAll<HTMLElement>('.reference-card')).find(
      (card) => card.querySelector('h3')?.textContent?.includes('Étiquettes'),
    );
    expect(
      labelsCard?.querySelector<HTMLAnchorElement>('.page-reference a')?.getAttribute('href'),
    ).toBe('source.pdf#page=14');
    expect(
      element.querySelector<HTMLAnchorElement>('.full-guide-search a')?.getAttribute('href'),
    ).toBe('source.pdf');
  });

  it('finds chicken references when a user types poulet and reports the results', () => {
    const fixture = createApp();
    const element: HTMLElement = fixture.nativeElement;
    const input = element.querySelector<HTMLInputElement>('#guide-search')!;
    input.value = 'poulet';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.visibleCards().map((card) => card.id)).toContain('cooking');
    expect(element.querySelector('#cards-title')?.textContent).toContain('Résultats de recherche');
    expect(element.querySelector('.search-feedback')?.textContent).toContain('fiches trouvées');
    expect(
      Array.from(
        element.querySelectorAll<HTMLAnchorElement>('.reference-card .page-reference a'),
      ).map((link) => link.getAttribute('href')),
    ).toContain('source.pdf#page=18');
  });

  it('shows the ChatGPT workflow in order and explains how to include an image', () => {
    const fixture = createApp();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelectorAll('.workflow-steps li')).toHaveLength(3);
    expect(element.querySelector('.workflow-steps')?.textContent).toContain('Ctrl+V');

    fixture.componentInstance.question.set('Question de test');
    fixture.componentInstance.createPrompt();
    fixture.detectChanges();
    expect(element.querySelector('.image-link-note')?.textContent).toContain('Téléchargez l’image');
  });

  it('searches across category filters and resets filters for quick searches', () => {
    const app = createApp().componentInstance;
    app.selectCategory('temperature');
    expect(app.visibleCards()).toHaveLength(4);
    app.query.set('refroidissement');
    expect(app.visibleCards().map((card) => card.id)).toEqual(['cooling', 'equipment']);
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

  it('creates a ChatGPT prompt and persists saved question-and-answer entries', () => {
    const first = createApp();
    const element: HTMLElement = first.nativeElement;
    const question = element.querySelector<HTMLTextAreaElement>('#user-question')!;
    question.value = 'How do I prevent cross-contamination?';
    question.dispatchEvent(new Event('input', { bubbles: true }));
    expect(first.componentInstance.question()).toBe('How do I prevent cross-contamination?');
    first.detectChanges();
    element.querySelector<HTMLButtonElement>('.assistant-panel > button')!.click();
    first.detectChanges();
    expect(first.componentInstance.generatedPrompt()).toContain(
      'How do I prevent cross-contamination?',
    );
    expect(element.querySelector<HTMLAnchorElement>('.chatgpt-link')?.href).toBe(
      'https://chatgpt.com/',
    );

    const answer = element.querySelector<HTMLTextAreaElement>('#chatgpt-answer')!;
    answer.value = 'Keep raw and ready-to-eat foods separate.';
    answer.dispatchEvent(new Event('input'));
    first.detectChanges();
    first.componentInstance.answerImages.set([
      { dataUrl: 'data:image/webp;base64,AAAA', name: 'food-separation.webp' },
      { dataUrl: 'data:image/webp;base64,BBBB', name: 'food-storage.webp' },
    ]);
    element.querySelector<HTMLButtonElement>('.prompt-output > button')!.click();
    first.detectChanges();
    expect(element.querySelector('.knowledge-table tbody th')?.textContent).toContain(
      'How do I prevent cross-contamination?',
    );
    expect(
      JSON.parse(localStorage.getItem('salubri.preferences.v1')!).knowledgeBase[0].images.map(
        (image: { name: string }) => image.name,
      ),
    ).toEqual(['food-separation.webp', 'food-storage.webp']);
    expect(element.querySelectorAll('.knowledge-table tbody tr')).toHaveLength(1);
    expect(element.querySelector('.knowledge-detail')).toBeNull();
    expect(element.querySelector('.image-count')?.textContent).toContain('2');
    const shareLinks = element.querySelectorAll<HTMLAnchorElement>('.share-action');
    expect(shareLinks).toHaveLength(2);
    expect(shareLinks[0].href).toContain('https://wa.me/?text=');
    expect(decodeURIComponent(shareLinks[0].href.split('?text=')[1])).toBe(
      'Question: How do I prevent cross-contamination?\n\nRéponse: Keep raw and ready-to-eat foods separate.',
    );
    expect(shareLinks[1].href.startsWith('mailto:?')).toBe(true);
    expect(new URLSearchParams(shareLinks[1].href.split('?')[1]).get('body')).toBe(
      'Question: How do I prevent cross-contamination?\n\nRéponse: Keep raw and ready-to-eat foods separate.',
    );
    expect(element.querySelector('.share-knowledge-note')?.textContent).toContain(
      'mais pas les images',
    );
    expect(element.querySelector('.knowledge-actions')?.textContent).toContain('Voir');
    expect(element.querySelector('.knowledge-actions')?.textContent).toContain('Supprimer');
    expect(
      element.querySelector<HTMLButtonElement>('.delete-action')?.getAttribute('aria-label'),
    ).toBe('Supprimer cette entrée');

    element.querySelector<HTMLButtonElement>('.table-action:not(.delete-action)')!.click();
    first.detectChanges();
    expect(element.querySelector('.knowledge-detail')?.textContent).toContain(
      'Keep raw and ready-to-eat foods separate.',
    );
    expect(element.querySelectorAll<HTMLImageElement>('.knowledge-detail img')).toHaveLength(2);

    first.destroy();
    const next = createApp();
    expect(next.componentInstance.knowledgeBase()).toHaveLength(1);
    const nextElement: HTMLElement = next.nativeElement;
    nextElement.querySelector<HTMLButtonElement>('.delete-action')!.click();
    next.detectChanges();
    expect(next.componentInstance.knowledgeBase()).toHaveLength(0);
    expect(localStorage.getItem('salubri.preferences.v1')).toContain('"knowledgeBase":[]');
  });

  it('allows several pending images and removes them individually', () => {
    const fixture = createApp();
    const app = fixture.componentInstance;
    const element: HTMLElement = fixture.nativeElement;
    app.question.set('Question avec plusieurs images');
    app.createPrompt();
    fixture.detectChanges();
    expect(element.querySelector<HTMLInputElement>('#answer-image')?.multiple).toBe(true);
    app.answerImages.set([
      { dataUrl: 'data:image/webp;base64,AAAA', name: 'first.webp' },
      { dataUrl: 'data:image/webp;base64,BBBB', name: 'second.webp' },
    ]);
    fixture.detectChanges();

    expect(element.querySelectorAll('.answer-image-preview')).toHaveLength(2);
    element.querySelectorAll<HTMLButtonElement>('.answer-image-preview button')[0].click();
    fixture.detectChanges();
    expect(app.answerImages().map((image) => image.name)).toEqual(['second.webp']);
    expect(element.querySelectorAll('.answer-image-preview')).toHaveLength(1);
    fixture.destroy();
  });

  it('inserts selected images at the cursor and renders them inline in the saved answer', async () => {
    const fixture = createApp();
    const app = fixture.componentInstance;
    const element: HTMLElement = fixture.nativeElement;
    app.question.set('Question avec des images intégrées');
    app.createPrompt();
    fixture.detectChanges();
    const textarea = element.querySelector<HTMLTextAreaElement>('#chatgpt-answer')!;
    textarea.value = 'Before then after';
    textarea.dispatchEvent(new Event('input'));
    textarea.setSelectionRange(12, 12);
    Object.defineProperty(app, 'compressImage', {
      value: vi.fn().mockResolvedValue('data:image/webp;base64,AAAA'),
    });

    const firstImage = new File(['first'], 'first.png', { type: 'image/png' });
    const secondImage = new File(['second'], 'second.jpeg', { type: 'image/jpeg' });
    const input = element.querySelector<HTMLInputElement>('#answer-image')!;
    Object.defineProperty(input, 'files', { value: [firstImage, secondImage] });
    input.dispatchEvent(new Event('change'));
    await vi.waitFor(() => expect(app.answerImages()).toHaveLength(2));

    expect(app.answer()).toBe('Before then [Image 1] [Image 2] after');
    expect(element.querySelectorAll('.answer-image-preview')).toHaveLength(2);
    app.saveKnowledgeEntry();
    fixture.detectChanges();
    element.querySelector<HTMLButtonElement>('.table-action:not(.delete-action)')!.click();
    fixture.detectChanges();

    const inlineAnswer = element.querySelector('.knowledge-answer')!;
    expect(inlineAnswer.textContent?.replace(/\s+/g, ' ').trim()).toBe('Before then after');
    expect(Array.from(inlineAnswer.querySelectorAll('img')).map((image) => image.alt)).toEqual([
      'first.png',
      'second.jpeg',
    ]);
    expect(element.querySelector('.knowledge-images')).toBeNull();
    fixture.destroy();
  });

  it('pastes an image at the answer cursor and retains it as an inline image marker', async () => {
    const fixture = createApp();
    const app = fixture.componentInstance;
    const element: HTMLElement = fixture.nativeElement;
    app.question.set('Question avec une image collée');
    app.createPrompt();
    fixture.detectChanges();
    const textarea = element.querySelector<HTMLTextAreaElement>('#chatgpt-answer')!;
    textarea.value = 'Avant après';
    textarea.dispatchEvent(new Event('input'));
    textarea.setSelectionRange(6, 6);
    Object.defineProperty(app, 'compressImage', {
      value: vi.fn().mockResolvedValue('data:image/webp;base64,AAAA'),
    });

    const pastedImage = new File(['image'], 'pasted.png', { type: 'image/png' });
    const event = new Event('paste', { bubbles: true, cancelable: true }) as ClipboardEvent;
    Object.defineProperty(event, 'clipboardData', {
      value: {
        items: [{ type: 'image/png', getAsFile: () => pastedImage }],
        files: [],
        getData: () => '',
      },
    });
    textarea.dispatchEvent(event);
    await vi.waitFor(() => expect(app.answerImages()).toHaveLength(1));

    expect(event.defaultPrevented).toBe(true);
    expect(app.answer()).toBe('Avant [Image 1] après');
    fixture.destroy();
  });

  it('preserves pasted response text when the clipboard also contains an image', () => {
    const fixture = createApp();
    const app = fixture.componentInstance;
    const element: HTMLElement = fixture.nativeElement;
    app.question.set('Question avec une réponse collée');
    app.createPrompt();
    fixture.detectChanges();
    const textarea = element.querySelector<HTMLTextAreaElement>('#chatgpt-answer')!;
    textarea.value = 'Texte avant et après';
    textarea.setSelectionRange(12, 12);
    const event = new Event('paste', { bubbles: true, cancelable: true }) as ClipboardEvent;
    const oversizedImage = {
      type: 'image/png',
      size: 8 * 1024 * 1024 + 1,
    } as File;
    Object.defineProperty(event, 'clipboardData', {
      value: {
        items: [{ type: 'image/png', getAsFile: () => oversizedImage }],
        files: [oversizedImage],
        getData: () => 'Réponse collée ',
      },
    });

    textarea.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    expect(app.answer()).toBe('Texte avant Réponse collée et après');
    expect(app.imageStatus()).toBe('error');
    fixture.destroy();
  });

  it('does not intercept ordinary text-only pastes in the response field', () => {
    const fixture = createApp();
    const app = fixture.componentInstance;
    const element: HTMLElement = fixture.nativeElement;
    app.question.set('Question avec une réponse collée');
    app.createPrompt();
    fixture.detectChanges();
    const textarea = element.querySelector<HTMLTextAreaElement>('#chatgpt-answer')!;
    const event = new Event('paste', { bubbles: true, cancelable: true }) as ClipboardEvent;
    Object.defineProperty(event, 'clipboardData', {
      value: { items: [], files: [], getData: () => 'Texte copié' },
    });

    textarea.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
    fixture.destroy();
  });

  it('continues to display knowledge entries saved with the earlier single-image format', () => {
    localStorage.setItem(
      'salubri.preferences.v1',
      JSON.stringify({
        language: 'fr',
        favorites: [],
        knowledgeBase: [
          {
            id: 'legacy',
            question: 'Question antérieure',
            answer: 'Réponse antérieure',
            image: { dataUrl: 'data:image/webp;base64,AAAA', name: 'ancienne.webp' },
          },
        ],
      }),
    );
    const fixture = createApp();
    const app = fixture.componentInstance;
    const element: HTMLElement = fixture.nativeElement;
    expect(app.getKnowledgeImages(app.knowledgeBase()[0]).map((image) => image.name)).toEqual([
      'ancienne.webp',
    ]);
    element.querySelector<HTMLButtonElement>('.table-action:not(.delete-action)')!.click();
    fixture.detectChanges();
    expect(element.querySelector('.knowledge-detail figcaption')?.textContent).toBe(
      'ancienne.webp',
    );
    fixture.destroy();
  });

  it('does not save an empty answer or save before a prompt has been created', () => {
    const app = createApp().componentInstance;
    app.question.set('How should food be cooled?');
    app.answer.set('Cool it promptly.');
    app.saveKnowledgeEntry();
    expect(app.knowledgeBase()).toHaveLength(0);

    app.createPrompt();
    app.answer.set('   ');
    app.saveKnowledgeEntry();
    expect(app.knowledgeBase()).toHaveLength(0);
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

  it('ranks full matches above partial matches and can search source page numbers', () => {
    const thawing = guideCards.find((card) => card.id === 'thawing')!;
    const cooling = guideCards.find((card) => card.id === 'cooling')!;
    expect(searchScore(thawing, 'décongélation poisson')).toBeGreaterThan(
      searchScore(cooling, 'décongélation poisson'),
    );
    expect(matchesSearch(thawing, '18')).toBe(true);
  });

  it('uses the browser print action', () => {
    const app = createApp().componentInstance;
    const print = vi.spyOn(window, 'print').mockImplementation(() => {});
    app.print();
    expect(print).toHaveBeenCalledOnce();
  });
});
