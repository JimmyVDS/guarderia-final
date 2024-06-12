function navigateToLink(event) {
    const box = event.currentTarget;
    const link = box.querySelector('a');
    if (link) {
        window.location.href = link.href;
    }
}