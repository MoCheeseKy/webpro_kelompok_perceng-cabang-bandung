/**
 * bookmark.js
 * Controller utama halaman Bookmark:
 * - Mengambil data saved-articles, saved-places, saved-discussions via AJAX
 * - Menampilkan daftar bookmark secara dinamis
 * - Filter kategori (Semua, Artikel, Tempat, Diskusi)
 * - Fitur hapus bookmark dengan HTTP DELETE AJAX
 * - State management dan update tampilan real-time
 */

$(document).ready(function () {
  // State data lokal untuk filtering cepat tanpa re-fetch berulang
  const state = {
    articles: [],
    places: [],
    discussions: [],
    activeFilter: 'Semua', // 'Semua', 'Artikel', 'Tempat', 'Diskusi'
    isLoading: true
  };

  // Cache selektor DOM
  const $articleContainer = $('#article-bookmark-list');
  const $placeContainer = $('#place-bookmark-list');
  const $discussionContainer = $('#discussion-bookmark-list');
  const $sectionArticle = $('#section-bookmark-artikel');
  const $sectionPlace = $('#section-bookmark-tempat');
  const $sectionDiscussion = $('#section-bookmark-diskusi');
  const $emptyState = $('#bookmark-empty-state');
  const $filterLinks = $('.bookmark-filter a');

  /**
   * Menampilkan loading state pada setiap section
   */
  function showLoading() {
    $articleContainer.html(BookmarkTemplates.loading());
    $placeContainer.html(BookmarkTemplates.loading());
    $discussionContainer.html(BookmarkTemplates.loading());
    $emptyState.hide();
  }

  /**
   * Mengambil semua data bookmark dari 3 endpoint JSON Server secara paralel
   */
  function fetchAllBookmarks() {
    showLoading();

    $.when(
      BookmarkAPI.getBookmarks('saved-articles'),
      BookmarkAPI.getBookmarks('saved-places'),
      BookmarkAPI.getBookmarks('saved-discussions')
    )
      .done(function (resArticles, resPlaces, resDiscussions) {
        state.articles = resArticles[0] || [];
        state.places = resPlaces[0] || [];
        state.discussions = resDiscussions[0] || [];
        state.isLoading = false;

        renderAll();
      })
      .fail(function (xhr, status, error) {
        state.isLoading = false;
        console.error('Gagal mengambil data bookmark:', error);

        const errorHtml = BookmarkTemplates.errorMessage(
          'Tidak dapat terhubung ke JSON-Server (http://localhost:3000). Silakan jalankan `npx json-server --watch datas.json`.'
        );

        $articleContainer.html(errorHtml);
        $placeContainer.empty();
        $discussionContainer.empty();
      });
  }

  /**
   * Render seluruh konten sesuai state dan filter aktif
   */
  function renderAll() {
    renderArticles();
    renderPlaces();
    renderDiscussions();
    applyFilter(state.activeFilter);
    checkGlobalEmpty();
  }

  /**
   * Render daftar saved-articles
   */
  function renderArticles() {
    if (state.articles.length === 0) {
      $articleContainer.html(BookmarkTemplates.emptySection('artikel'));
    } else {
      const html = state.articles
        .map(item => BookmarkTemplates.articleCard(item))
        .join('');
      $articleContainer.html(html);
    }
  }

  /**
   * Render daftar saved-places
   */
  function renderPlaces() {
    if (state.places.length === 0) {
      $placeContainer.html(BookmarkTemplates.emptySection('tempat'));
    } else {
      const html = state.places
        .map(item => BookmarkTemplates.placeCard(item))
        .join('');
      $placeContainer.html(html);
    }
  }

  /**
   * Render daftar saved-discussions
   */
  function renderDiscussions() {
    if (state.discussions.length === 0) {
      $discussionContainer.html(BookmarkTemplates.emptySection('diskusi'));
    } else {
      const html = state.discussions
        .map(item => BookmarkTemplates.discussionCard(item))
        .join('');
      $discussionContainer.html(html);
    }
  }

  /**
   * Filter tampilan section berdasarkan kategori: 'Semua', 'Artikel', 'Tempat', 'Diskusi'
   */
  function applyFilter(filterName) {
    state.activeFilter = filterName;

    // Update active class pada navigasi filter
    $filterLinks.removeClass('filter-aktif');
    $filterLinks.filter(function () {
      return $(this).text().trim().toLowerCase() === filterName.toLowerCase();
    }).addClass('filter-aktif');

    switch (filterName.toLowerCase()) {
      case 'artikel':
        $sectionArticle.show();
        $sectionPlace.hide();
        $sectionDiscussion.hide();
        break;
      case 'tempat':
        $sectionArticle.hide();
        $sectionPlace.show();
        $sectionDiscussion.hide();
        break;
      case 'diskusi':
        $sectionArticle.hide();
        $sectionPlace.hide();
        $sectionDiscussion.show();
        break;
      case 'semua':
      default:
        $sectionArticle.show();
        $sectionPlace.show();
        $sectionDiscussion.show();
        break;
    }

    checkGlobalEmpty();
  }

  /**
   * Mengecek apakah semua bookmark (atau kategori aktif) kosong untuk menampilkan banner "Belum Ada Bookmark?"
   */
  function checkGlobalEmpty() {
    const totalArticles = state.articles.length;
    const totalPlaces = state.places.length;
    const totalDiscussions = state.discussions.length;
    const totalAll = totalArticles + totalPlaces + totalDiscussions;

    let isEmpty = false;

    if (state.activeFilter === 'Semua') {
      isEmpty = totalAll === 0;
    } else if (state.activeFilter === 'Artikel') {
      isEmpty = totalArticles === 0;
    } else if (state.activeFilter === 'Tempat') {
      isEmpty = totalPlaces === 0;
    } else if (state.activeFilter === 'Diskusi') {
      isEmpty = totalDiscussions === 0;
    }

    if (isEmpty) {
      $emptyState.show();
    } else {
      $emptyState.hide();
    }
  }

  /**
   * Event Listener: Filter Kategori
   */
  $('.bookmark-filter').on('click', 'a', function (e) {
    e.preventDefault();
    const filterText = $(this).text().trim();
    applyFilter(filterText);
  });

  /**
   * Event Listener: Hapus Bookmark dengan konfirmasi & AJAX DELETE
   */
  $(document).on('click', '.btn-hapus', function (e) {
    e.preventDefault();

    const $btn = $(this);
    const id = $btn.data('id');
    const endpoint = $btn.data('type'); // 'saved-articles', 'saved-places', 'saved-discussions'
    const $card = $btn.closest('.bookmark-card');

    if (!confirm('Apakah kamu yakin ingin menghapus item ini dari bookmark?')) {
      return;
    }

    // Tampilkan feedback sedang menghapus
    $btn.text('Menghapus...').css('pointer-events', 'none');

    BookmarkAPI.deleteBookmark(endpoint, id)
      .done(function () {
        // Animasi fade-out card sebelum dihapus dari DOM
        $card.fadeOut(300, function () {
          $(this).remove();

          // Hapus dari state lokal
          if (endpoint === 'saved-articles') {
            state.articles = state.articles.filter(item => String(item.id) !== String(id));
            if (state.articles.length === 0) renderArticles();
          } else if (endpoint === 'saved-places') {
            state.places = state.places.filter(item => String(item.id) !== String(id));
            if (state.places.length === 0) renderPlaces();
          } else if (endpoint === 'saved-discussions') {
            state.discussions = state.discussions.filter(item => String(item.id) !== String(id));
            if (state.discussions.length === 0) renderDiscussions();
          }

          checkGlobalEmpty();
        });
      })
      .fail(function (xhr, status, error) {
        alert('Gagal menghapus bookmark dari server. Coba beberapa saat lagi.');
        console.error('Gagal menghapus bookmark:', error);
        $btn.text('Hapus Bookmark').css('pointer-events', 'auto');
      });
  });

  // Jalankan fetch awal
  fetchAllBookmarks();
});
