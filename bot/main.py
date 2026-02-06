import asyncio

from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode

from handlers import router

BOT_TOKEN = "8501113123:AAF5nWKp7RuOYVD8TjiQQ2Mkxi2z_BOZ3Ss"


async def main():
    token = BOT_TOKEN.strip()
    if not token or token in ("PASTE_TOKEN_HERE", "ВСТАВЬ_СЮДА_ТОКЕН"):
        raise RuntimeError("❌ Токен не вставлен в BOT_TOKEN.")

    bot = Bot(
        token=token,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML)
    )

    # 💬 Важно: если раньше был webhook (Railway/сервер) = он мешает polling
    await bot.delete_webhook(drop_pending_updates=True)

    dp = Dispatcher()
    dp.include_router(router)

    me = await bot.get_me()
    print(f"✅ Бот запущен: @{me.username}  🚀")
    print("📩 Жду сообщения. Остановить: Ctrl+C")

    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
