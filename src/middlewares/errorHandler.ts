import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err); // log complet de l'erreur pour debug

    const status = err.status || 500; // si l'erreur contient un code, sinon 500
    const message = err.message || "Erreur interne du serveur";

    res.status(status).json({ error: message });
};