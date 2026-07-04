function Close() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Close">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Close">
          <path d="M12 12L27.5563 27.5563" id="Vector 2" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
          <path d="M12 27.6777L27.5563 12.1214" id="Vector 1" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Content">
      <p className="[word-break:break-word] font-['Libre_Baskerville:Regular',sans-serif] leading-[26px] not-italic relative shrink-0 text-[24px] text-center text-white tracking-[-1.44px] whitespace-nowrap">anyinvites</p>
      <Close />
    </div>
  );
}

function Header() {
  return (
    <div className="backdrop-blur-[15px] bg-[#7b9261] relative shrink-0 w-full" data-name="Header">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start px-[16px] py-[12px] relative size-full">
          <Content />
        </div>
      </div>
      <div aria-hidden className="absolute border-[rgba(255,255,255,0.05)] border-b border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Home() {
  return (
    <div className="content-stretch flex items-center py-[6px] relative shrink-0 w-full" data-name="Home">
      <p className="[word-break:break-word] font-['Libre_Baskerville:Regular',sans-serif] leading-[34px] not-italic relative shrink-0 text-[30px] text-center text-white tracking-[-2.1px] whitespace-nowrap">Home</p>
    </div>
  );
}

function EventDetails() {
  return (
    <div className="content-stretch flex items-center py-[6px] relative shrink-0 w-full" data-name="Event Details">
      <p className="[word-break:break-word] font-['Libre_Baskerville:Regular',sans-serif] leading-[34px] not-italic relative shrink-0 text-[30px] text-center text-white tracking-[-2.1px] whitespace-nowrap">Event Details</p>
    </div>
  );
}

function Rsvp() {
  return (
    <div className="content-stretch flex items-center py-[6px] relative shrink-0 w-full" data-name="RSVP">
      <p className="[word-break:break-word] font-['Libre_Baskerville:Regular',sans-serif] leading-[34px] not-italic relative shrink-0 text-[30px] text-center text-white tracking-[-2.1px] whitespace-nowrap">RSVP</p>
    </div>
  );
}

function OurStory() {
  return (
    <div className="content-stretch flex items-center py-[6px] relative shrink-0 w-full" data-name="Our Story">
      <p className="[word-break:break-word] font-['Libre_Baskerville:Regular',sans-serif] leading-[34px] not-italic relative shrink-0 text-[30px] text-center text-white tracking-[-2.1px] whitespace-nowrap">Our Story</p>
    </div>
  );
}

function EventSchedule() {
  return (
    <div className="content-stretch flex items-center py-[6px] relative shrink-0 w-full" data-name="Event Schedule">
      <p className="[word-break:break-word] font-['Libre_Baskerville:Regular',sans-serif] leading-[34px] not-italic relative shrink-0 text-[30px] text-center text-white tracking-[-2.1px] whitespace-nowrap">Event Schedule</p>
    </div>
  );
}

function GiftRegistry() {
  return (
    <div className="content-stretch flex items-center py-[6px] relative shrink-0 w-full" data-name="Gift Registry">
      <p className="[word-break:break-word] font-['Libre_Baskerville:Regular',sans-serif] leading-[34px] not-italic relative shrink-0 text-[30px] text-center text-white tracking-[-2.1px] whitespace-nowrap">Gift registry</p>
    </div>
  );
}

function MenuSelection() {
  return (
    <div className="content-stretch flex items-center py-[6px] relative shrink-0 w-full" data-name="Menu Selection">
      <p className="[word-break:break-word] font-['Libre_Baskerville:Regular',sans-serif] leading-[34px] not-italic relative shrink-0 text-[30px] text-center text-white tracking-[-2.1px] whitespace-nowrap">Menu Selection</p>
    </div>
  );
}

function GuestBook() {
  return (
    <div className="content-stretch flex items-center py-[6px] relative shrink-0 w-full" data-name="Guest Book">
      <p className="[word-break:break-word] font-['Libre_Baskerville:Regular',sans-serif] leading-[34px] not-italic relative shrink-0 text-[30px] text-center text-white tracking-[-2.1px] whitespace-nowrap">Guest Book</p>
    </div>
  );
}

function PhotoBook() {
  return (
    <div className="content-stretch flex items-center py-[6px] relative shrink-0 w-full" data-name="Photo Book">
      <p className="[word-break:break-word] font-['Libre_Baskerville:Regular',sans-serif] leading-[34px] not-italic relative shrink-0 text-[30px] text-center text-white tracking-[-2.1px] whitespace-nowrap">Photo Gallery</p>
    </div>
  );
}

function Menu() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Menu">
      <Home />
      <EventDetails />
      <Rsvp />
      <OurStory />
      <EventSchedule />
      <GiftRegistry />
      <MenuSelection />
      <GuestBook />
      <PhotoBook />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0">
      <div className="[word-break:break-word] flex flex-col font-['Libre_Baskerville:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white tracking-[-0.6px] whitespace-nowrap">
        <p className="leading-[26px]">En</p>
      </div>
      <div className="bg-white h-[2px] relative rounded-[100px] shrink-0 w-full" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0">
      <div className="[word-break:break-word] flex flex-col font-['Libre_Baskerville:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white tracking-[-0.6px] whitespace-nowrap">
        <p className="leading-[26px]">De</p>
      </div>
      <div className="bg-white h-[2px] opacity-0 relative shrink-0 w-full" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0">
      <div className="[word-break:break-word] flex flex-col font-['Libre_Baskerville:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white tracking-[-0.6px] whitespace-nowrap">
        <p className="leading-[26px]">Tr</p>
      </div>
      <div className="bg-white h-[2px] opacity-0 relative shrink-0 w-full" />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0">
      <div className="[word-break:break-word] flex flex-col font-['Libre_Baskerville:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white tracking-[-0.6px] whitespace-nowrap">
        <p className="leading-[26px]">Ar</p>
      </div>
      <div className="bg-white h-[2px] opacity-0 relative shrink-0 w-full" />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <Frame1 />
      <Frame2 />
      <Frame3 />
      <Frame4 />
    </div>
  );
}

function Top() {
  return (
    <div className="content-stretch flex flex-col h-[551px] items-start justify-between relative shrink-0 w-full" data-name="Top">
      <Menu />
      <div className="content-stretch flex items-center justify-center py-[4px] relative shrink-0" data-name="Language Switcher">
        <Frame />
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Content">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-between px-[16px] py-[24px] relative size-full">
          <Top />
          <div className="bg-[#e9e5da] relative rounded-[12px] shrink-0 w-full" data-name="Button / Dark">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center px-[24px] py-[14px] relative size-full">
                <p className="[word-break:break-word] font-['Libre_Baskerville:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#28282a] text-[16px] text-center text-ellipsis whitespace-nowrap">RSVP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Menu1() {
  return (
    <div className="bg-[#7b9261] content-stretch flex flex-col items-start relative size-full" data-name="Menu 376">
      <Header />
      <Content1 />
    </div>
  );
}