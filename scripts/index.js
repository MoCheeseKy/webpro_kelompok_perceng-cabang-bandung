/**
 * index.js
 * Mengambil dan merender tempat, artikel, dan diskusi di halaman beranda.
 */

$(document).ready(function () {
  const collections = [
    {
      endpoint: 'places',
      selector: '#place-list',
      template: IndexTemplates.placeCard,
      limit: 2,
      emptyMessage: 'Belum ada tempat untuk ditampilkan.'
    },
    {
      endpoint: 'articles',
      selector: '#article-list',
      template: IndexTemplates.articleCard,
      limit: 3,
      emptyMessage: 'Belum ada tulisan untuk ditampilkan.'
    },
    {
      endpoint: 'discussions',
      selector: '#discussion-list',
      template: IndexTemplates.discussionCard,
      limit: 3,
      emptyMessage: 'Belum ada diskusi untuk ditampilkan.'
    }
  ];

  collections.forEach(function (collection) {
    const $container = $(collection.selector);

    ContentAPI.getCollection(collection.endpoint)
      .done(function (items) {
        if (!Array.isArray(items)) {
          console.error(`Format data endpoint /${collection.endpoint} tidak valid.`);
          $container.html(IndexTemplates.stateMessage('Format data tidak valid.', 'error'));
          return;
        }

        const visibleItems = items.slice(0, collection.limit);
        const content = visibleItems.length
          ? visibleItems.map(item => collection.template.call(IndexTemplates, item)).join('')
          : IndexTemplates.stateMessage(collection.emptyMessage, 'empty');

        $container.html(content);
      })
      .fail(function (xhr, status, error) {
        console.error(`Gagal mengambil data /${collection.endpoint}:`, error || status);
        $container.html(
          IndexTemplates.stateMessage(
            'Gagal memuat konten. Pastikan JSON Server berjalan di http://localhost:3000.',
            'error'
          )
        );
      })
      .always(function () {
        $container.attr('aria-busy', 'false');
      });
  });
});
