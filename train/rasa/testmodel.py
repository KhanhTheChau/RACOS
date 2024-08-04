
from rasa.core.agent import Agent
async def main():
    agent = Agent.load("./models/20240705-143332-shrewd-tonic.tar.gz")
    a = await agent.parse_message("Học phí của Trường Bách Khoa ở Đại Học Cần Thơ là bao nhiêu")
    print(a)
import asyncio
asyncio.run(main())
