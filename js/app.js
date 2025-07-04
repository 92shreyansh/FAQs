document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch enriched YAML
    const response = await fetch('data/faqs.yaml');
    const yamlText = await response.text();
    const faqs = window.jsyaml.load(yamlText);
    faqs.forEach((faq, i) => faq.id = i); // assign unique id

    // Build Fuse.js index
    const fuse = new Fuse(faqs, {
      keys: ['question', 'answer', 'tags'],
      threshold: 0.35,
      includeScore: true,
      ignoreLocation: true
    });

    const searchInput = document.getElementById('tagSearch');
    const accordion = document.getElementById('faqAccordion');
    let resultCount = document.getElementById('resultCount');
    if (!resultCount) {
      resultCount = document.createElement('div');
      resultCount.id = 'resultCount';
      resultCount.className = 'small text-muted mt-1 mb-2';
      searchInput.insertAdjacentElement('afterend', resultCount);
    }
    const TOTAL = faqs.length;

    // Highlight match in question
    const highlight = (text, query) => {
      if (!query) return text;
      const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
      return text.replace(re, '<mark>$1</mark>');
    };

    // Render accordion
    const render = (list, query) => {
      accordion.innerHTML = '';
      if (!list.length) {
        accordion.innerHTML = '<div class="alert alert-warning text-center">No FAQs match your query.</div>';
        resultCount.textContent = `Showing 0 of ${TOTAL} FAQs`;
        return;
      }
      resultCount.textContent = `Showing ${list.length} of ${TOTAL} FAQs`;
      list.forEach((faq, i) => {
        const tags = faq.tags && Array.isArray(faq.tags) ? faq.tags.map(tag => `<span class="badge me-1">${tag}</span>`).join('') : '';
        const qHtml = highlight(faq.question, query);
        accordion.innerHTML += `
          <div class="accordion-item">
            <h2 class="accordion-header" id="heading${faq.id}">
              <button class="accordion-button collapsed d-flex align-items-center justify-content-between gap-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${faq.id}" aria-expanded="false" aria-controls="collapse${faq.id}">
                <span>${qHtml}</span>
                <span>${tags}</span>
              </button>
            </h2>
            <div id="collapse${faq.id}" class="accordion-collapse collapse" aria-labelledby="heading${faq.id}" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                ${window.marked ? window.marked.parse(faq.answer) : faq.answer.replace(/\n/g,'<br>')}
              </div>
            </div>
          </div>
        `;
      });
    };

    // Search handler
    const doSearch = (query) => {
      const q = query.trim();
      if (!q) {
        render(faqs, '');
        return;
      }
      const res = fuse.search(q);
      render(res.map(r => r.item), q);
    };

    // Initial render
    render(faqs, '');

    // Input event
    searchInput.addEventListener('input', e => doSearch(e.target.value));
  } catch (err) {
    console.error('Error loading or parsing faqs.yaml:', err);
    alert('Failed to load FAQs. Please check the console for details.');
  }
});
