import { useEffect } from "react";
import Hero from "../components/hero.js";

/**
 * Home Component
 * @param {Object} props
 * @param {string[]} props.logos
 *
 */
export default function Home({ logos }) {
  useEffect(() => {
    if (window.location.hash) {
      location.hash = window.location.hash;
    }
  }, []);
  return (
    <>
      <Hero />
    </>
  );
}
