document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SELECCIÓN DE ELEMENTOS GLOBALES ---
    const heroSection = document.getElementById('inicio');
    const aboutSection = document.getElementById('sobre-mi');
    const categoriesView = document.getElementById('categories-view');
    const navbar = document.querySelector('.navbar');
    
    // Altura del menú para el scroll
    const navHeight = navbar ? navbar.offsetHeight : 0;

    // --- 2. LÓGICA DE PESTAÑAS (TABS) ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const projectGrids = document.querySelectorAll('.projects-grid');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Quitar 'active' de todas las pestañas
            tabButtons.forEach(b => b.classList.remove('active'));
            // Activar la pulsada
            btn.classList.add('active');

            // Ocultar todas las rejillas
            projectGrids.forEach(grid => grid.classList.remove('active-grid'));

            // Mostrar la rejilla correspondiente
            const gridToShowId = btn.getAttribute('data-tab');
            const gridToShow = document.getElementById(gridToShowId);
            if (gridToShow) {
                gridToShow.classList.add('active-grid');
            }
        });
    });

    // --- 3. ABRIR UN PROYECTO (Desde las miniaturas) ---
    // Seleccionamos cualquier elemento que tenga la clase .view-btn
    const viewButtons = document.querySelectorAll('.view-btn');

    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Ocultar la vista principal
                heroSection.classList.add('hidden');
                aboutSection.classList.add('hidden');
                categoriesView.classList.add('hidden');
                
                // Mostrar el proyecto
                targetSection.classList.remove('hidden');

                // Scroll arriba instantáneo
                window.scrollTo({ top: 0, behavior: 'instant' });
            } else {
                console.error('No se encontró la sección con ID:', targetId);
            }
        });
    });

    // --- 4. BOTÓN "NEXT PROJECT" (Navegar entre proyectos) ---
    const nextButtons = document.querySelectorAll('.btn-next');

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Identificar el proyecto actual (padre del botón)
            const currentSection = button.closest('.project-details-view');
            
            // 2. Identificar el siguiente proyecto
            const nextTargetId = button.getAttribute('data-next');
            const nextSection = document.getElementById(nextTargetId);

            if (nextSection) {
                // Ocultar actual, mostrar siguiente
                currentSection.classList.add('hidden');
                nextSection.classList.remove('hidden');
                
                // Scroll suave arriba
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                console.warn('El botón Next apunta a un ID que no existe:', nextTargetId);
            }
        });
    });

    // --- 5. BOTÓN "GO BACK" (Volver al menú) ---
    const backButtons = document.querySelectorAll('.btn-back');

    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            resetToMainView();
            
            // Scroll suave a la zona de categorías
            // (Para que no te deje arriba del todo en la portada)
            const galeriaSection = document.getElementById('categories-view'); // O 'galeria' si usaste ese ID
            if(galeriaSection) {
                 // Ajuste: un poco más arriba para ver las pestañas
                const offset = galeriaSection.offsetTop - 150; 
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 6. MENÚ DE NAVEGACIÓN (Resetear vista al pulsar Home/Portfolio) ---
    const navLinks = document.querySelectorAll('.menu-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            resetToMainView();
            // No hacemos scroll manual, el ancla href="#id" lo hará
        });
    });

    // --- FUNCIÓN AUXILIAR: RESETEAR TODO ---
    function resetToMainView() {
        // Ocultar todos los proyectos abiertos
        document.querySelectorAll('.project-details-view').forEach(section => {
            section.classList.add('hidden');
        });

        // Mostrar estructura principal
        if(categoriesView) categoriesView.classList.remove('hidden');
        if(heroSection) heroSection.classList.remove('hidden');
        if(aboutSection) aboutSection.classList.remove('hidden');
    }

});