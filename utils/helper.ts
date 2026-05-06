function setLocale(locale: string) {
  document.cookie = `locale=${locale}; path=/; max-age=31536000`;
}

export { setLocale };
