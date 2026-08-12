(function () {
    var tabBtns = document.querySelectorAll('.tab-btn');
    var panels = document.querySelectorAll('.tab-panel');

    function activate(tabId) {
        tabBtns.forEach(function (btn) {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });
        panels.forEach(function (panel) {
            panel.classList.toggle('active', panel.id === 'tab-' + tabId);
        });
        history.replaceState(null, '', '#' + tabId);
    }

    tabBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (btn.classList.contains('disabled')) {
                btn.classList.remove('shake');
                void btn.offsetWidth; // 리플레이를 위한 리플로우 강제
                btn.classList.add('shake');
                return;
            }
            activate(btn.dataset.tab);
        });
    });

    document.querySelectorAll('[data-accordion-trigger]').forEach(function (trigger) {
        trigger.addEventListener('click', function () {
            if (trigger.disabled) return;
            trigger.closest('[data-accordion-item]').classList.toggle('open');
        });
    });

    var initial = (location.hash || '').replace('#', '');
    var initialBtn = document.querySelector('.tab-btn[data-tab="' + initial + '"]');
    if (initialBtn && !initialBtn.classList.contains('disabled')) {
        activate(initial);
    } else {
        activate('home');
    }
})();
