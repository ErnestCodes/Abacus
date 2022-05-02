import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { LockClosedIcon } from "@heroicons/react/solid";
import HomePage from "../src/components/HomePage";

const Home: NextPage = () => {
  return <HomePage />;
};

export default Home;
