import request from "supertest";
import server, { conectDB } from "../server";
import db from "../config/db";



jest.mock('../config/db')

describe('conectDB', () => {
    it('Should handle database conection error', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('error'))
        const consoleSpy = jest.spyOn(console, 'log')

        await conectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('error')
        )
    })
})