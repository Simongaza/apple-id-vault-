(function () {
    'use strict';

    // --- Elements ---
    var nav = document.getElementById('templatemo-nav');
    var navToggle = document.getElementById('navToggle');
    var navLinks = document.getElementById('navLinks');
    var navItems = document.querySelectorAll('.nav-links a');
    var sections = document.querySelectorAll('.parallax-section');
    var parallaxBgs = document.querySelectorAll('.parallax-bg');

    // --- 1. THE FALLING APPS ENGINE ---
    // This part injects the moving games into your template columns automatically
    function initFallingApps() {
        const columns = document.querySelectorAll('.app-col');
        const gameIcons = [
            "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png",
            "https://upload.wikimedia.org/wikipedia/en/c/c7/GTASAnAndreas.jpg",
            "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png",
            "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/91/31/31/9131313d-513b-9e45-12b4-7b8979d39e80/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
            "https://upload.wikimedia.org/wikipedia/en/b/b1/Hitman_Sniper_Cover.png"
        ];

        columns.forEach((col, index) => {
            // Mix up the order for each column
            let mixedGames = [...gameIcons].sort(() => 0.5 - Math.random());
            // Double them for a seamless loop
            let fullList = [...mixedGames, ...mixedGames]; 
            
            fullList.forEach(src => {
                let img = document.createElement('img');
                img.src = src;
                img.loading = "lazy";
                col.appendChild(img);
            });
            
            // Give each column a different speed
            col.style.animationDuration = (12 + (index * 4)) + "s";
        });
    }

    // --- Detect mobile ---
    var isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
                   || window.innerWidth <= 768;

    // --- 2. SMOOTH PARALLAX ENGINE (Modified for Vault) ---
    var ticking = false;

    function updateParallax() {
        if (isMobile) return;
        var windowHeight = window.innerHeight;

        parallaxBgs.forEach(function (bg) {
            var rect = bg.parentElement.getBoundingClientRect();
            if (rect.bottom < -300 || rect.top > windowHeight + 300) return;

            var speed = parseFloat(bg.getAttribute('data-speed')) || 0.4;
            var offset = (rect.top + rect.height / 2) - (windowHeight / 2);
            var normalized = Math.max(-1, Math.min(1, offset / (windowHeight + rect.height / 2)));
            var translateY = normalized * (windowHeight * speed);

            bg.style.transform = 'translate3d(0,' + translateY.toFixed(1) + 'px,0)';
        });
        ticking = false;
    }

    // --- Event Listeners ---
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
        // Nav Background Effect
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    }, { passive: true });

    // --- Initialization ---
    document.addEventListener('DOMContentLoaded', function() {
        initFallingApps();
        if (!isMobile) updateParallax();
    });

    // Mobile Toggle
    if(navToggle) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
    }

})();
