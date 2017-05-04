// optional footer design
if (false) {
    let t = 0;
    document.body.addEventListener('click', () => {
        if (t%2 == 0) {
            document.querySelector('.footer').classList.add('footer--floating');
        } else {
            document.querySelector('.footer').classList.remove('footer--floating');
        }
        t++;
    });
}


const path = window.location.pathname,
      router = document.querySelectorAll('.js--router');

// compare the path with route attribute of each `.js--router`,
// and make icon darker(active) if route matches the path.
router.forEach(r => {
    console.log(r);
    if (r.getAttribute('route') == path) {
        r.classList.remove('md-inactive');
    } else {
        r.classList.add('md-inactive');
    }
});