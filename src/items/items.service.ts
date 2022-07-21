/**
 * Required Interface Model
 */
import { BaseItem, Item } from "./item.interface";
//import { Items } from "./items.interface";
import { pool } from "../config/database";

/**
 * In-Memory Store
 */
/*
let items: Items = {
    1: {
        id: 1,
        name: "kurma",
        price: 500,
        description: "Hijra dates",
        image: "#"
    },
};
*/

/**
 * Service Methods
 */
export const findAll = async (): Promise<Item[]> => {
    const items = await pool.query("SELECT * FROM items");
    return items.rows;
}

export const find = async (id: number): Promise<Item> => {
    const item = await pool.query(
        "SELECT * FROM items WHERE id = $1", [id]
    );

    return item.rows;
}

export const create = async (newItem: BaseItem): Promise<Item> => {
    const id = new Date().valueOf();
    const { name, price, description, image } = newItem;
    await pool.query(
        "INSERT INTO items (id, name, price, description, image) VALUES ($1, $2, $3, $4, $5)", 
        [id, name, price, description, image]
    );

    return find(id);
}

export const update = async (id: number, itemUpdate: BaseItem): Promise<Item | null> => {
    const item =  await find(id);
    const { name, price, description, image } = itemUpdate;

    if (!item) {
        return null
    }

    await pool.query(
        "UPDATE items SET name = $1, price = $2, description = $3, image = $4 WHERE id = $5",
        [name, price, description, image, id]
    );

    return find(id);
}

export const remove = async (id: number): Promise<null | void> => {
    const item = await find(id);

    if (!item) {
        return null;
    }

    await pool.query(
        "DELETE FROM items WHERE id = $1",
        [id]
    );
}