export type PopupToContentMessage = {
  searchText: string;
  stringInputElement: string;
  tabId: number;
};

export type ContentToBackgroundMessage = {
  tabId: number;
};
