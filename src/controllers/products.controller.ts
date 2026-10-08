import { Request, Response } from "express";
import { db } from "../conf/dbConnection";

export const getAll = async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM products WHERE active = TRUE"
        );

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al obtener los productos"
        });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            res.status(400).json({
                error: "El id debe ser un entero positivo"
            });
            return;
        }

        const [rows]: any = await db.query(
            "SELECT * FROM products WHERE id = ? AND active = TRUE",
            [id]
        );

        if (rows.length === 0) {
            res.status(404).json({
                error: "Producto no encontrado"
            });
            return;
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al obtener el producto"
        });
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const {
            name,
            price,
            stock,
            description,
            brand,
            img
        } = req.body;

        if (!name || !price || !stock || !description) {
            res.status(400).json({
                error: "Faltan datos obligatorios"
            });
            return;
        }

        const priceNumber = Number(price);

        if (isNaN(priceNumber) || priceNumber <= 0) {
            res.status(400).json({
                error: "El precio debe ser numerico y mayor que cero"
            });
            return;
        }

        const [result]: any = await db.query(
            `INSERT INTO products
            (name, price, stock, description, brand, img)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                name,
                priceNumber,
                stock,
                description,
                brand || null,
                img || null
            ]
        );

        res.status(201).json({
            mensaje: "Producto creado correctamente",
            id: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al crear el producto"
        });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            res.status(400).json({
                error: "El id debe ser un entero positivo"
            });
            return;
        }

        const {
            name,
            price,
            stock,
            description,
            brand,
            img
        } = req.body;

        if (!name || !price || !stock || !description) {
            res.status(400).json({
                error: "Faltan datos obligatorios"
            });
            return;
        }

        const priceNumber = Number(price);

        if (isNaN(priceNumber) || priceNumber <= 0) {
            res.status(400).json({
                error: "El precio debe ser numerico y mayor que cero"
            });
            return;
        }

        const [result]: any = await db.query(
            `UPDATE products
            SET name = ?, price = ?, stock = ?, description = ?, brand = ?, img = ?
            WHERE id = ? AND active = TRUE`,
            [
                name,
                priceNumber,
                stock,
                description,
                brand || null,
                img || null,
                id
            ]
        );

        if (result.affectedRows === 0) {
            res.status(404).json({
                error: "Producto no encontrado"
            });
            return;
        }

        res.json({
            mensaje: "Producto actualizado correctamente"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al actualizar el producto"
        });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            res.status(400).json({
                error: "El id debe ser un entero positivo"
            });
            return;
        }

        const [result]: any = await db.query(
            "UPDATE products SET active = FALSE WHERE id = ? AND active = TRUE",
            [id]
        );

        if (result.affectedRows === 0) {
            res.status(404).json({
                error: "Producto no encontrado"
            });
            return;
        }

        res.json({
            mensaje: "Producto dado de baja correctamente"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al dar de baja el producto"
        });
    }
};

export const changePrice = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            res.status(400).json({
                error: "El id debe ser un entero positivo"
            });
            return;
        }

        const { price } = req.body;

        const priceNumber = Number(price);

        if (isNaN(priceNumber) || priceNumber <= 0) {
            res.status(400).json({
                error: "El precio debe ser numerico y mayor que cero"
            });
            return;
        }

        const [result]: any = await db.query(
            "UPDATE products SET price = ? WHERE id = ? AND active = TRUE",
            [priceNumber, id]
        );

        if (result.affectedRows === 0) {
            res.status(404).json({
                error: "Producto no encontrado"
            });
            return;
        }

        res.json({
            mensaje: "Precio actualizado correctamente"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error al cambiar el precio"
        });
    }
};