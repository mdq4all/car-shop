"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Listbox, Transition } from "@headlessui/react";
import { CustomFilterProps } from "@/types";
import { updateSearchParams } from "@/utils";

export default function CustomFilter({ title, options }: CustomFilterProps) {
  const [selected, setSelected] = useState(options[0]);
  const router = useRouter();

  const handleUpdateParams = (e: {title:string, value:string}) => {
    const newPathName = updateSearchParams(title, e.value.toLowerCase())
    router.push(newPathName)
  }

  return (
    <div className="w-fit">
      <Listbox value={selected} onChange={(e) => {setSelected(e); handleUpdateParams(e)}}>
        <div className="relative w-fit z-10">
          <Listbox.Button className="custom-filter__btn">
            <span className="block truncate capitalize">{title}</span>
            <Image
              src="/chevron-up-down.svg"
              width={20}
              height={20}
              alt="chevron up down"
              className="ml-4 object-contain"
            />
          </Listbox.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Listbox.Options className="custom-filter__options">
              {options.map((option) => (
                <Listbox.Option
                  key={option.title}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-primary-blue text-white" : "text-gray-600"
                    }`
                  }
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected ? "font-bold" : "font-normal"
                      }`}
                    >
                      {option.title}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
