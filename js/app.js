// ===== Load Projects from JSON =====
let projects = [];
let tutorials = [];
let boards = [];
let components = [];

// ===== Fetch Data =====
async function loadData() {
    try {
        const response = await fetch('projects.json');
        const data = await response.json();
        projects = data.projects || [];
        tutorials = data.tutorials || [];
        boards = data.boards || [];
        components = data.components || [];
        
        renderAll();
    } catch (error) {
        console.error('Error loading data:', error);
        // Fallback with sample data
        loadFallbackData();
    }
}

function loadFallbackData() {
    // Will be filled from projects.json
    console.log('Using fallback data');
}

// ===== Render Everything =====
function renderAll() {
    renderFeaturedProjects();
    renderAllProjects();
    renderTutorials();
    renderBoards();
    renderComponents();
    updateStats();
    setupSearch();
}

// ===== Render Featured Projects =====
function renderFeaturedProjects() {
    const container = document.getElementById('featuredProjects');
    if (!container) return;
    
    const featured = projects.slice(0, 4);
    container.innerHTML = featured.map(project => `
        <div class="project-card" onclick="window.location.href='projects/${project.id}.html'">
            <div class="card-content">
                <span class="project-icon">${project.image || '📦'}</span>
                <h3 class="project-title">${project.name}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-meta">
                    <span class="tag">${project.difficulty}</span>
                    <span class="tag">${project.cost}</span>
                    <span class="tag">${project.buildTime}</span>
                </div>
                <div class="project-boards">
                    ${project.boards.map(b => `<span class="board-tag">${b}</span>`).join('')}
                </div>
                <span class="view-project">View Project</span>
            </div>
        </div>
    `).join('');
}

// ===== Render All Projects =====
function renderAllProjects() {
    const container = document.getElementById('allProjects');
    if (!container) return;
    
    container.innerHTML = projects.map(project => `
        <div class="project-card" onclick="window.location.href='projects/${project.id}.html'">
            <div class="card-content">
                <span class="project-icon">${project.image || '📦'}</span>
                <h3 class="project-title">${project.name}</h3>
                <p class="project-description">${project.description.substring(0, 120)}...</p>
                <div class="project-meta">
                    <span class="tag">${project.difficulty}</span>
                    <span class="tag">${project.cost}</span>
                    <span class="tag">${project.buildTime}</span>
                    <span class="tag">${project.category}</span>
                </div>
                <div class="project-boards">
                    ${project.boards.map(b => `<span class="board-tag">${b}</span>`).join('')}
                </div>
                <span class="view-project">View Project →</span>
            </div>
        </div>
    `).join('');
}

// ===== Render Tutorials =====
function renderTutorials() {
    const container = document.getElementById('tutorialsList');
    if (!container) return;
    
    container.innerHTML = tutorials.map(tutorial => `
        <div class="tutorial-card">
            <div class="tutorial-icon">${tutorial.icon || '📘'}</div>
            <h3>${tutorial.title}</h3>
            <p>${tutorial.description}</p>
            <a href="${tutorial.link || '#'}" style="display:inline-block;margin-top:1rem;font-weight:600;">Read Tutorial →</a>
        </div>
    `).join('');
}

// ===== Render Boards =====
function renderBoards() {
    const container = document.getElementById('boardsList');
    if (!container) return;
    
    container.innerHTML = boards.map(board => `
        <div class="board-card">
            <div class="board-icon">${board.icon || '🔌'}</div>
            <h4>${board.name}</h4>
            <span class="board-status">${board.status || 'Stable'}</span>
            <div style="margin-top:1rem;display:flex;gap:0.8rem;justify-content:center;flex-wrap:wrap;">
                <a href="${board.documentation || '#'}" style="font-size:0.9rem;">Docs</a>
                <a href="${board.download || '#'}" style="font-size:0.9rem;">Download</a>
                <a href="${board.github || '#'}" style="font-size:0.9rem;">GitHub</a>
            </div>
        </div>
    `).join('');
}

// ===== Render Components =====
function renderComponents() {
    const container = document.getElementById('componentsList');
    if (!container) return;
    
    container.innerHTML = components.map(component => `
        <span class="component-tag">${component}</span>
    `).join('');
}

// ===== Update Stats =====
function updateStats() {
    document.getElementById('projectCount').textContent = projects.length;
    document.getElementById('boardCount').textContent = boards.length;
    document.getElementById('componentCount').textContent = components.length;
    document.getElementById('tutorialCount').textContent = tutorials.length;
}

// ===== Search =====
function setupSearch() {
    const input = document.getElementById('searchInput');
    const btn = document.getElementById('searchBtn');
    
    function performSearch() {
        const query = input.value.toLowerCase().trim();
        if (!query) {
            renderAllProjects();
            return;
        }
        
        const filtered = projects.filter(p => 
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.boards.some(b => b.toLowerCase().includes(query)) ||
            p.components.some(c => c.toLowerCase().includes(query)) ||
            p.category.toLowerCase().includes(query)
        );
        
        const container = document.getElementById('allProjects');
        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="grid-column:1/-1;text-align:center;padding:4rem;">
                    <h3 style="font-size:2rem;margin-bottom:1rem;">🔍 No results found</h3>
                    <p style="color:var(--text-secondary);font-size:1.2rem;">Try searching for a different keyword</p>
                </div>
            `;
        } else {
            container.innerHTML = filtered.map(project => `
                <div class="project-card" onclick="window.location.href='projects/${project.id}.html'">
                    <div class="card-content">
                        <span class="project-icon">${project.image || '📦'}</span>
                        <h3 class="project-title">${project.name}</h3>
                        <p class="project-description">${project.description.substring(0, 120)}...</p>
                        <div class="project-meta">
                            <span class="tag">${project.difficulty}</span>
                            <span class="tag">${project.cost}</span>
                            <span class="tag">${project.buildTime}</span>
                            <span class="tag">${project.category}</span>
                        </div>
                        <div class="project-boards">
                            ${project.boards.map(b => `<span class="board-tag">${b}</span>`).join('')}
                        </div>
                        <span class="view-project">View Project →</span>
                    </div>
                </div>
            `).join('');
        }
    }
    
    btn.addEventListener('click', performSearch);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
}

// ===== Mobile Menu =====
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('menuToggle');
    const nav = document.querySelector('.main-nav');
    
    if (toggle && nav) {
        toggle.addEventListener('click', function() {
            if (nav.style.display === 'flex') {
                nav.style.display = 'none';
            } else {
                nav.style.display = 'flex';
                nav.style.flexDirection = 'column';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.right = '0';
                nav.style.background = 'var(--bg-primary)';
                nav.style.padding = '2rem';
                nav.style.gap = '1.5rem';
                nav.style.borderBottom = '1px solid var(--border-color)';
            }
        });
    }
    
    // Load data
    loadData();
});
