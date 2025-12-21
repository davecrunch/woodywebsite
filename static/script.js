// Smooth scroll for internal links
document.addEventListener('DOMContentLoaded', () => {
	const anchorLinks = document.querySelectorAll('a[href^="#"]');
	anchorLinks.forEach(link => {
		link.addEventListener('click', (e) => {
			const target = document.querySelector(link.getAttribute('href'));
			if (target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth' });
			}
		});
	});
});
// Gallery modal + carousel
document.addEventListener('DOMContentLoaded', () => {
	const modalOverlay = document.getElementById('gallery-modal');
	if (!modalOverlay) return; // only run on gallery page

    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
	const modalImage = document.getElementById('modal-image');
    const modalVideo = document.getElementById('modal-video');
	const modalTitle = document.getElementById('modal-title');
	const modalDescription = document.getElementById('modal-description');
	const modalLink = document.getElementById('modal-link');
	const btnClose = modalOverlay.querySelector('.close');
	const btnPrev = modalOverlay.querySelector('.prev');
	const btnNext = modalOverlay.querySelector('.next');

	// Minimal placeholder projects with a few images each
    // fading tides / LG / buddy bot / ad? / hp7 / 313 langchain / database duolingo / scotch / swagvlogs / work (frutful / recording services / pho?)
	const projects = [
		{
			title: 'Lunar Gala',
			description: 'Sound Design and Production for Joie de Vivre, fashion line at Lunar Gala 2026 (In progress)',
			link: 'https://www.lunargala.org/',
			images: [
				'https://picsum.photos/seed/p1a/1200/900',
				'https://picsum.photos/seed/p1b/1200/900'
			]
		},
		{
			title: 'Fading Tides',
			description: 'Short Film w/ Rylee Stanton, Original Music Compostion and Recording by Woody Li',
			link: 'https://drive.google.com/file/d/1U2TZFXkN-wB0jgqZsQnp7h0cpLMVNlhB/view?usp=drive_link',
			images: [
				{type: "image", src: "../static/pics/fading/4.png"},
				{type: "image", src: "../static/pics/fading/1.png"},
				{type: "image", src: "../static/pics/fading/2.png"},
				{type: "image", src: "../static/pics/fading/3.png"},
			]
		},
		{
			title: 'BuddyBot',
			description: 'Short Film w/ Anastasia Ramirez, Original Music Compostion and Recording by Woody Li',
			link: 'https://www.youtube.com/watch?v=_e9SgOSqp10',
			images: [
				{type: "image", src: "../static/pics/buddy/3.png"},
				{type: "image", src: "../static/pics/buddy/1.png"},
				{type: "image", src: "../static/pics/buddy/2.png"},
				{type: "image", src: "../static/pics/buddy/4.png"},
			]
		},
        {
			title: 'HalfPast7',
			description: 'Classic / Indie Rock Band based in Pittsburgh, PA. I play bass',
			link: 'https://www.instagram.com/halfpast7band/',
			images: [
				{type: "image", src: "../static/pics/hp73.JPG"},
				{type: "image", src: "../static/pics/hp77.JPG"},
				{type: "image", src: "../static/pics/hp71.JPG"},
                {type: "image", src: "../static/pics/hp75.JPG"},
                {type: "image", src: "../static/pics/hp78.JPG"},
                {type: "image", src: "../static/pics/hp74.JPG"},
				{type: "image", src: "../static/pics/hp72.JPG"},
			]
		},
        {
			title: 'SwagVlogs',
			description: 'Vlogs and fun videos with my two best friends',
			link: 'https://youtube.com/playlist?list=PL-E7_ED43IO6F3tDrD04z-T9WJOSI1vvm&si=LkqJ2E4AgjMnhHXE',
			images: [
                { type: "image", src: "../static/pics/swag8.JPG" },
                { type: "image", src: "../static/pics/swag5.JPG" },
                { type: "image", src: "../static/pics/swag2.JPG" },
                { type: "image", src: "../static/pics/swag6.JPG" },
                { type: "image", src: "../static/pics/swag10.JPG" },
                { type: "image", src: "../static/pics/swag11.JPG" },
                { type: "image", src: "../static/pics/swag4.JPG" },
            ]

		},
        {
			title: "Scotch'n'Soda",
			description: 'Pit orchestra performer / Sound tech for student theater group at CMU. Performed in / produced for shows like The Little Mermaid and Oklahoma.',
			link: 'https://www.snstheatre.org/',
			images: [
				{type: "image", src: "../static/pics/sns/1.JPG"},
				{type: "image", src: "../static/pics/sns/4.JPG"},
				{type: "image", src: "../static/pics/sns/2.jpeg"},
				{type: "image", src: "../static/pics/sns/3.jpeg"},
			]
		},

        // langchain / duolingo / duquense web / voltx database / ICM / DHCS bakeoff 3 / 122 / 112
		{
			title: 'Langchain Open Source (In progress)',
			description: 'Contribution to the Langchain open-source AI project with bug fixes - 17313 Foundations of Software Engineering Final Team Project',
			link: 'https://github.com/langchain-ai/langchain/pull/33989',
			images: [
				{type: "image", src: "../static/pics/tech/langchain.JPEG"},
				{type: "image", src: "../static/pics/tech/langchain2.png"}
			]
		},
		{
			title: 'Database Lifecycle Project',
			description: 'Recreating Duolingo\'s database schema from user stories to physical models to queries, using PostgreSQL - 67262 Database Design and Development Final Project',
			link: 'https://github.com/davecrunch/Database-Project-262',
			images: [
				{type: "image", src: "../static/pics/tech/duolingo.jpg"},
				{type: "image", src: "../static/pics/tech/database.png"}
			]
		},
		{
			title: 'Duquesne Incline Web Development',
			description: 'Building an updated and interactive website for Pittsburgh\'s historic Duquesne Incline - 67250 Information Systems Milleux Web Dev Project',
			link: 'https://davecrunch.github.io/DuquesneIncline/',
			images: [
				{type: "image", src: "../static/pics/tech/logo.png"},
				{type: "image", src: "../static/pics/tech/duquesne2.png"},
				{type: "image", src: "../static/pics/tech/duquesne3.png"}
			]
		},
        {
			title: 'VoltX Database Project',
			description: 'Database Query and Reporting for VoltX EV Scenario - 67250 Information Systems Milleux Database Project',
			images: [
				'https://picsum.photos/seed/t1a/1200/900',
				'https://picsum.photos/seed/t1b/1200/900'
			]
		},
        {
			title: 'Computer Music Composition',
			description: 'Computer music composition using Nyquist - 15322 Intro to Computer Music Final Project',
			link: '#',
			images: [
				'https://picsum.photos/seed/t1a/1200/900',
				'https://picsum.photos/seed/t1b/1200/900'
			]
		},
        {
			title: 'Human Centered Software Design Bakeoff',
			description: 'Desigining, Coding, and Testing solutions to a button clicking task for maximum efficiency - 05391 Designing Human Centered Software Team Project',
			link: '#',
			images: [
				'https://picsum.photos/seed/t1a/1200/900',
				'https://picsum.photos/seed/t1b/1200/900'
			]
		},
        {
			title: 'Selection Sort Algorithm Visualization',
			description: 'Coding a visualization of the selection sort algorithm in Python - 15112 Fundamentals of Programming Final Project',
			link: 'https://drive.google.com/file/d/1l7giDqlEtAsypB7GlmJ4rbpJJVP_76Ha/view?usp=drive_link',
			images: [
				{type: "image", src: "../static/pics/tech/112.png"},
			]
		},
	];

	let currentProject = null;
	let currentImageIndex = 0;

	const openModal = (projectIndex) => {
		currentProject = projects[projectIndex];
		currentImageIndex = 0;
        showMedia(0);
		//modalImage.src = currentProject.images[currentImageIndex];
		modalTitle.textContent = currentProject.title;
		modalDescription.textContent = currentProject.description;
		modalLink.href = currentProject.link;
		modalOverlay.classList.add('open');
		document.body.style.overflow = 'hidden';
		modalOverlay.setAttribute('aria-hidden', 'false');
	};

	const closeModal = () => {
        modalOverlay.classList.remove('open');
        document.body.style.overflow = '';
        modalOverlay.setAttribute('aria-hidden', 'true');
        currentProject = null;
        currentImageIndex = 0;

        // Stop and reset video
        if (modalVideo) {
            modalVideo.pause();       // stop playback
            modalVideo.currentTime = 0; // reset to start
            modalVideo.src = "";      // clear source to stop download/stream
            modalVideo.style.display = "none"; // hide video element
        }
        
        // Also hide the image just in case
        if (modalImage) {
            modalImage.style.display = "block"; // optional default
            modalImage.src = "";
        }
    };


	const showMedia = (index) => {
        if (!currentProject) return;

        currentImageIndex = (index + currentProject.images.length) % currentProject.images.length;
        const media = currentProject.images[currentImageIndex];

        if (media.type === "video") {
            modalImage.style.display = "none";
            modalImage.src = "";

            modalVideo.src = media.src;
            modalVideo.style.display = "block";

            // ensure settings
            modalVideo.loop = true;
            modalVideo.playsInline = true;

            // autoplay AFTER the src is set
            modalVideo.play().catch(() => {
            // If browser blocks autoplay (rare b/c muted)
            console.log("Autoplay blocked");
            });

        } else {    
            // If switching off video → stop and clear it
            modalVideo.pause();
            modalVideo.src = "";
            modalVideo.style.display = "none";

            modalImage.src = media.src;
            modalImage.style.display = "block";
        }
};



	// click handlers for gallery items
	const galleryItems = document.querySelectorAll('.gallery-item');
	galleryItems.forEach(item => {
		item.addEventListener('click', () => {
			const projectIndex = parseInt(item.getAttribute('data-project-index')) || 0;
			openModal(projectIndex);
		});
	});

	btnClose.addEventListener('click', closeModal);
	btnPrev.addEventListener('click', () => showMedia(currentImageIndex - 1));
	btnNext.addEventListener('click', () => showMedia(currentImageIndex + 1));

	modalOverlay.addEventListener('click', (e) => {
		if (e.target === modalOverlay) closeModal();
	});

	document.addEventListener('keydown', (e) => {
		if (!currentProject) return;
		if (e.key === 'Escape') closeModal();
		if (e.key === 'ArrowLeft') showMedia(currentImageIndex - 1);
		if (e.key === 'ArrowRight') showMedia(currentImageIndex + 1);
	});
});

// Technical panel toggle
document.addEventListener('DOMContentLoaded', () => {
	const techToggle = document.getElementById('tech-toggle');
	const techPanel = document.getElementById('tech-panel');
	const techClose = document.getElementById('tech-close');
	const techTab = document.getElementById('tech-tab');
	const homeButton = document.getElementById('home-button');
	if (!techToggle || !techPanel) return;

	const offsetPad = 32; // consistent pad distance from right edge of image grid
	// Option: permit scrolling of the page while the tech panel is open
	const defaultAllowGalleryScrollWhilePanelOpen = true; // change to false if you prefer the old behavior
	let allowGalleryScrollWhilePanelOpen = (techPanel.dataset.allowBackgroundScroll != null) ? (techPanel.dataset.allowBackgroundScroll === 'true') : defaultAllowGalleryScrollWhilePanelOpen;
	let bodyOverflowHiddenByPanel = false; // track if we set overflow:hidden on open so we can revert

	const openTech = () => {
		// No repositioning of the home button on open — we want it to remain stationary.
		techPanel.classList.add('open');
		techPanel.setAttribute('aria-hidden', 'false');
		techToggle.setAttribute('aria-expanded', 'true');
		// Only hide the body scroll if we are NOT allowing gallery/background scroll while panel is open
		if (!allowGalleryScrollWhilePanelOpen) {
			// set overflow to hidden but only mark the change so we can safely restore it later
			if (document.body.style.overflow !== 'hidden') {
				document.body.style.overflow = 'hidden';
				bodyOverflowHiddenByPanel = true;
			}
		}
		if (techClose) techClose.focus();
		if (techTab) techTab.classList.add('hidden');
	};
	const closeTech = () => {
		techPanel.classList.remove('open');
		techPanel.setAttribute('aria-hidden', 'true');
		techToggle.setAttribute('aria-expanded', 'false');
		// If we previously set overflow:hidden for the panel, clear it unless other overlays are present
		if (bodyOverflowHiddenByPanel) {
			// Respect other overlays like modal overlay: don't unintentionally clear their 'hidden' setting
			const modalOpen = document.querySelector('.modal-overlay.open');
			if (!modalOpen) document.body.style.overflow = '';
			bodyOverflowHiddenByPanel = false;
		}
		if (techTab) techTab.classList.remove('hidden');
		if (homeButton) {
			// Recompute and re-position based on the closed layout
			positionHomeButton();
		}
	};

	techToggle.addEventListener('click', () => {
		if (techPanel.classList.contains('open')) closeTech(); else openTech();
	});
	techToggle.addEventListener('keydown', (e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			if (techPanel.classList.contains('open')) closeTech(); else openTech();
		}
	});
	// replaced by closeTechAndFocus so focus returns to the toggle
	techPanel.addEventListener('click', (e) => { if (e.target === techPanel) closeTech(); });
	document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && techPanel.classList.contains('open')) closeTech(); });
	const previouslyFocused = null;
	// return focus to toggle when closing
	const closeTechAndFocus = () => { closeTech(); techToggle.focus(); };
	techClose.addEventListener('click', closeTechAndFocus);
	// also reposition home button when panel toggles open/close
	// Only reposition after the toggle when the panel is closed; we keep the home button stationary while open.
	techToggle.addEventListener('click', () => {
		setTimeout(() => {
			// After a toggle, if the panel is closed, recompute the home-button position
			if (!techPanel.classList.contains('open')) {
				positionHomeButton();
			}
		}, 320);
	});
	// Wire up panel options UI to control allowBackgroundScroll behavior at runtime
	const allowScrollCheckbox = techPanel.querySelector('#allow-scroll-checkbox');
	if (allowScrollCheckbox) {
		allowScrollCheckbox.checked = allowGalleryScrollWhilePanelOpen;
		allowScrollCheckbox.addEventListener('change', (e) => {
			allowGalleryScrollWhilePanelOpen = !!e.target.checked;
			techPanel.dataset.allowBackgroundScroll = allowGalleryScrollWhilePanelOpen ? 'true' : 'false';
			// If we're currently open, update document.body.overflow accordingly
			if (techPanel.classList.contains('open')) {
				if (!allowGalleryScrollWhilePanelOpen) {
					if (document.body.style.overflow !== 'hidden') {
						document.body.style.overflow = 'hidden';
						bodyOverflowHiddenByPanel = true;
					}
				} else {
					if (bodyOverflowHiddenByPanel) {
						const modalOpen = document.querySelector('.modal-overlay.open');
						if (!modalOpen) document.body.style.overflow = '';
						bodyOverflowHiddenByPanel = false;
					}
				}
			}
		});
	}
	// position the home button relative to header and rightmost images
    
	const positionHomeButton = () => {
		if (!homeButton) return;
		// If the panel is open, don't move the home button — keep it stationary
		if (techPanel.classList.contains('open')) {
			return; // do nothing while panel is open
		}
		// (Otherwise fall through and compute the closed-panel position)
    
		const galleryHeader = document.querySelector('.gallery-header');
		const container = document.querySelector('.container');
		if (!galleryHeader || !container) return;
		const hdrRect = galleryHeader.getBoundingClientRect();
		const contRect = container.getBoundingClientRect();
		// center vertically on header
		const btnHeight = homeButton.getBoundingClientRect().height || 40;
		const top = Math.max(8, hdrRect.top + Math.round((hdrRect.height - btnHeight) / 2));
		homeButton.style.top = `${top}px`;
		// align right edge with right-most gallery content + offset
		const galleryGrid = document.querySelector('.gallery-grid');
		const refRect = galleryGrid ? galleryGrid.getBoundingClientRect() : contRect;
		const rightOffset = Math.max(12, Math.round(window.innerWidth - refRect.right + offsetPad));
		homeButton.style.right = `${rightOffset}px`;
	};
	// initial position and on resize/scroll
	positionHomeButton();
	window.addEventListener('resize', positionHomeButton);
	window.addEventListener('scroll', positionHomeButton);
});


// Future: simple mobile nav toggling could be added here
