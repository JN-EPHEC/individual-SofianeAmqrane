import express from "express";
import * as userController from "../controllers/userController.js";
import { checkIdParam } from '../middlewares/checkIdParam.js';

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupère la liste des utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Succès
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par son ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Succès
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get('/:id', checkIdParam, userController.getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crée un utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       500:
 *         description: Erreur serveur
 */
router.post("/", userController.createUser);

 /**
  * @swagger
  * /api/users/{id}:
  *   put:
  *     summary: Mettre à jour un utilisateur
  *     tags: [Users]
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         description: ID de l'utilisateur
  *         schema:
  *           type: integer
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               nom:
  *                 type: string
  *               prenom:
  *                 type: string
  *     responses:
  *       200:
  *         description: Utilisateur mis à jour
  *       400:
  *         description: ID invalide
  *       404:
  *         description: Utilisateur non trouvé
  *       500:
  *         description: Erreur serveur
  */
router.put('/:id', checkIdParam, userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', checkIdParam, userController.deleteUser);

export default router;
