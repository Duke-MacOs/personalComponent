class Tabs {
    constructor(options) {
        let defaultOptions = {
            element: '',
            navSelector: '[data-role="tabs-nav"]',
            panesSelector: '[data-role="tabs-panes"]',
            activeClassName: 'active'
        }

        this.options = Object.assign({}, defaultOptions, options);
        this.checkOptions().bindEvents();
    }

    checkOptions() {
        if (!this.options.element) {
            throw new Error('element 为空~')
        }
        return this;
    }

    bindEvents() {
        var nodes = this.options.element.querySelector(this.options.navSelector).children;
        var panes = this.options.element.querySelector(this.options.panesSelector).children;
        var self = this;
        for(let i in nodes) {
            nodes[i].addEventListener('click', el => {
                dom.uniqueClass(nodes[i], self.options.activeClassName);
                dom.uniqueClass(panes[i], self.options.activeClassName);
            });
        }
    }
}