"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["CAISSIERE"] = "CAISSIERE";
    UserRole["CLIENT"] = "CLIENT";
})(UserRole || (exports.UserRole = UserRole = {}));
class User {
    id;
    email;
    name;
    phone;
    password;
    username;
    role;
    isActive;
    createdAt;
    updatedAt;
    constructor(name, password, username, phone, role, email) {
        this.email = email;
        this.name = name;
        this.phone = phone;
        this.password = password;
        this.username = username;
        this.role = role || UserRole.CLIENT;
        this.isActive = true;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map