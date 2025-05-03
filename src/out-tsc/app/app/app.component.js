var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
// src/app/app.component.ts
import { Component, ViewChild } from '@angular/core';
let AppComponent = (() => {
    let _classDecorators = [Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css'],
            standalone: false
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _notificationDiv_decorators;
    let _notificationDiv_initializers = [];
    let _notificationDiv_extraInitializers = [];
    var AppComponent = class {
        static { _classThis = this; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _notificationDiv_decorators = [ViewChild('notificationDiv')];
            __esDecorate(null, null, _notificationDiv_decorators, { kind: "field", name: "notificationDiv", static: false, private: false, access: { has: obj => "notificationDiv" in obj, get: obj => obj.notificationDiv, set: (obj, value) => { obj.notificationDiv = value; } }, metadata: _metadata }, _notificationDiv_initializers, _notificationDiv_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            AppComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        }
        toggleMenu() {
            this.navOpen = !this.navOpen;
        }
        getReservationNumber() {
            const params = new URLSearchParams(window.location.search);
            return params.get('reservationNumber') || (Math.floor(Math.random() * 90000000) + 10000000).toString();
        }
        sendMail() {
            const data = new URLSearchParams({
                guestName: 'John Doe',
                guestEmail: this.email,
                hotel: 'Guest Experience',
                reservationNumber: this.reservationNumber,
                checkIn: 'May 2, 2025',
                checkOut: 'May 5, 2025'
            });
            fetch('requestemail.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: data
            })
                .then(response => response.json())
                .then(json => {
                const el = this.notificationDiv.nativeElement;
                el.textContent = json.message || 'Email sent successfully';
                el.classList.add('show');
                setTimeout(() => el.classList.remove('show'), 3000);
            })
                .catch(err => console.error('Email error:', err));
        }
        installApp() {
            if (!this.deferredPrompt)
                return;
            this.deferredPrompt.prompt();
            this.deferredPrompt.userChoice.then(() => {
                this.deferredPrompt = null;
                const installBtn = document.getElementById('installBtn');
                if (installBtn)
                    installBtn.hidden = true;
            });
        }
        ngOnInit() {
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                this.deferredPrompt = e;
                const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
                const isSupported = 'onbeforeinstallprompt' in window;
                const installBtn = document.getElementById('installBtn');
                if (installBtn)
                    installBtn.hidden = isStandalone || !isSupported;
            });
        }
        constructor() {
            this.navOpen = false;
            this.email = '';
            this.reservationNumber = this.getReservationNumber();
            this.notificationDiv = __runInitializers(this, _notificationDiv_initializers, void 0);
            __runInitializers(this, _notificationDiv_extraInitializers);
        }
    };
    return AppComponent = _classThis;
})();
export { AppComponent };
