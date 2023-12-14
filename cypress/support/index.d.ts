/// <reference types="cypress" />
import { PageManager } from "@pages/PageManager";
export {};
interface imageCapturable {
  subject?: string;
  screenshotName?: string;
  threshold?: number;
  retryOptions?: { limit: number; delay: number };
  hideElementsBySelector?: [];
}
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to provide pageManager
       * @example cy.pageManager()
       */
      pageManager: () => PageManager;
      scrollToPageTop: () => Chainable<void>;
      state(state: any): any;
      goToPageTopByPageUp: () => Chainable<void>;
      console: (subject: string) => Chainable<void>;
      imageCapture: (options: imageCapturable) => Chainable<void>;
      typeRandomWords(
        count?: number,
        options?: Partial<TypeOptions>
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}

declare global {
  interface Window {
    testState: {
      gherkinDocument: messages.GherkinDocument;
      pickles: messages.Pickle[];
      pickle: messages.Pickle;
      pickleStep?: messages.PickleStep;
      currentScenario: string;
    };
  }
}
