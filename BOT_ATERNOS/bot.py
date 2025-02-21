import os
import discord
from discord.ext import commands
from dotenv import load_dotenv
from aternos import Client

# Memuat variabel dari file .env
load_dotenv()
TOKEN = os.getenv("DISCORD_TOKEN")
USERNAME = os.getenv("ATERNOS_USERNAME")
PASSWORD = os.getenv("ATERNOS_PASSWORD")
SERVER_ID = os.getenv("SERVER_ID")

# Inisialisasi bot
intents = discord.Intents.default()
bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    print(f"Bot {bot.user} sudah online!")

async def get_server():
    """Menghubungkan ke Aternos dan mengambil server"""
    at = Client.from_credentials(USERNAME, PASSWORD)
    for server in at.servers:
        if server.servid == SERVER_ID:
            return server
    return None

@bot.command()
async def start(ctx):
    """Memulai server Aternos"""
    await ctx.send("🔄 Memulai server...")
    server = await get_server()
    if server:
        server.start()
        await ctx.send("✅ Server sedang dimulai!")
    else:
        await ctx.send("❌ Gagal menemukan server!")

@bot.command()
async def stop(ctx):
    """Mematikan server Aternos"""
    await ctx.send("🔄 Mematikan server...")
    server = await get_server()
    if server:
        server.stop()
        await ctx.send("✅ Server telah dimatikan!")
    else:
        await ctx.send("❌ Gagal menemukan server!")

@bot.command()
async def status(ctx):
    """Menampilkan status server"""
    server = await get_server()
    if server:
        status_msg = f"🌍 Server **{server.domain}**\n📡 Status: **{server.status}**"
        await ctx.send(status_msg)
    else:
        await ctx.send("❌ Gagal menemukan server!")

bot.run(TOKEN)
