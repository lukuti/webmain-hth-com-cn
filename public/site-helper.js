// public/site-helper.js
(function() {
    'use strict';

    // Configuration data example
    const CONFIG = {
        SITE_NAME: '华体会',
        DOMAIN: 'https://webmain-hth.com.cn',
        TAG: 'hth',
        CARD_COLORS: ['#4A90D9', '#7B68EE', '#2E8B57', '#E67E22']
    };

    // Predefined tips and badges
    const TIPS = [
        { id: 'tip-welcome', text: '欢迎使用华体会服务', type: 'info' },
        { id: 'tip-security', text: '请通过官网访问华体会平台', type: 'warning' },
        { id: 'tip-contact', text: '如需帮助请联系客服', type: 'default' }
    ];

    const KEYWORD_BADGES = [
        { label: '华体会', link: CONFIG.DOMAIN + '/about' },
        { label: '华体会体育', link: CONFIG.DOMAIN + '/sports' },
        { label: '华体会娱乐', link: CONFIG.DOMAIN + '/casino' },
        { label: '华体会注册', link: CONFIG.DOMAIN + '/register' }
    ];

    // Helper: create element with attributes and content
    function createEl(tag, attrs, content) {
        const el = document.createElement(tag);
        if (attrs) {
            Object.keys(attrs).forEach(key => {
                el.setAttribute(key, attrs[key]);
            });
        }
        if (content) {
            el.textContent = content;
        }
        return el;
    }

    // Render a tip card
    function renderTipCard(tip, index) {
        const card = createEl('div', {
            class: 'site-helper-card',
            'data-id': tip.id,
            style: 'border-left: 4px solid ' + CONFIG.CARD_COLORS[index % CONFIG.CARD_COLORS.length] + ';'
        });

        const title = createEl('span', { class: 'card-type' }, tip.type.toUpperCase());
        const text = createEl('p', { class: 'card-text' }, tip.text);
        card.appendChild(title);
        card.appendChild(text);
        return card;
    }

    // Render a keyword badge
    function renderBadge(badge) {
        const badgeEl = createEl('a', {
            class: 'keyword-badge',
            href: badge.link,
            target: '_blank',
            rel: 'noopener'
        });
        // Use a small icon-like prefix
        const icon = createEl('span', { class: 'badge-icon' }, '⚡');
        const label = createEl('span', { class: 'badge-label' }, badge.label);
        badgeEl.appendChild(icon);
        badgeEl.appendChild(label);
        return badgeEl;
    }

    // Render access instruction box
    function renderAccessBox() {
        const box = createEl('div', { class: 'access-box' });
        const header = createEl('h3', { class: 'access-title' }, '访问说明');
        const list = createEl('ul', { class: 'access-list' });

        const instructions = [
            '请确认网址为 ' + CONFIG.DOMAIN,
            '推荐使用浏览器访问华体会',
            '勿轻信非官方渠道链接'
        ];

        instructions.forEach(text => {
            const li = createEl('li', {}, text);
            list.appendChild(li);
        });

        box.appendChild(header);
        box.appendChild(list);
        return box;
    }

    // Create wrapper container
    function createWrapper() {
        const wrapper = createEl('div', { id: 'site-helper-widget', class: 'site-helper-widget' });

        // Section: Tips
        const tipsSection = createEl('div', { class: 'helper-section' });
        const tipsTitle = createEl('h2', { class: 'section-title' }, '提示卡片');
        tipsSection.appendChild(tipsTitle);
        TIPS.forEach((tip, idx) => {
            tipsSection.appendChild(renderTipCard(tip, idx));
        });

        // Section: Badges
        const badgeSection = createEl('div', { class: 'helper-section' });
        const badgeTitle = createEl('h2', { class: 'section-title' }, '关键词徽章');
        badgeSection.appendChild(badgeTitle);
        const badgeContainer = createEl('div', { class: 'badge-container' });
        KEYWORD_BADGES.forEach(badge => {
            badgeContainer.appendChild(renderBadge(badge));
        });
        badgeSection.appendChild(badgeContainer);

        // Section: Access
        const accessSection = renderAccessBox();

        // Assemble
        wrapper.appendChild(tipsSection);
        wrapper.appendChild(badgeSection);
        wrapper.appendChild(accessSection);
        return wrapper;
    }

    // Inject styles dynamically
    function injectStyles() {
        const style = createEl('style', { type: 'text/css' });
        style.textContent = `
            .site-helper-widget {
                max-width: 480px;
                margin: 20px auto;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                background: #f9fafb;
                border-radius: 12px;
                padding: 20px 24px;
                box-shadow: 0 2px 12px rgba(0,0,0,0.08);
                color: #1f2937;
            }
            .helper-section {
                margin-bottom: 24px;
            }
            .section-title {
                font-size: 1.1rem;
                font-weight: 600;
                margin: 0 0 12px 0;
                color: #374151;
                border-bottom: 2px solid #e5e7eb;
                padding-bottom: 6px;
            }
            .site-helper-card {
                background: white;
                border-radius: 8px;
                padding: 12px 16px;
                margin: 8px 0;
                display: flex;
                align-items: center;
                gap: 12px;
                transition: background 0.2s;
            }
            .site-helper-card:hover {
                background: #f3f4f6;
            }
            .card-type {
                font-size: 0.75rem;
                font-weight: 700;
                background: #e5e7eb;
                padding: 2px 8px;
                border-radius: 4px;
                color: #4b5563;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .card-text {
                margin: 0;
                font-size: 0.95rem;
                line-height: 1.4;
            }
            .badge-container {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }
            .keyword-badge {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                background: white;
                border: 1px solid #d1d5db;
                border-radius: 20px;
                padding: 6px 14px;
                text-decoration: none;
                color: #1f2937;
                font-size: 0.9rem;
                transition: all 0.2s;
            }
            .keyword-badge:hover {
                background: #e0f2fe;
                border-color: #60a5fa;
                color: #1e3a5f;
            }
            .badge-icon {
                font-size: 1rem;
            }
            .badge-label {
                font-weight: 500;
            }
            .access-box {
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 10px;
                padding: 16px 20px;
            }
            .access-title {
                font-size: 1rem;
                font-weight: 600;
                margin: 0 0 10px 0;
                color: #111827;
            }
            .access-list {
                margin: 0;
                padding-left: 20px;
                list-style-type: disc;
            }
            .access-list li {
                margin: 6px 0;
                font-size: 0.9rem;
                line-height: 1.5;
                color: #4b5563;
            }
            .access-list li::marker {
                color: #6366f1;
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize when DOM is ready
    function init() {
        injectStyles();
        const wrapper = createWrapper();
        // Append to body or a specific container if exists
        const target = document.getElementById('site-helper-container') || document.body;
        target.appendChild(wrapper);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();