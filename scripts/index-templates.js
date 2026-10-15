/**
 * index-templates.js
 * Template card dan status untuk konten halaman beranda.
 */

const IndexTemplates = {
  escapeHtml(value) {
    if (value === null || value === undefined) return '';

    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  articleCard(item) {
    const id = encodeURIComponent(String(item.id || ''));
    const title = this.escapeHtml(item.title);
    const image = this.escapeHtml(item.images || '');
    const tags = Array.isArray(item.tags)
      ? item.tags.map(tag => `<span class="tag">${this.escapeHtml(tag)}</span>`).join('')
      : '';

    return `
      <article class="card article-card">
        <div class="card-media">
          <img src="${image}" alt="${title}" loading="lazy">
        </div>
        <div class="card-body">
          ${tags ? `<div class="card-tags">${tags}</div>` : ''}
          <h3><a href="article-detail.html?id=${id}">${title}</a></h3>
          <p class="card-desc">${this.escapeHtml(item.description || '')}</p>
          <div class="card-footer">
            <p class="meta">Ditulis oleh <strong>${this.escapeHtml(item.author || '-')}</strong>
              &bull; ${this.escapeHtml(item.date || '')}
              ${item['reading-time'] ? `&bull; ${this.escapeHtml(item['reading-time'])} baca` : ''}
            </p>
            <a class="link-more" href="article-detail.html?id=${id}">Baca &rarr;</a>
          </div>
        </div>
      </article>
    `;
  },

  placeCard(item) {
    const id = encodeURIComponent(String(item.id || ''));
    const title = this.escapeHtml(item.title);
    const image = this.escapeHtml(item.images || '');

    return `
      <article class="card place-card">
        <div class="card-media">
          <img src="${image}" alt="${title}" loading="lazy">
          <span class="tag tag-tempat card-badge">${this.escapeHtml(item.category || 'Tempat')}</span>
        </div>
        <div class="card-body">
          <div class="place-header">
            <h3><a href="detail-tempat.html?id=${id}">${title}</a></h3>
            ${item['price-range'] ? `<span class="place-price">${this.escapeHtml(item['price-range'])}</span>` : ''}
          </div>
          <p class="place-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            ${this.escapeHtml(item.location || '-')}
          </p>
          <p class="card-desc">${this.escapeHtml(item.description || '')}</p>
          <div class="card-footer">
            <p class="meta">Ditambahkan oleh <strong>${this.escapeHtml(item.author || '-')}</strong>
              &bull; ${this.escapeHtml(item.date || '')}
            </p>
            <a class="link-more" href="detail-tempat.html?id=${id}">
              Lihat detail<span class="visually-hidden"> ${title}</span> &rarr;
            </a>
          </div>
        </div>
      </article>
    `;
  },

  discussionCard(item) {
    const id = encodeURIComponent(String(item.id || ''));
    const title = this.escapeHtml(item.title);
    const image = this.escapeHtml(item.images || '');

    return `
      <article class="card discussion-card">
        <div class="card-media">
          <img src="${image}" alt="${title}" loading="lazy">
          <span class="tag tag-diskusi card-badge">${this.escapeHtml(item['community-name'] || 'Diskusi')}</span>
        </div>
        <div class="card-body">
          <div class="community-meta">
            <span class="community-creator">Komunitas oleh
              <strong>${this.escapeHtml(item['comunity-author'] || item['community-author'] || item.author || '-')}</strong>
            </span>
          </div>
          <h3><a href="komunitas.html?id=${id}">${title}</a></h3>
          <p class="card-desc">${this.escapeHtml(item.description || '')}</p>
          <div class="card-footer">
            <p class="meta">Dimulai oleh <strong>${this.escapeHtml(item.author || '-')}</strong>
              &bull; ${this.escapeHtml(item.date || '')}
            </p>
            <a class="link-more" href="komunitas.html?id=${id}">Ikuti Diskusi &rarr;</a>
          </div>
        </div>
      </article>
    `;
  },

  stateMessage(message, state) {
    const role = state === 'error' ? 'alert' : 'status';
    return `<p class="content-state content-state-${state}" role="${role}">${this.escapeHtml(message)}</p>`;
  }
};
