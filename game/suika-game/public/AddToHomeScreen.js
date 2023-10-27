const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
  display: none;
  position: absolute;
  bottom: 100px;
  left: 49%;
  transform: translateX(-50%);
  color: #333;
  font-family: '"Helvetica Neue", Helvetica, Arial, sans-serif';
  zindex:999;
}

:host([hidden]) {
  display: none;
}

#install {
  height: 50px;
  padding: 8px;
  background: #F5F5F4;
  width: 280px;
  border: 3px solid #F8B720;
  line-height: 25px;
  font-size:14px;
  border-radius:8px;
}

#share {
  width: 16px;
}

#arrowOuter {
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid #F8B720;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

#arrowInner {
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid #F5F5F4;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -15px;
}

#close {
  position: absolute;
  top: 0;
  right: 0;
  width: 16px;
  height: 16px;
  padding: 5px;
  cursor: pointer;
}
.icon-wrap {
  display:flex;
  flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-evenly;
}
</style>
<div id="install">
  <div class="icon-wrap">
    <img id="" src="/public/res/suikaicon.png" style='border-radius:8px; border:1px solid #DDD; width:45px; height:45px;'>
    <span>
    <img id="share" src="data:image/png;base64,${iOSShareBase64}">
      Add To Home Screen<br /> Enjoy It!
    </span>
  </div>
</div>
<div id="arrowOuter"></div>
<div id="arrowInner"></div>
<img id="close" src="data:image/png;base64,${closeBase64}">
`;

export default class AddToHomeScreen extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._closeClick = closeClick.bind(this);
  }

  connectedCallback() {
    const ua = window.navigator.userAgent;
    const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
    const webkit = !!ua.match(/WebKit/i);
    const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

    if (iOSSafari && !navigator.standalone) {
      this.style.display = 'inline-block';
      this.style.zIndex = '999';
      this.shadowRoot.getElementById('close').addEventListener('click', this._closeClick);

    }
  }

  disconnectedCallback() {
    this.shadowRoot.getElementById('close').removeEventListener('click', this._closeClick);
  }
}

function closeClick() {
  this.style.display = 'none';
}

window.customElements.define('add-to-home-screen', AddToHomeScreen);
