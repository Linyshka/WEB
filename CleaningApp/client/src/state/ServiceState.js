import { makeAutoObservable } from "mobx";

export default class ServiceState {
  constructor() {
    this._services = [];
    this._page = 1;
    this._totalService = 0;
    this._limit = 3;
    this._query = '';
    this._sortOrder = 'asc';
    this._sortItem = 'title';
    this._nameAsc = true;
    this._nameDesc = false;
    this._priceAsc = false;
    this._priceDesc = false;
    makeAutoObservable(this);
  }

  setServices(services) {
    this._services = services;
  }

  get services() {
    return this._services;
  }

  get totalService() {
    return this._totalService;
  }

  setTotalService(totalService) {
    this._totalService = totalService;
  }

  get limit() {
    return this._limit;
  }

  setPage(page) {
    this._page = page;
  }

  get page() {
    return this._page;
  }

  get query() {
    return this._query;
  }

  setQuery(query) {
    this._query = query;
  }

  get nameAsc() {
    return this._nameAsc;
  }

  setNameAsc(bool) {
    this._nameAsc = bool;
  }

  get priceAsc() {
    return this._priceAsc;
  }

  setPriceAsc(bool) {
    this._priceAsc = bool;
  }

  get nameDesc() {
    return this._nameDesc;
  }

  setNameDesc(bool) {
    this._nameDesc = bool;
  }

  get priceDesc() {
    return this._priceDesc;
  }

  setPriceDesc(bool) {
    this._priceDesc = bool;
  }

  get sortItem() {
    return this._sortItem;
  }

  get sortOrder() {
    return this._sortOrder;
  }

  setSortItem(string) {
    this._sortItem = string;
  }
  
  setSortOrder(string) {
    this._sortOrder = string;
  }
}
