from aiogram import Router, F
from aiogram.types import Message, KeyboardButton, ReplyKeyboardMarkup, WebAppInfo

router = Router()

# 💬 Это твой сайт. Его откроет Telegram внутри WebView
MINIAPP_URL = "https://danilo3701.github.io/miniapp/"

@router.message(F.text == "/start")
async def start(message: Message):
    kb = ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text="Открыть мини-апку", web_app=WebAppInfo(url=MINIAPP_URL))]
        ],
        resize_keyboard=True
    )
    await message.answer("Нажми кнопку ниже:", reply_markup=kb)

@router.message(F.web_app_data)
async def webapp_data(message: Message):
    # 💬 Это данные, которые mini app отправила через Telegram.WebApp.sendData(...)
    data = message.web_app_data.data

    await message.answer(
        "✅ Получил данные из мини-аппы:\n"
        f"<code>{data}</code>"
    )
