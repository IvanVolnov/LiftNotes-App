"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('hello, this is server for liftnores app');
});
app.get('/api/v1/users', (req, res) => {
    try {
        const users = [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jan Doerty' },
            { id: 3, name: 'Doe Jonson' },
        ];
        return res.status(200).json({ users });
    }
    catch (error) {
        throw error;
    }
});
app.listen(5000, () => console.log('App listening on port 5000!'));
//# sourceMappingURL=index.js.map