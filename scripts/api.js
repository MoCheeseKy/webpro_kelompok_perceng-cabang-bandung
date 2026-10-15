/**
 * api.js
 * Modul terpusat untuk komunikasi data ke JSON-Server menggunakan jQuery AJAX
 */

const API_BASE_URL = 'http://localhost:3000';

const BookmarkAPI = {
  /**
   * Mengambil data bookmark berdasarkan endpoint
   * @param {string} endpoint - 'saved-articles', 'saved-places', atau 'saved-discussions'
   * @returns {Promise}
   */
  getBookmarks(endpoint) {
    return $.ajax({
      url: `${API_BASE_URL}/${endpoint}`,
      method: 'GET',
      dataType: 'json'
    });
  },

  /**
   * Menghapus data bookmark berdasarkan endpoint dan id
   * @param {string} endpoint - 'saved-articles', 'saved-places', atau 'saved-discussions'
   * @param {string|number} id - ID item yang akan dihapus
   * @returns {Promise}
   */
  deleteBookmark(endpoint, id) {
    return $.ajax({
      url: `${API_BASE_URL}/${endpoint}/${id}`,
      method: 'DELETE',
      dataType: 'json'
    });
  }
};
