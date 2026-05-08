let al = {};

document.body.insertAdjacentHTML("beforeend", '<div id="js-viewer"><div id="js-viewer-container"><img id="js-viewer-img" src="" /></div><span><button id="js-viewer-prev" type="button">Previous</button> <button id="js-viewer-next" type="button">Next</button></span></div>');

const photoPostsGallery = document.getElementById('photos');
if (photoPostsGallery) {
    document.body.insertAdjacentHTML('beforeend', `
        <button id="back-to-top-button" type="button" aria-label="Back to top">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M3.646 11.854a.5.5 0 0 0 .708 0L8 8.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708M2.4 5.2c0 .22.18.4.4.4h10.4a.4.4 0 0 0 0-.8H2.8a.4.4 0 0 0-.4.4"/>
            </svg>
        </button>
    `);
    const backToTopButton = document.getElementById('back-to-top-button');

    function updateBackToTopButtonVisibility() {
        if (!backToTopButton) return;
        const show = window.pageYOffset > 200;
        backToTopButton.style.display = show ? 'flex' : 'none';
    }

    backToTopButton.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', updateBackToTopButtonVisibility, { passive: true });
    updateBackToTopButtonVisibility();
}

al.html = {};
al.html.viewer = document.getElementById("js-viewer");
al.html.viewer.style.display = "none";

al.html.viewerImg = document.getElementById("js-viewer-img");
al.html.viewerContainer = document.getElementById("js-viewer-container");
al.html.viewerPrev = document.getElementById("js-viewer-prev");
al.html.viewerNext = document.getElementById("js-viewer-next");

al.isViewing = false;
al.selectedPhoto = undefined;
al.zoomLevel = 1;
al.doubleClickZoomState = 0;
al.isDragging = false;
al.dragStartX = 0;
al.dragStartY = 0;
al.dragOffsetX = 0;
al.dragOffsetY = 0;
al.dragThreshold = 10;
al.touchLastMidX = null;
al.touchLastMidY = null;

const photosNode = document.getElementById('photos');

function closeViewer() {
    al.isViewing = false;
    al.selectedPhoto = undefined;
    al.html.viewer.style.display = 'none';
    al.zoomLevel = 1;
    al.doubleClickZoomState = 0;
    al.dragOffsetX = 0;
    al.dragOffsetY = 0;
    al.isDragging = false;
    al.dragStartX = 0;
    al.dragStartY = 0;
    initialPinchDistance = null;
    lastPinchZoom = 1;
    updateZoomDisplay();
    document.body.style.overflow = '';
    al.html.viewer.removeEventListener('wheel', handleViewerWheel, { passive: false });
}

function updateZoomDisplay() {
    al.html.viewerContainer.style.transform = `scale(${al.zoomLevel}) translate(${al.dragOffsetX}px, ${al.dragOffsetY}px)`;
    if (al.zoomLevel > 1) {
        al.html.viewerContainer.style.cursor = al.isDragging ? 'grabbing' : 'grab';
    } else {
        al.html.viewerContainer.style.cursor = 'default';
    }
}

function zoomIn() {
    al.zoomLevel += 0.2;
    if (al.zoomLevel > 3) al.zoomLevel = 3;
    updateZoomDisplay();
}

function zoomOut() {
    al.zoomLevel -= 0.2;
    if (al.zoomLevel < 1) {
        al.zoomLevel = 1;
        al.dragOffsetX = 0;
        al.dragOffsetY = 0;
        al.doubleClickZoomState = 0;
    }
    updateZoomDisplay();
}

function resetZoom() {
    al.zoomLevel = 1;
    al.doubleClickZoomState = 0;
    al.dragOffsetX = 0;
    al.dragOffsetY = 0;
    updateZoomDisplay();
}

function handleDoubleClickZoom() {
    al.doubleClickZoomState = (al.doubleClickZoomState + 1) % 3;

    if (al.doubleClickZoomState === 0) {
        al.zoomLevel = 1;
        al.dragOffsetX = 0;
        al.dragOffsetY = 0;
    } else if (al.doubleClickZoomState === 1) {
        al.zoomLevel = 1.5;
    } else if (al.doubleClickZoomState === 2) {
        al.zoomLevel = 3;
    }

    updateZoomDisplay();
}

function getSiblingAnchor(direction) {
    if (!al.selectedPhoto) return null;
    const figure = al.selectedPhoto.closest('figure');
    if (!figure) return null;
    const sibling = direction === 'prev' ? figure.previousElementSibling : figure.nextElementSibling;
    return sibling ? sibling.querySelector('a') : null;
}

function showPrevious() {
    const anchor = getSiblingAnchor('prev');
    if (anchor) viewPhoto(anchor);
}

function showNext() {
    const anchor = getSiblingAnchor('next');
    if (anchor) viewPhoto(anchor);
}

function viewPhoto(photoAnchor) {
    if (!photoAnchor) return;
    al.isViewing = true;
    al.selectedPhoto = photoAnchor;
    al.zoomLevel = 1;
    al.doubleClickZoomState = 0;
    al.dragOffsetX = 0;
    al.dragOffsetY = 0;
    al.isDragging = false;
    al.dragStartX = 0;
    al.dragStartY = 0;
    initialPinchDistance = null;
    lastPinchZoom = 1;
    al.html.viewerImg.src = '';
    al.html.viewerImg.src = photoAnchor.href;
    al.html.viewer.style.display = 'flex';
    updateZoomDisplay();
    document.body.style.overflow = 'hidden';
    al.html.viewerPrev.style.display = getSiblingAnchor('prev') ? '' : 'none';
    al.html.viewerNext.style.display = getSiblingAnchor('next') ? '' : 'none';
    al.html.viewer.addEventListener('wheel', handleViewerWheel, { passive: false });
}

function handleClick(e) {
    const anchor = e.target.closest('#photos a');
    if (anchor) {
        e.preventDefault();
        viewPhoto(anchor);
        return;
    }

    if (e.target.id === 'js-viewer') {
        closeViewer();
        return;
    }

    if (e.target.id === 'js-viewer-prev') {
        e.stopPropagation();
        showPrevious();
        return;
    }

    if (e.target.id === 'js-viewer-next') {
        e.stopPropagation();
        showNext();
        return;
    }
}

function handleKeyUp(e) {
    if (!al.isViewing) return;
    if (e.key === 'Escape') {
        closeViewer();
        return;
    }
    if (e.key === 'ArrowLeft') {
        showPrevious();
        return;
    }
    if (e.key === 'ArrowRight') {
        showNext();
        return;
    }
    if (e.key === '+' || e.key === '=') {
        zoomIn();
        return;
    }
    if (e.key === '-' || e.key === '_') {
        zoomOut();
        return;
    }
    if (e.key === '0') {
        resetZoom();
        return;
    }
}

function getTouches(evt) {
    return evt.touches || (evt.originalEvent && evt.originalEvent.touches) || [];
}

let xDown = null;
let yDown = null;
let lastTapTime = 0;
let lastTapX = 0;
let lastTapY = 0;
let initialPinchDistance = null;
let lastPinchZoom = 1;

function handleTouchStart(evt) {
    if (!al.isViewing) return;
    const touches = getTouches(evt);

    if (touches.length === 1) {
        if (al.zoomLevel > 1) return;

        const firstTouch = touches[0];
        if (!firstTouch) return;
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    } else if (touches.length === 2) {
        evt.preventDefault();
        const touch1 = touches[0];
        const touch2 = touches[1];
        initialPinchDistance = getDistance(touch1.clientX, touch1.clientY, touch2.clientX, touch2.clientY);
        lastPinchZoom = al.zoomLevel;
        const midpoint = getMidpoint(touch1.clientX, touch1.clientY, touch2.clientX, touch2.clientY);
        al.touchLastMidX = midpoint.x;
        al.touchLastMidY = midpoint.y;
    }
}

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function getMidpoint(x1, y1, x2, y2) {
    return {
        x: (x1 + x2) / 2,
        y: (y1 + y2) / 2,
    };
}

function handleTouchMove(evt) {
    if (!al.isViewing) return;
    const touches = getTouches(evt);

    if (touches.length === 1 && xDown !== null && yDown !== null) {
        if (al.zoomLevel > 1) return;

        const xUp = touches[0].clientX;
        const yUp = touches[0].clientY;
        const xDiff = xDown - xUp;
        const yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 30) {
            evt.preventDefault();
            if (xDiff > 0) {
                showNext();
            } else {
                showPrevious();
            }
            xDown = null;
            yDown = null;
        }
    } else if (touches.length === 2 && initialPinchDistance !== null) {
        evt.preventDefault();
        const touch1 = touches[0];
        const touch2 = touches[1];
        const currentDistance = getDistance(touch1.clientX, touch1.clientY, touch2.clientX, touch2.clientY);
        const midpoint = getMidpoint(touch1.clientX, touch1.clientY, touch2.clientX, touch2.clientY);

        const scale = currentDistance / initialPinchDistance;
        const newZoom = Math.max(1, Math.min(3, lastPinchZoom * scale));

        if (al.touchLastMidX !== null && al.touchLastMidY !== null && al.zoomLevel > 1) {
            const dx = midpoint.x - al.touchLastMidX;
            const dy = midpoint.y - al.touchLastMidY;
            al.dragOffsetX += dx;
            al.dragOffsetY += dy;
        }

        al.zoomLevel = newZoom;
        al.touchLastMidX = midpoint.x;
        al.touchLastMidY = midpoint.y;
        updateZoomDisplay();
    }
}

function handleTouchEnd(evt) {
    const touches = getTouches(evt);

    if (touches.length < 2) {
        al.touchLastMidX = null;
        al.touchLastMidY = null;
    }

    if (touches.length === 0) {
        initialPinchDistance = null;
        lastPinchZoom = al.zoomLevel;
    }
    handleDoubleTap(evt);
}

function handleDoubleTap(evt) {
    const now = Date.now();
    const touches = getTouches(evt);
    if (touches.length !== 1) return;
    const touch = touches[0];
    if (!touch) return;

    const x = touch.clientX;
    const y = touch.clientY;
    if (now - lastTapTime < 300 && Math.abs(x - lastTapX) < 30 && Math.abs(y - lastTapY) < 30) {
        handleDoubleClickZoom();
    }
    lastTapTime = now;
    lastTapX = x;
    lastTapY = y;
}

function handleMouseDown(e) {
    if (!al.isViewing || al.zoomLevel <= 1) return;
    if (e.target.closest('#js-viewer-container') || e.target.id === 'js-viewer-img') {
        e.preventDefault();
        al.isDragging = false;
        al.dragStartX = e.clientX;
        al.dragStartY = e.clientY;
        al.dragInitialOffsetX = al.dragOffsetX;
        al.dragInitialOffsetY = al.dragOffsetY;
        updateZoomDisplay();
    }
}

function handleMouseMove(e) {
    if (!al.isViewing || al.zoomLevel <= 1) return;

    if (al.dragStartX !== 0 || al.dragStartY !== 0) {
        const deltaX = Math.abs(e.clientX - al.dragStartX);
        const deltaY = Math.abs(e.clientY - al.dragStartY);

        if (!al.isDragging && (deltaX > al.dragThreshold || deltaY > al.dragThreshold)) {
            al.isDragging = true;
            updateZoomDisplay();
        }

        if (al.isDragging) {
            e.preventDefault();
            al.dragOffsetX = al.dragInitialOffsetX + (e.clientX - al.dragStartX);
            al.dragOffsetY = al.dragInitialOffsetY + (e.clientY - al.dragStartY);
            updateZoomDisplay();
        }
    }
}

function handleMouseUp() {
    al.isDragging = false;
    al.dragStartX = 0;
    al.dragStartY = 0;
    updateZoomDisplay();
}

function handleViewerWheel(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.deltaY < 0) {
        zoomIn();
    } else {
        zoomOut();
    }
}

document.addEventListener('click', handleClick);
document.addEventListener('dblclick', function (e) {
    if (!al.isViewing) return;
    if (e.target.closest('#js-viewer-container') || e.target.id === 'js-viewer-img') {
        e.preventDefault();
        handleDoubleClickZoom();
    }
}, { passive: false });
document.addEventListener('keyup', handleKeyUp);

document.addEventListener('keydown', handleSpacebarNavigation);
document.addEventListener('touchstart', handleTouchStart, { passive: false });
document.addEventListener('touchmove', handleTouchMove, { passive: false });
document.addEventListener('touchend', handleTouchEnd, { passive: false });
document.addEventListener('wheel', function (e) {
    if (!al.isViewing) return;
    if (!e.target.closest('#js-viewer')) return;
    e.preventDefault();
    e.stopPropagation();
    if (e.deltaY < 0) {
        zoomIn();
    } else {
        zoomOut();
    }
}, { passive: false });
document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

function isTypingTarget(target) {
    if (!(target instanceof Element)) return false;
    return target.closest('input, textarea, select, button, [contenteditable="true"], [contenteditable=""]') !== null || target.isContentEditable;
}

function getPhotoFigures() {
    if (!photosNode) return [];
    return Array.from(photosNode.querySelectorAll('figure'));
}

function findCurrentFigureIndex() {
    const figures = getPhotoFigures();
    const scrollTop = window.pageYOffset;
    const viewportCenter = scrollTop + window.innerHeight / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    for (let i = 0; i < figures.length; i++) {
        const rect = figures[i].getBoundingClientRect();
        const figureCenter = scrollTop + rect.top + rect.height / 2;
        const distance = Math.abs(figureCenter - viewportCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = i;
        }
    }

    return closestIndex;
}

function getNextPhotoFigure() {
    const figures = getPhotoFigures();
    if (!figures.length) return null;

    const currentIndex = findCurrentFigureIndex();
    const nextIndex = currentIndex + 1;

    return nextIndex < figures.length ? figures[nextIndex] : null;
}

function getPreviousPhotoFigure() {
    const figures = getPhotoFigures();
    if (!figures.length) return null;

    const currentIndex = findCurrentFigureIndex();
    const prevIndex = currentIndex - 1;

    return prevIndex >= 0 ? figures[prevIndex] : null;
}

function handleSpacebarNavigation(e) {
    if (e.code !== 'Space' || al.isViewing || !photosNode) return;
    if (isTypingTarget(e.target)) return;

    e.preventDefault();

    if (e.ctrlKey && e.shiftKey) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        return;
    }

    if (e.ctrlKey) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    const targetFigure = e.shiftKey ? getPreviousPhotoFigure() : getNextPhotoFigure();
    if (!targetFigure) return;

    targetFigure.scrollIntoView({ behavior: 'instant', block: 'center' });
}

const POSTS_PER_PAGE = 8;
let currentPostPage = 1;
let currentSearchQuery = '';

function getAllPostLinks() {
    return Array.from(document.querySelectorAll('.content main a'));
}

function getFilteredPosts() {
    return getAllPostLinks().filter(link => {
        const text = (link.querySelector('p')?.textContent || '').toLowerCase();
        return text.includes(currentSearchQuery);
    });
}

function renderPostPagination() {
    const paginationNav = document.getElementById('pagination');
    if (!paginationNav) return;

    const filteredPosts = getFilteredPosts();
    const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
    if (currentPostPage > totalPages) currentPostPage = totalPages;

    getAllPostLinks().forEach(link => {
        link.style.display = 'none';
    });

    const startIndex = (currentPostPage - 1) * POSTS_PER_PAGE;
    filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE).forEach(link => {
        link.style.display = '';
    });

    if (totalPages <= 1) {
        paginationNav.style.display = 'none';
        paginationNav.innerHTML = '';
        return;
    }

    paginationNav.style.display = '';
    paginationNav.innerHTML = filteredPosts.reduce((html, _, index) => {
        const pageNumber = Math.floor(index / POSTS_PER_PAGE) + 1;
        if (pageNumber > totalPages) return html;
        if (html.includes(`data-page="${pageNumber}"`)) return html;
        return html + `<li><button type="button" class="${pageNumber === currentPostPage ? 'active' : ''}" data-page="${pageNumber}">${pageNumber}</button></li>`;
    }, '');
}

function initPostPagination() {
    const postSearchInput = document.getElementById('post-search');
    const paginationNav = document.getElementById('pagination');

    if (postSearchInput) {
        postSearchInput.addEventListener('input', function () {
            currentSearchQuery = this.value.trim().toLowerCase();
            currentPostPage = 1;
            renderPostPagination();
        });
    }

    if (paginationNav) {
        paginationNav.addEventListener('click', function (event) {
            const button = event.target.closest('button[data-page]');
            if (!button) return;
            currentPostPage = Number(button.dataset.page) || 1;
            renderPostPagination();
        });
    }

    renderPostPagination();
}

document.addEventListener('DOMContentLoaded', initPostPagination);
