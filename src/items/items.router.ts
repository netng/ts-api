/**
 * Required External Module and Interfaces
 */
import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import { BaseItem, Item } from "./item.interface";

/**
 * Router Definition
 */
export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items
itemsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const items: Item[] = await ItemService.findAll()

        res.status(200).send(items);
    } catch (e) {
        if (e instanceof Error) {
            res.status(500).send(e.message);
        }
    }
});

// GET items/:id
itemsRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
     try {
        const item: Item = await ItemService.find(id);
        res.status(200).send(item);
     } catch (e) {
        if (e instanceof Error) {
            res.status(500).send(e.message);
        }
     }

});

// POST items
itemsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newItem: BaseItem = req.body;
        const item: Item = await ItemService.create(newItem)

        res.status(201).json(item);
    } catch (e) {
        if (e instanceof Error) {
            res.status(500).send(e.message);
        }
    }
});

// PUT items/:id
itemsRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const existingItem: Item = await ItemService.find(id);
        const itemUpdate: BaseItem = req.body;

        if (existingItem) {
            const updatedItem = await ItemService.update(id, itemUpdate);
            return res.status(200).json(updatedItem);
        }
    } catch (e) {
        if (e instanceof Error) {
            res.status(500).send(e.message);
        }
    }
});

// DELETE items/:id
itemsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);

        const item: Item = await ItemService.find(id);

        if (item) {
            await ItemService.remove(id);
            res.sendStatus(204)
        }
    } catch (e) {
        if (e instanceof Error) {
            res.status(500).send(e.message);
        }
    }
});