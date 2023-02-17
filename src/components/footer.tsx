import type { IconType } from "react-icons";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

import { Link } from "@/components/link";

import {
  SKNI_KOD_FACEBOOK,
  SKNI_KOD_GITHUB,
  SKNI_KOD_INSTAGRAM,
  SKNI_KOD_LINKED_IN,
} from "@/environment";

import { CONTAINER_STYLES } from "@/styles";

import { cx } from "@/utilities/cx";

type FooterSocialMediaLinkProps = {
  className?: string;
  href: string;
  icon: IconType;
  name: string;
};

const FooterSocialMediaLink = ({
  className,
  href,
  icon: Icon,
  name,
}: FooterSocialMediaLinkProps) => (
  <li>
    <Link
      className={cx("text-gray-500 outline-none transition", className)}
      href={href}
      target="_blank"
    >
      <span className="sr-only">{name}</span>
      <Icon className="h-5 w-5" />
    </Link>
  </li>
);

export const Footer = () => (
  <footer
    className={cx(
      CONTAINER_STYLES,
      "mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-gray-200 py-12 dark:border-none sm:grid-cols-2"
    )}
  >
    <ul className="flex gap-4">
      <FooterSocialMediaLink
        className="hover:text-sky-500 focus-visible:text-sky-500"
        href={SKNI_KOD_FACEBOOK}
        icon={FaFacebook}
        name="Facebook"
      />
      <FooterSocialMediaLink
        className="hover:text-current focus-visible:text-current"
        href={SKNI_KOD_GITHUB}
        icon={FaGithub}
        name="GitHub"
      />
      <FooterSocialMediaLink
        className="hover:text-rose-500 focus-visible:text-rose-500"
        href={SKNI_KOD_INSTAGRAM}
        icon={FaInstagram}
        name="Instagram"
      />
      <FooterSocialMediaLink
        className="hover:text-sky-600 focus-visible:text-sky-600"
        href={SKNI_KOD_LINKED_IN}
        icon={FaLinkedin}
        name="LinkedIn"
      />
    </ul>
    <div className="text-gray-500">
      &copy; {new Date().getFullYear()} SKNI KOD
    </div>
  </footer>
);
