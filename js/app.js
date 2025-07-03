document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('data/faqs.yaml');
    const yamlText = await response.text();
    const faqs = window.jsyaml.load(yamlText);

    const searchInput = document.getElementById('tagSearch');
    const accordion = document.getElementById('faqAccordion');

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
        accordion.innerHTML = '<div class="text-center text-muted">No matches found</div>';
        return;
      }
      list.forEach((faq, i) => {
        const tags = faq.tags.map(tag => `<span class="badge me-1">${tag}</span>`).join('');
        const qHtml = highlight(faq.question, query);
        accordion.innerHTML += `
          <div class="accordion-item">
            <h2 class="accordion-header" id="heading${i}">
              <button class="accordion-button collapsed d-flex align-items-center justify-content-between gap-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                <span>${qHtml}</span>
                <span>${tags}</span>
              </button>
            </h2>
            <div id="collapse${i}" class="accordion-collapse collapse" aria-labelledby="heading${i}" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                ${window.marked ? window.marked.parse(faq.answer) : faq.answer.replace(/\n/g,'<br>')}
              </div>
            </div>
          </div>
        `;
      });
    };

    // Filter function
    const filter = (query) => {
      const q = query.toLowerCase().trim();
      return faqs.filter(faq =>
        faq.question.toLowerCase().includes(q) ||
        faq.tags.some(tag => tag.toLowerCase().includes(q))
      );
    };

    // Initial render
    render(faqs, '');

    // Search handler
    searchInput.addEventListener('input', e => {
      const val = e.target.value;
      render(filter(val), val);
    });
  } catch (err) {
    console.error('Error loading or parsing faqs.yaml:', err);
    alert('Failed to load FAQs. Please check the console for details.');
  }
});
