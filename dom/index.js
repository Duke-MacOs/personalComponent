var dom = {
    every: function(nodeList, fn) {
        for(var i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i], i);
        }
        return nodeList
    },
    uniqueClass: function(el, className) {
        dom.every(el.parentNode.children, el => {
            el.classList.remove(className);
        });
        el.classList.add(className);

        return el;
    }
}