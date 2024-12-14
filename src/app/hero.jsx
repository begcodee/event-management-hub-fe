"use client";

import React from "react";
import Image from "next/image";
import { Typography, IconButton } from "@material-tailwind/react";
import { CalendarD } from "@/components/Calendar";

function Hero() {
  return (
    <div className="h-screen w-full bg-[url('/image/backgrounds.jpg')] bg-cover bg-no-repeat">
      <header className="grid !min-h-[39rem] px-8">
        <div className="container mx-auto mt-32 grid h-full w-full grid-cols-1 place-items-center lg:mt-14 lg:grid-cols-2">
          <div className="col-span-1">
            <Typography variant="h1" color="white" className="mb-4">
              CAMPUS <br /> Event Management Hub
            </Typography>
            <Typography
              variant="lead"
              className="mb-7 !text-white md:pr-16 xl:pr-28"
            >
              Providing registration ease to students and staff.
            </Typography>
          <div className="hidden gap-2 lg:flex lg:items-center">
          <IconButton
            variant="text"
            size="xl"
            color="white"
          >
            <i className="fa-brands fa-twitter text-xl" />
          </IconButton>
          <IconButton
            variant="text"
            size="sm"
            color="white"
          >
            <i className="fa-brands fa-facebook text-xl" />
          </IconButton>
          <IconButton
            variant="text"
            size="md"
            color="white"
          >
            <i className="fa-brands fa-instagram text-xl" />
          </IconButton>
        </div>
          </div>
          <CalendarD />
        </div>
      </header>
    </div>
  );
}

export default Hero;
