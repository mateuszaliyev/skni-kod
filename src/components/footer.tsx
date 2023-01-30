import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";

import { Link } from "@/components/link";

import {
  SKNI_KOD_FACEBOOK,
  SKNI_KOD_GITHUB,
  SKNI_KOD_INSTAGRAM,
} from "@/environment";

import { CONTAINER_STYLES } from "@/styles";

import { cx } from "@/utilities/cx";

export const Footer = () => (
  <footer
    className={cx(
      CONTAINER_STYLES,
      "mt-12 flex items-center justify-between border-t border-gray-200 py-12 dark:border-none"
    )}
  >
    <ul className="flex gap-4">
      <li>
        <Link
          className="text-gray-500 outline-none transition hover:text-sky-500 focus:text-sky-500"
          href={SKNI_KOD_FACEBOOK}
        >
          <FaFacebook className="h-5 w-5" />
        </Link>
      </li>
      <li>
        <Link
          className="text-gray-500 outline-none transition hover:text-current focus:text-current"
          href={SKNI_KOD_GITHUB}
        >
          <FaGithub className="h-5 w-5" />
        </Link>
      </li>
      <li>
        <Link
          className="text-gray-500 outline-none transition hover:text-rose-500 focus:text-rose-500"
          href={SKNI_KOD_INSTAGRAM}
        >
          <FaInstagram className="h-5 w-5" />
        </Link>
      </li>
    </ul>
    <div className="text-gray-500">
      &copy; {new Date().getFullYear()} SKNI KOD
    </div>
  </footer>
);
