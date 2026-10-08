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
        <p>Nous concevons des solutions d'<strong>ingénierie patrimoniale</strong>, pensées pour chaque famille et chaque dirigeant, qu'ils soient confrontés à des enjeux <button type="button" class="reveal" aria-label="juridiques, fiscaux, financiers"><span class="reveal-dot" aria-hidden="true"></span><span class="reveal-text">(juridiques, fiscaux, financiers)</span></button> immédiats, ou engagés dans la préparation lucide de ce qui leur survivra.</p>
        <p class="dash">–</p>
        <p>Approche distinctive. Analyse indépendante. Sans suffisance. Sans carcan. Radicalement agile</p>
    `;

    const CREDO_HTML = `
        <p>Du latin <em>egregius</em> : ce qui se tient hors du troupeau. Non par éclat, mais par élévation. Ce qui se distingue par la rigueur de sa pensée et sa tenue dans le temps.</p>
        <p>Nous avons retenu le féminin singulier, Egregia. Il ne qualifie pas un individu, ne célèbre aucun visage, n'attache aucun nom.</p>
        <p>Il nomme l'œuvre : ce qui est conçu pour être ordonné et transmis, indépendamment de toute figure personnelle.</p>
        <p>Car ce qui distingue durablement n'est jamais l'acteur, mais la forme qu'il institue, celle dans laquelle son action s'inscrit et se prolonge.</p>
        <p>Dans un environnement saturé <button type="button" class="reveal" aria-label="de promesses standardisées, de stratégies réflexes, de solutions interchangeables"><span class="reveal-dot" aria-hidden="true"></span><span class="reveal-text">(de promesses standardisées, de stratégies réflexes, de solutions interchangeables)</span></button>, nous avons préféré une voie plus étroite.<br>Moins visible.<br>Moins immédiate.<br>Mais infiniment plus exigeante.</p>
        <p>Notre positionnement en retrait ne relève pas d'un parti pris d'image, mais d'une nécessité de méthode.<br>Refuser la dispersion.<br>Garantir le temps d'une écoute véritable.<br>Laisser à l’analyse l’espace pour se déployer.<br>Ne livrer que des propositions mûries, éprouvées, cohérentes.</p>
        <p>Nous nous tenons ainsi à distance des modèles fondés sur l’ostentation, le volume ou la captation organisée.<br>Nos relations naissent autrement :<br>d’une reconnaissance,<br>d’une recommandation,<br>et parfois d’une convergence naturelle des circonstances.</p>
        <p>Elles ne doivent rien au bruit.<br>Rien à la mise en scène.</p>
        <p>C’est dans ces situations choisies que notre expertise atteint sa pleine portée.<br>Il ne s’agit pas seulement d’optimiser un présent,<br>mais d’orienter une trajectoire par des décisions qui engagent un devenir inscrit dans le temps long,<br>souvent à l’échelle de plusieurs générations.</p>
        <p>Alors le patrimoine change de nature.<br>Il cesse d’être un simple agrégat d’actifs et de passifs,<br>et devient une matière sensible, traversée de tensions, d’arbitrages et de responsabilités.<br>Une matière qui exige discernement et mesure.</p>
        <p>Au cœur de cette épaisseur <button type="button" class="reveal" aria-label="des règles, des chiffres, des contraintes, des arbitrages"><span class="reveal-dot" aria-hidden="true"></span><span class="reveal-text">(des règles, des chiffres, des contraintes, des arbitrages)</span></button>, nous ramenons inlassablement l’attention vers l’essentiel :</p>
        <p>Ce qui doit être structuré.<br>Ce qui doit être transmis.<br>Ce qui doit durer.</p>
        <p>Le reste s'efface.<br>L’œuvre demeure.</p>
        <p>Et c’est dans cette fidélité, que s’accomplit notre action.</p>
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

    // Bullet reveal (tap on mobile)
    contentBody.addEventListener('click', function (e) {
        const reveal = e.target.closest('.reveal');
        if (reveal) reveal.classList.toggle('open');
    });

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
