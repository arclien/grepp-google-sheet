export const Storage = {
  /**
   * @param {boolean} isSession 세션스토리지 사용 여부
   */
  getStorage(isSession) {
    if (isSession) {
      return window.sessionStorage;
    }
    return window.localStorage;
  },

  /**
   * @param key key
   * @param value value
   * @param {boolean} isSession 세션스토리지 사용 여부
   */
  setItem(key, value, isSession = false) {
    this.getStorage(isSession).setItem(key, JSON.stringify(value));
  },

  /**
   * @param key key
   * @param defaultVal default value if key doesnt exist
   * @param {boolean} isSession 세션스토리지 사용 여부
   */
  getItem(key, defaultVal = null, isSession = false) {
    const val = this.getStorage(isSession).getItem(key);
    if (!val || val === 'undefined') return defaultVal;
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  },

  /**
   * @param key key
   * @param {boolean} isSession 세션스토리지 사용 여부
   */
  removeItem(key, isSession = false, preserved = false) {
    this.getStorage(isSession).removeItem(key);
  },

  /**
   * @param {boolean} isSession 세션스토리지 사용 여부
   */
  clearItems(isSession = false) {
    this.getStorage(isSession).clear();
  },
};
