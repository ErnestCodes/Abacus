import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { LockClosedIcon } from "@heroicons/react/solid";

const Home: NextPage = () => {
  return (
    <div className="h-screen items-center">
      <h1 className="italic font-mono text-4xl text-center py-10 px-5">
        Welcome visit /register to Register
      </h1>
    </div>
  );
};

export default Home;
