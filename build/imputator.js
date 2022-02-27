System.register([], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var puppeteer;
    var __moduleName = context_1 && context_1.id;
    // export function log() {
    //   console.log('logging from the imputator maderfaker');
    // }
    function launchBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer.launch({ headless: false });
            const page = yield browser.newPage();
            yield page.goto('https://google.com');
            console.log('browser launched hoho');
        });
    }
    exports_1("launchBrowser", launchBrowser);
    return {
        setters: [],
        execute: function () {
            puppeteer = require('puppeteer');
        }
    };
});
//# sourceMappingURL=imputator.js.map