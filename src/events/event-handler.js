"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHandler = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const node_cron_1 = __importDefault(require("node-cron"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class EventHandler {
    static OnStart(client) {
        var _a;
        console.log(`Logged in as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}!`);
        const TARGET_CHANNEL_ID = `${process.env.TARGET_CHANNEL_ID}`;
        const TARGET_USER_ID = `${process.env.TARGET_USER_ID}`;
        const CRON_SCHEDULE = process.env.CRON_SCHEDULE ? `${process.env.CRON_SCHEDULE}` : "*/1 * * * *";
        node_cron_1.default.schedule(CRON_SCHEDULE, () => __awaiter(this, void 0, void 0, function* () {
            yield EventHandler.xingar(client, TARGET_CHANNEL_ID, TARGET_USER_ID);
        }));
    }
    static xingar(client, TARGET_CHANNEL_ID, TARGET_USER_ID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const channel = yield client.channels.fetch(TARGET_CHANNEL_ID);
                if (channel === null || channel === void 0 ? void 0 : channel.isTextBased()) {
                    const userMention = `<@${TARGET_USER_ID}>`;
                    yield channel.send(`${userMention} você é ${this.getRandomMessage()}! `);
                }
            }
            catch (error) {
                console.error("Erro ao enviar mensagem:", error);
            }
        });
    }
    static getRandomMessage() {
        const xingamentos = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "src/xingamentos.json"), {
            encoding: "utf-8",
        })).palavras;
        const randomIndex = Math.floor(Math.random() * xingamentos.length);
        return xingamentos[randomIndex];
    }
}
exports.EventHandler = EventHandler;
