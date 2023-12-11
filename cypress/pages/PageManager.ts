/// <reference types="cypress"/>

import FormLayoutsPage from "./FormLayoutsPage";
import SidebarComponent from "./components/SidebarComponent";

class PageManager {
  private readonly _formLayoutsPage: FormLayoutsPage;
  private readonly _sidebarComponent: SidebarComponent;

  constructor() {
    this._formLayoutsPage = new FormLayoutsPage();
    this._sidebarComponent = new SidebarComponent();
  }

  get formLayoutsPage() {
    return this._formLayoutsPage;
  }
  get sidebarComponent() {
    return this._sidebarComponent;
  }
}

export default new PageManager();
