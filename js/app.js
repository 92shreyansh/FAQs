document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data/dataset.yaml');
        const yamlText = await response.text();
        const data = jsyaml.load(yamlText);

        const resultsContainer = document.getElementById('results');
        const searchInput = document.getElementById('tagSearch');

        const renderCard = (item) => {
            const col = document.createElement('div');
            col.className = 'col-md-4 mb-4';
            
            const tagsHtml = item.tags
                .map(tag => `<span class="tag badge bg-secondary me-1">${tag}</span>`)
                .join('');

            col.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">${item.description}</p>
                        <div class="card-tags mt-3">
                            ${tagsHtml}
                        </div>
                    </div>
                </div>
            `;
            return col;
        };

        const renderItems = (items) => {
            resultsContainer.innerHTML = '';
            if (items.length === 0) {
                resultsContainer.innerHTML = '<div class="col-12 text-center">No matches found</div>';
                return;
            }
            items.forEach(item => {
                resultsContainer.appendChild(renderCard(item));
            });
        };

        const filterItems = (query) => {
            const normalizedQuery = query.toLowerCase().trim();
            return data.filter(item =>
                item.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
            );
        };

        // Initial render
        renderItems(data);

        // Search handler
        searchInput.addEventListener('input', (e) => {
            const filteredItems = filterItems(e.target.value);
            renderItems(filteredItems);
        });

    } catch (error) {
        console.error('Error loading or parsing YAML:', error);
        alert('Failed to load data. Please check the console for details.');
    }
});
