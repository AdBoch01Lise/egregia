(function () {
    'use strict';

    const splash = document.getElementById('splash');
    const main = document.getElementById('main');
    const contentPanel = document.getElementById('content-panel');
    const contentBody = document.getElementById('content-body');
    const btnRetour = document.getElementById('btn-retour');
    const clockEl = document.getElementById('clock');
    const clockPanelEl = document.getElementById('clock-panel');

    const SPLASH_DURATION = 3000; // 3 seconds

    // Content
    const APROPOS_HTML = `
        <p>Nous concevons des solutions d'<strong>ingénierie patrimoniale</strong> sur mesure, pensées pour chaque famille et chaque dirigeant, qu'ils soient confrontés à des enjeux immédiats, ou engagés dans la préparation lucide de ce qui leur survivra.</p>
        <p>Nous formulons une proposition distinctive, centrée sur l'opportunité stratégique et la vision de long terme, où chaque décision est envisagée avec discernement, dans son contexte, son équilibre et sa portée future.</p>
        <p class="dash">—</p>
        <p>Indépendance d'analyse. Sans suffisance. Sans carcan. Radicalement agile.</p>
    `;

    const CREDO_HTML = `
        <p><strong>Egregia.</strong></p>
        <p>Du latin <em>egregius</em> : ce qui se tient hors du troupeau. Non par éclat, mais par élévation. Ce qui se distingue par la rigueur de sa pensée et sa tenue dans le temps.</p>
        <p>Nous avons retenu le féminin singulier, Egregia. Il ne qualifie pas un individu. Il nomme l'œuvre : ce qui est conçu pour être ordonné et transmis, indépendamment de toute figure personnelle.</p>
        <p>Car ce qui distingue durablement n'est jamais l'acteur, mais la forme qu'il institue, celle dans laquelle son action s'inscrit et se prolonge.</p>
        <p>C'est ce même souci de prolongement que nous appliquons au quotidien, en donnant forme à des architectures patrimoniales sur-mesure, cohérentes et opérantes, pensées pour chaque famille et chaque dirigeant, qu'ils soient confrontés à des enjeux juridiques, fiscaux ou financiers immédiats, ou engagés dans la préparation lucide de ce qui leur survivra.</p>
        <p>Dans un environnement dominé par les stratégies réflexes, les promesses standardisées et les solutions interchangeables, nous faisons le choix d'une autre voie : moins visible, moins immédiate, mais plus exigeante.</p>
        <p>Notre positionnement est volontairement minimaliste, silencieux, presque opaque. Il ne relève pas d'un parti pris d'image, mais d'une nécessité de méthode : préserver la qualité de l'analyse et des propositions, créer les conditions d'un travail rigoureux et utile, au service de l'intérêt de nos clients.</p>
        <p>Cette discipline réaffirme notre rejet des approches fondées sur l'ostentation, le volume ou toute forme de captation organisée. Les relations que nous établissons se nouent ainsi par reconnaissance, par recommandation ou par circonstances, par affinité de rigueur et de vision, jamais par le bruit ni par la mise en scène de soi.</p>
        <p>C'est dans ces situations choisies que notre expertise trouve sa pleine portée. Là où le patrimoine cesse d'être un simple agrégat d'actifs et de passifs pour devenir une matière sensible, chargée de tensions, d'arbitrages et de responsabilités, lorsque les décisions engagent plus qu'un présent, non seulement une vie, mais des générations, et appellent discrétion et discernement.</p>
        <p>Devant cet horizon, nous donnons au complexe des lignes lisibles, et à l'incertain des trajectoires maîtrisées, guidés par la précision, la clarté et une hauteur de regard. Dans l'épaisseur des règles, des chiffres et des contraintes, nous ramenons l'attention sur l'essentiel :</p>
        <p>Ce qui doit être structuré.<br>Ce qui doit être transmis.<br>Ce qui doit durer.</p>
        <p>C'est dans cette fidélité à l'œuvre et dans cette continuité que s'accomplit l'action d'Egregia.</p>
    `;

    function updateClock() {
        const now = new Date();
        const time = now.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        if (clockEl) clockEl.textContent = time;
        if (clockPanelEl) clockPanelEl.textContent = time;
    }

    const contentCenter = document.querySelector('.layout-center-scroll');

    function updateScrollFade() {
        if (!contentCenter) return;
        const { scrollTop, scrollHeight, clientHeight } = contentCenter;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 2;
        contentCenter.classList.toggle('has-more-content', !atBottom);
    }

    function openPage(page) {
        if (page === 'apropos') {
            contentBody.innerHTML = APROPOS_HTML;
        } else if (page === 'credo') {
            contentBody.innerHTML = CREDO_HTML;
        }
        contentPanel.classList.add('active');
        document.body.classList.add('panel-open');
        if (contentCenter) {
            contentCenter.scrollTop = 0;
            contentCenter.addEventListener('scroll', updateScrollFade);
            setTimeout(updateScrollFade, 50);
        }
    }

    function closePage() {
        contentPanel.classList.remove('active');
        document.body.classList.remove('panel-open');
        if (contentCenter) {
            contentCenter.removeEventListener('scroll', updateScrollFade);
        }
    }

    // Splash: show for a few seconds, then fade out and reveal main
    setTimeout(function () {
        splash.classList.add('fade-out');
        main.classList.add('visible');
        setTimeout(function () {
            splash.style.display = 'none';
        }, 800);
    }, SPLASH_DURATION);

    // Clock
    updateClock();
    setInterval(updateClock, 1000);

    // Nav: À propos, Credo
    document.querySelectorAll('.nav-link[data-page]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const page = this.getAttribute('data-page');
            openPage(page);
        });
    });

    // Retour
    if (btnRetour) {
        btnRetour.addEventListener('click', closePage);
    }

    // Esc to close
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && contentPanel.classList.contains('active')) {
            closePage();
        }
    });

    window.addEventListener('resize', function () {
        if (contentPanel.classList.contains('active') && contentCenter) {
            updateScrollFade();
        }
    });
})();
