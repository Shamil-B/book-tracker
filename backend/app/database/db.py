import asyncpg
from asyncpg.pool import Pool
from asyncio import get_event_loop


async def create_pool():
    pool = await asyncpg.create_pool(
        user='root',
        password='password',
        database='book_tracker',
        host='db'
    )

    await createTable(pool)

    return pool


async def createTable(pool: Pool):
    async with pool.acquire() as connection:
        async with connection.transaction():
            await connection.execute('''
                CREATE TABLE IF NOT EXISTS books (
                    id SERIAL PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    status VARCHAR(255) NOT NULL
                );
            ''')
