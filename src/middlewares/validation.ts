// import type { Request, Response, NextFunction } from "express";

// export class validateRequest {
//   validate(req: Request, res: Response, next: NextFunction) {
//     const { body } = req;

//     if (!body || typeof body !== "object") {
//       res.status(400).json({ error: "Invalid request body" });
//     else if (!body.name || typeof body.name !== "string") {
//       res.status(400).json({ error: "Missing or invalid 'name' field" });
//     } else {
//       next();
//     }
//   }
// }
