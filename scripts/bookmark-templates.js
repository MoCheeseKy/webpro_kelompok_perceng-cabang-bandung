/**
 * bookmark-templates.js
 * Modul untuk menghasilkan template HTML bookmark (Artikel, Tempat, Diskusi, Kosong, Loading, Error)
 */

const BookmarkTemplates = {
  /**
   * Escape HTML untuk mencegah celah XSS
   */
  escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  /**
   * Template untuk Saved Article Card
   */
  articleCard(item) {
    const id = this.escapeHtml(item.id);
    const title = this.escapeHtml(item.title);
    const author = this.escapeHtml(item.author || '-');
    const date = this.escapeHtml(item.date || '');
    const desc = this.escapeHtml(item.description || '');
    const readTime = this.escapeHtml(item['reading-time'] || '');
    const image = this.escapeHtml(item.images || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80');

    const tagsHtml = Array.isArray(item.tags)
      ? item.tags.map((tag, idx) => {
          const accentClass = idx === 0 ? 'tag tag-accent' : 'tag';
          return `<span class="${accentClass}">${this.escapeHtml(tag)}</span>`;
        }).join('')
      : '';

    return `
      <article class="bookmark-card" data-id="${id}" data-type="saved-articles">
        <div class="bookmark-media">
          <img src="${image}" alt="${title}" loading="lazy">
        </div>
        <div class="bookmark-info">
          ${tagsHtml ? `<div class="card-tags">${tagsHtml}</div>` : ''}
          <h4><a href="article-detail.html?id=${id}">${title}</a></h4>
          <p>${desc}</p>
          <p class="bookmark-meta">Ditulis oleh <strong>${author}</strong> &bull; ${date}${readTime ? ` &bull; ${readTime} baca` : ''}</p>
        </div>
        <div class="bookmark-actions">
          <span class="bookmark-tag">Artikel</span>
          <a href="#" class="btn-hapus" data-id="${id}" data-type="saved-articles">Hapus Bookmark</a>
        </div>
      </article>
    `;
  },

  /**
   * Template untuk Saved Place Card
   */
  placeCard(item) {
    const id = this.escapeHtml(item.id);
    const title = this.escapeHtml(item.title);
    const author = this.escapeHtml(item.author || '-');
    const date = this.escapeHtml(item.date || '');
    const desc = this.escapeHtml(item.description || '');
    const location = this.escapeHtml(item.location || '-');
    const category = this.escapeHtml(item.category || '-');
    const priceRange = this.escapeHtml(item['price-range'] || '');
    const image = this.escapeHtml(item.images || 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&auto=format&fit=crop&q=80');

    return `
      <article class="bookmark-card" data-id="${id}" data-type="saved-places">
        <div class="bookmark-media">
          <img src="${image}" alt="${title}" loading="lazy">
        </div>
        <div class="bookmark-info">
          <div class="place-header">
            <h4><a href="detail-tempat.html?id=${id}">${title}</a></h4>
            ${priceRange ? `<span class="place-price">${priceRange}</span>` : ''}
          </div>
          <p class="place-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            ${location}
          </p>
          <p>${desc}</p>
          <p class="bookmark-meta">Kategori: <strong>${category}</strong> &bull; Ditambahkan oleh <strong>${author}</strong> &bull; ${date}</p>
        </div>
        <div class="bookmark-actions">
          <span class="bookmark-tag tag-tempat">Tempat</span>
          <a href="#" class="btn-hapus" data-id="${id}" data-type="saved-places">Hapus Bookmark</a>
        </div>
      </article>
    `;
  },

  /**
   * Template untuk Saved Discussion Card
   */
  discussionCard(item) {
    const id = this.escapeHtml(item.id);
    const title = this.escapeHtml(item.title);
    const author = this.escapeHtml(item.author || '-');
    const date = this.escapeHtml(item.date || '');
    const desc = this.escapeHtml(item.description || '');
    const commName = this.escapeHtml(item['community-name'] || '-');
    const commAuthor = this.escapeHtml(item['comunity-author'] || item['community-author'] || author);
    const image = this.escapeHtml(item.images || 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&auto=format&fit=crop&q=80');

    return `
      <article class="bookmark-card" data-id="${id}" data-type="saved-discussions">
        <div class="bookmark-media">
          <img src="${image}" alt="${title}" loading="lazy">
        </div>
        <div class="bookmark-info">
          <div class="community-meta">
            <span class="tag tag-diskusi">${commName}</span>
            <span class="community-creator">Komunitas oleh <strong>${commAuthor}</strong></span>
          </div>
          <h4><a href="komunitas.html?id=${id}">${title}</a></h4>
          <p>${desc}</p>
          <p class="bookmark-meta">Dimulai oleh <strong>${author}</strong> &bull; ${date}</p>
        </div>
        <div class="bookmark-actions">
          <span class="bookmark-tag tag-diskusi">Diskusi</span>
          <a href="#" class="btn-hapus" data-id="${id}" data-type="saved-discussions">Hapus Bookmark</a>
        </div>
      </article>
    `;
  },

  /**
   * Template pesan jika section kosong
   */
  emptySection(categoryName) {
    return `
      <div class="bookmark-item-empty" style="padding: 20px; text-align: center; color: var(--teks-redup); background: var(--kartu); border-radius: var(--radius); border: 1px dashed var(--abu);">
        <p style="margin: 0;">Tidak ada ${this.escapeHtml(categoryName)} tersimpan.</p>
      </div>
    `;
  },

  /**
   * Loading placeholder
   */
  loading() {
    return `
      <div class="bookmark-loading" style="padding: 24px; text-align: center; color: var(--teks-redup);">
        <p style="margin: 0;">Memuat bookmark...</p>
      </div>
    `;
  },

  /**
   * Error message placeholder
   */
  errorMessage(msg) {
    return `
      <div class="bookmark-error" style="padding: 20px; text-align: center; color: var(--merah); background: #fde8ec; border-radius: var(--radius); margin-bottom: 16px;">
        <p style="margin: 0 0 8px;"><strong>Gagal memuat data!</strong> Pastikan JSON Server berjalan di <code>http://localhost:3000</code>.</p>
        <small style="color: var(--teks-redup);">${this.escapeHtml(msg || '')}</small>
      </div>
    `;
  }
};
