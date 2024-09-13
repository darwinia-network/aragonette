export default function Footer() {
  return (
    <div className="flex flex-col items-center py-[30px]">
      <div className="my-[30px] flex items-center gap-[20px] sm:my-[40px]">
        <a href="https://x.com/ringecosystem" target="_blank">
          <img src="/icons/X.svg" alt="X" className="sm:h-[48px] sm:w-[48px]" />
        </a>
        <a href="https://t.me/ringecosystem" target="_blank">
          <img src="/icons/Telegram.svg" alt="Telegram" className="sm:h-[48px] sm:w-[48px]" />
        </a>
        <a href="https://github.com/ringecosystem" target="_blank">
          <img src="/icons/Github.svg" alt="Github" className="sm:h-[48px] sm:w-[48px]" />
        </a>
      </div>
      <p className="text-white text-[16px] font-[300] leading-[19.2px] tracking-[1px]">2024 powered by RingDAO</p>
    </div>
  );
}
