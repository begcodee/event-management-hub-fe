"use client";

import React, { useState, useEffect } from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  IconButton,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function NavItem({ children, href }) {
  return (
    <li>
      <Typography
        as="a"
        href={href || "#"}
        target={href ? "_blank" : "_self"}
        variant="small"
        className="font-medium"
      >
        {children}
      </Typography>
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  function handleOpen() {
    setOpen((cur) => !cur);
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 960) {
        setOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setIsScrolling(window.scrollY > 0);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MTNavbar
      fullWidth
      shadow={false}
      blurred={false}
      color={isScrolling ? "white" : "transparent"}
      className="fixed top-0 z-50 border-0"
    >
      <div className="container mx-auto flex items-center justify-between">

        <Typography
          as="a"
          target="_blank"
          variant="h6"
          color={isScrolling ? "gray" : "white"}
        >
         <img
            src="/logo.png"
            alt="Your Company"
            className="h-12 w-auto mx-auto bg-white rounded-full"
          />
        </Typography>

        <div className="hidden gap-2 lg:flex lg:items-center">
          <a href="/signup">
            <Button color={isScrolling ? "gray" : "white"} size="sm">
              Sign Up
            </Button>
          </a>
          <a href="/Login">
            <Button
              color={isScrolling ? "gray" : "white"}
              size="sm"
              variant="outlined"
            >
              Log In
            </Button>
          </a>
        </div>
        <IconButton
          variant="text"
          color={isScrolling ? "gray" : "white"}
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="container mx-auto mt-4 rounded-lg border-t border-blue-gray-50 bg-white px-6 py-5">
          <div className="mt-4 flex items-center gap-2">
            <a href="/signup">
              <Button color="gray" size="sm" className="ml-auto">
                Sign Up
              </Button>
            </a>
            <a href="/Login">
              <Button color="gray" size="sm" className="ml-auto" variant="outlined">
                Log In
              </Button>
            </a>
          </div>
        </div>
      </Collapse>
    </MTNavbar>
  );
}

export default Navbar;
