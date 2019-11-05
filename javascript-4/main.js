
class MyCustomElement extends HTMLElement{
    constructor(data) {
        super();
        this._data = data ? data : {};
        this._container = data ? this : this.attachShadow({ mode: 'open'});
    }
    init() {
        this.addId();
        this.AddColorMarker();
    }
    addId() {
        if (this._data.id) {
            this.id = (typeof this._data.id === "number" ? 'element-' : '') + this._data.id;
        }
    }
    AddColorMarker() {
        this.style.cssText = "margin: 2px 15px; padding: 0; display: block; position:relative;";
        if (this._container !== this) this.style.marginLeft = "0";
        const tag = this.tagName.toLowerCase();
        let span = document.createElement('p');
        span.innerHTML= tag + (this._data.id ? ' (' + this._data.id + ')' : '');
        span.style.cssText = "color:white; padding: 1px 3px 2px 3px; margin: 0; display: block; position:relative; background-color: gray; width:84px; text-align:center; border-radius: 4px;";
        if (tag === 'my-tree') span.style.backgroundColor = "darkred";
        else span.style.backgroundColor = "green";
        this._container.appendChild(span);
    }
}
class MyLeaf extends MyCustomElement{
    constructor(data) {
        super(data);
    }
    connectedCallback() {
        this.init();
    }
}
class MyTree extends MyCustomElement {
    constructor(data) {
        super(data);
    }
    connectedCallback() {
        if (this.hasAttribute('data')) {
            this._data = JSON.parse(this.getAttribute('data').replace(/\'/g,"\""));
        }
        this.init();
        if (this._data.items) {
            for (let item of this._data.items){
                if (item.items) this._container.appendChild(new MyTree(item));
                else this._container.appendChild(new MyLeaf(item));
            }
        }
    }
}
//---
customElements.define('my-leaf', MyLeaf);
customElements.define('my-tree', MyTree);

