import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import shuffle from "lodash/shuffle";

function Center() {
  const [fromColor, setFromColor] =
    useState<typeof fromGradientColors[number]>(null);

  const { data: session } = useSession();
  const fromGradientColors = [
    "from-green-500",
    "from-red-500",
    "from-purple-500",
    "from-orange-500",
    "from-yellow-500",
    "from-blue-500",
    "from-sky-500",
    "from-pink-500",
  ] as const;

  useEffect(() => {
    setFromColor(shuffle(fromGradientColors)[0]);
  }, []);

  return (
    <div className="grow text-white">
      <header className="absolute top-5 right-7">
        <div className="space-x-2 p-1 pr-2 flex items-center bg-black rounded-full opacity-90 hover:opacity-80 cursor-pointer">
          <img src={session?.user?.image} className="rounded-full w-8 h-8" />
          <p className="text-sm">{session?.user?.name}</p>
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b ${fromColor} to-black text-white p-8 h-80`}
      >
        <div>Hello</div>
      </section>
    </div>
  );
}

export default Center;
