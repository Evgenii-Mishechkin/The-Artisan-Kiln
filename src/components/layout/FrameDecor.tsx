import Image from "next/image";

const BELOW_HEADER = "top-[calc(2.5rem+3px)]";

const CORNER_SIZE =
  "h-[11rem] w-auto sm:h-[12rem] lg:h-[26rem] xl:h-[28rem]";

const CORNERS = [
  {
    id: "up-left",
    src: "/assets/decor/up-left.png",
    position: `left-0 ${BELOW_HEADER}`,
  },
  {
    id: "up-right",
    src: "/assets/decor/up-right.png",
    position: `right-0 ${BELOW_HEADER}`,
  },
  {
    id: "down-left",
    src: "/assets/decor/down-left.png",
    position: "bottom-0 left-0",
  },
  {
    id: "down-right",
    src: "/assets/decor/down-right.png",
    position: "bottom-0 right-0",
  },
] as const;

function FrameCorner({
  src,
  position,
}: {
  src: string;
  position: string;
}) {
  return (
    <Image
      src={src}
      alt=""
      width={520}
      height={520}
      priority
      unoptimized
      className={`absolute select-none ${CORNER_SIZE} ${position}`}
      aria-hidden
    />
  );
}

export function FrameDecor() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] min-h-dvh w-full overflow-visible"
      aria-hidden
    >
      {CORNERS.map((corner) => (
        <FrameCorner key={corner.id} src={corner.src} position={corner.position} />
      ))}
    </div>
  );
}
