import { ReactNode } from "react";

import { clsx } from "clsx";

import { Container } from "@/components/container";
import { Deck } from "@/components/deck";
import { Headline } from "@/components/headline";
import { Kicker } from "@/components/kicker";
import { Link } from "@/components/link";
import { Marquee } from "@/components/marquee";

import { useI18nContext } from "@/i18n";

export type Partner = {
  href: string;
  logo: ReactNode;
  name: string;
};

const partnerLogoClassNames =
  "h-8 fill-current opacity-50 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0";

const partners: Partner[] = [
  {
    href: "https://botland.com.pl/",
    logo: (
      <svg
        className={partnerLogoClassNames}
        viewBox="0 0 600.367 135.002"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.547.41c1.49-.36 3.03-.39 4.56-.41 33.35.06 66.71 0 100.06.03 9.22.03 17.49 8.56 16.82 17.84-.05 31.67-.02 63.35-.02 95.03-.07 3.56.42 7.28-.92 10.67-2.37 6.53-8.88 11.37-15.88 11.42-33.72.02-67.44.01-101.15.01-9.07-.01-17.12-8.04-16.95-17.15-.11-33.34-.06-66.68-.02-100.01-.36-8.08 5.58-15.77 13.5-17.43m12.1 49.39h61.15c.07-5.35-.55-11.21-4.28-15.36-4.14-4.49-10.54-5.79-16.4-5.93h-40.47m.4 28.53c-.75 5.9-.28 11.88-.37 17.81-.19 1.47.42 3.71 2.35 3.35 18.99.11 37.98-.07 56.97.08 3.92-.29 3.97 6.66.2 6.78-19.64.19-39.3-.03-58.95.1-.98 3.84-.49 7.81-.58 11.71 0 3.22-.33 6.52.7 9.64 20.59.03 41.18 0 61.78.01 5.99-.07 12.49-1.35 16.85-5.78 3.97-4.23 4.51-10.37 4.29-15.88-.26-6.82 1.13-14.32-2.8-20.39-3.7-5.71-10.93-7.56-17.36-7.52-21.03.03-42.06-.14-63.08.09z"
          fill="#e74c3c"
        />
        <path
          d="M25.647 28.51h40.47c5.86.14 12.26 1.44 16.4 5.93 3.73 4.15 4.35 10.01 4.28 15.36h-61.15zm0 28.44h63.48c6.43-.04 13.66 1.81 17.36 7.52 3.93 6.07 2.54 13.57 2.8 20.39.22 5.51-.32 11.65-4.29 15.88-4.36 4.43-10.86 5.71-16.85 5.78h-62.5V85.06h59.55c3.77-.12 3.72-7.07-.2-6.78h-59.35z"
          fill="#fff"
        />
        <path d="M167.927 42.87c0-1.77.12-4.28 2.28-4.72 2.71-.54 7.44-1.27 8.23 2.37.51 3.54.15 7.14.23 10.71 11.37.07 22.75-.13 34.12.1 6.84.41 14.52 1.03 19.72 6.03 4.62 4.6 3.08 11.61 3.33 17.46-.34 6.15 1.46 13.52-3.32 18.43-5.87 5.69-14.63 6.01-22.33 6.31-9.85-.21-20.01.99-29.53-2.18-3.72-1.29-7.53-2.96-10.21-5.95-2.07-2.31-2.57-5.52-2.53-8.52.05-13.35.02-26.7.01-40.04m10.74 17.3c.15 8.55-.28 17.11.19 25.64 1.71 2.28 4.64 3.04 7.27 3.7 6.86 1.69 13.96.96 20.94 1.11 4.58-.06 9.28.34 13.75-.93 2.16-.61 4.16-2.38 4.32-4.74.33-5.02-.03-10.07.15-15.1-.06-2.46.42-5.59-2.02-7.13-3.24-2.17-7.33-2.28-11.1-2.53-11.17-.07-22.34-.02-33.5-.02zm136.54-18.37c-.23-1.84 1.12-3.58 3.01-3.61 2.38-.29 5.72-.86 7.14 1.65 1.05 3.69.42 7.6.56 11.39 3.95.1 7.91-.22 11.85.13 4.55.48 4.45 9.34-.59 8.77-3.75.15-7.5-.03-11.24.03.09 8.53-.22 17.07.12 25.59 3.21 4.28 9.44 4.43 14.35 4.95.75 2.99 1.26 6.55-1.16 8.95-6.4-.7-13.09-1.67-18.51-5.41-3.4-2.24-5.84-6.15-5.58-10.32.06-14.04-.04-28.08.05-42.12zm32.55.05c-.41-2.06 1.3-3.76 3.3-3.74 2.44-.31 6.73-.62 6.99 2.78.35 14.34-.02 28.71.16 43.05-.16 1.55.62 3.01 2 3.72 3.87 2.23 8.41 2.71 12.77 3.14-.06 2.79 1.74 7.42-1.83 8.62-6.12-.21-12.36-1.65-17.61-4.91-3.3-2.01-5.89-5.63-5.79-9.61-.01-14.35-.03-28.7.01-43.05zm242.34-1.89c.75-2.58 3.99-2.21 6.08-2.14 1.72.07 4.18.88 4.12 3 .13 14.69.01 29.39.06 44.08.26 5.41-4.4 9.29-8.94 11.21-10.12 4.69-21.54 3.22-32.33 3.47-7.87-.26-16.63-.45-23-5.71-4.96-4.59-3.6-11.97-3.81-18.01.36-6.07-.71-13.14 3.67-18.07 4.97-5.23 12.69-6.03 19.5-6.45 11.5-.25 23.01-.04 34.52-.1.09-3.76-.23-7.54.13-11.28m-35.65 20.33c-3.89.45-9.05.64-11.01 4.66-.57 4.95-.19 9.96-.41 14.93.12 2.95-.39 6.73 2.44 8.65 4.33 2.7 9.72 1.94 14.58 2.1 8.21-.31 16.6.86 24.64-1.3 2.52-.64 5.32-2.44 5.23-5.37.14-7.92.01-15.86.03-23.78-11.83.05-23.67-.19-35.5.11zM264.277 51c6.61-.32 13.22-.02 19.83-.14 7.29.23 15.58.58 21.12 5.95 4.83 5.12 2.91 12.69 3.28 19.02-.3 5.78 1.41 12.72-3.17 17.28-6.63 6.4-16.51 6.48-25.14 6.47-9.85-.15-20.24.92-29.45-3.35-4.22-1.83-8.15-5.57-8.27-10.45-.08-6.66-.01-13.34-.03-20-.08-4.02 2.35-7.77 5.64-9.93 4.76-3.21 10.53-4.48 16.19-4.85m-3.7 9.53c-3.02.69-6.89 1.85-7.56 5.36-.44 4.3-.03 8.65-.19 12.97.16 3.03-.83 7.08 2.22 9.02 6.01 3.6 13.33 2.6 20.02 2.73 6.97-.19 14.68 1.08 20.89-2.89 2.69-1.69 1.91-5.24 2.05-7.91-.26-5.15.42-10.37-.34-15.48-1.96-4.26-7.61-4.1-11.59-4.49-8.49.19-17.09-.7-25.5.69zm139.45-.75c-4.83.29-5.09-9.18-.01-8.8 11.36-.12 22.79-.58 34.09.78 5.27.74 11.06 2.2 14.46 6.64 2.76 3.54 2.22 8.28 2.31 12.48-.2 5.83.38 11.71-.42 17.5-.96 5.51-6.29 8.93-11.4 10.05-9.51 1.98-19.28.84-28.91 1.14-9.29.25-19.82.02-27.05-6.69-3.92-3.59-3.1-9.31-3.05-14.08-.07-3.9 2.16-7.53 5.34-9.66 5.19-3.52 11.66-4.17 17.76-4.28 12.49-.14 24.98.1 37.46-.12-2.17-4.16-7.31-4.69-11.48-4.9-9.7-.13-19.4.07-29.1-.06m-9.05 17.96c-.86 2.74-.58 5.81-.19 8.63 2.2 3.24 6.67 3.81 10.29 4.2 10.01.09 20.03.07 30.04.01 3.16-.18 7.41-.53 8.62-4.05 1.32-4.12.33-8.51.43-12.75-12.71 0-25.42-.02-38.13 0-3.89.18-8.42.79-11.06 3.96zM479.297 51c6.6-.28 13.21-.07 19.82-.15 7 .23 14.56.39 20.62 4.35 3.52 2.28 4.87 6.65 4.68 10.66-.1 10.01.09 20.01-.08 30.01.13 1.99-1.42 3.55-3.35 3.65-2.77.21-7.33.23-7.22-3.67-.31-10.33.01-20.68-.13-31.02.33-2.62-2.5-3.98-4.65-4.43-5.57-1.02-11.28-.46-16.91-.59-5.98.13-12.02-.39-17.96.48-2.38.29-5.52 1.58-5.22 4.5-.12 10.35.12 20.71-.08 31.05.14 2.5-2.42 4.07-4.69 3.74-2.42.11-6.12-.43-5.95-3.65-.11-10.38-.03-20.77-.04-31.15-.11-3.79 1.68-7.65 4.94-9.69 4.8-3.09 10.65-3.71 16.22-4.09z" />
      </svg>
    ),
    name: "Botland",
  },
  {
    href: "https://deloitte.com/",
    logo: (
      <svg
        className={partnerLogoClassNames}
        viewBox="0 0 283.5 53"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M43.1 25.1c0 8.7-2.3 15.3-7 20-4.7 4.7-11.2 7-19.7 7H0V.1h17.6C25.7.1 32 2.2 36.5 6.5c4.3 4.4 6.6 10.5 6.6 18.6m-14.3.5c0-4.8-.9-8.3-2.8-10.6-1.8-2.3-4.6-3.4-8.4-3.4h-4v29.1h3.1c4.2 0 7.2-1.2 9.2-3.7 2-2.5 2.9-6.3 2.9-11.4M88.5 0h13.1v52.2H88.5zm55.9 32.7c0 6.3-1.7 11.3-5 14.8s-8 5.3-14 5.3c-5.7 0-10.3-1.8-13.7-5.4-3.4-3.6-5.1-8.5-5.1-14.7 0-6.3 1.7-11.2 5-14.7s8-5.2 14-5.2c3.7 0 7 .8 9.9 2.4 2.9 1.6 5 3.9 6.6 7 1.6 2.9 2.3 6.5 2.3 10.5m-24.5 0c0 3.3.4 5.9 1.3 7.6.9 1.7 2.3 2.6 4.4 2.6 2 0 3.5-.9 4.3-2.6.8-1.7 1.3-4.3 1.3-7.6s-.4-5.8-1.3-7.5c-.8-1.7-2.3-2.5-4.3-2.5s-3.4.8-4.3 2.5c-.9 1.7-1.4 4.2-1.4 7.5m29.7-19.3h13.1v38.8h-13.1zm0-13.4h13.1v8.7h-13.1zm39.5 42.3c1.8 0 3.9-.4 6.3-1.3v9.8c-1.8.8-3.4 1.3-5 1.7-1.6.3-3.5.5-5.6.5-4.4 0-7.5-1.1-9.5-3.3-1.9-2.2-2.9-5.6-2.9-10.1v-16h-4.6v-10h4.6V3.5l13.2-2.3v12.2h8.3v10h-8.3v15.1c0 2.5 1.2 3.8 3.5 3.8m30.3 0c1.8 0 3.9-.4 6.3-1.3v9.8c-1.8.8-3.4 1.3-5 1.7-1.6.3-3.5.5-5.6.5-4.4 0-7.5-1.1-9.5-3.3-1.9-2.2-2.9-5.6-2.9-10.1v-16h-4.6v-10h4.6v-10l13.2-2.1v12.2h8.3v10h-8.3v15.1c-.1 2.2 1.1 3.5 3.5 3.5m41.2-25c-3.1-3-7.5-4.6-13.2-4.6-6 0-10.6 1.7-13.8 5.3-3.2 3.5-4.8 8.5-4.8 15.1 0 6.3 1.7 11.2 5.2 14.7 3.5 3.4 8.4 5.1 14.7 5.1 3 0 5.6-.2 7.8-.6 2.2-.4 4.3-1.1 6.3-2.2l-2-8.7c-1.5.6-2.9 1.1-4.2 1.4-1.9.4-4 .7-6.3.7-2.5 0-4.5-.6-6-1.8-1.5-1.2-2.2-2.9-2.3-5.1h23.3v-5.9c-.1-6-1.6-10.4-4.7-13.4M242.2 28c.2-2.1.8-3.7 1.8-4.7s2.3-1.5 3.9-1.5c1.7 0 3 .6 4 1.7s1.5 2.6 1.6 4.5h-11.3zM78.8 17.3c-3.1-3-7.5-4.6-13.2-4.6-6 0-10.6 1.7-13.8 5.3-3.2 3.5-4.8 8.5-4.8 15.1 0 6.3 1.7 11.2 5.2 14.7 3.5 3.4 8.4 5.1 14.7 5.1 3 0 5.6-.2 7.8-.6 2.2-.4 4.3-1.1 6.3-2.2l-2-8.7c-1.5.6-2.9 1.1-4.2 1.4-1.9.4-4 .7-6.3.7-2.5 0-4.5-.6-6-1.8-1.5-1.2-2.2-2.9-2.3-5.1h23.3v-5.9c0-6-1.6-10.4-4.7-13.4M60.4 28c.2-2.1.8-3.7 1.8-4.7s2.3-1.5 3.9-1.5c1.7 0 3 .6 4 1.7s1.5 2.6 1.6 4.5H60.4z" />
        <path
          d="M268.4 45.5c0-4.1 3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5-3.4 7.5-7.5 7.5-7.5-3.4-7.5-7.5"
          fill="#80C342"
        />
      </svg>
    ),
    name: "Deloitte",
  },
  {
    href: "https://hobbistycznie.pl/",
    logo: (
      <svg
        className={clsx("mt-2", partnerLogoClassNames)}
        viewBox="0 0 742.62 80.088"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M240.93 0v9.549h10.564V0zm334.58 0v9.549h10.562V0zm147.56 0v47.658c0 2.736.488 5.052 1.463 6.947.975 1.869 2.206 3.4 3.695 4.592 1.49 1.165 3.088 2.005 4.793 2.52 1.734.515 3.36.771 4.877.771h4.713l.002-10.562H737.9c-1.22 0-2.235-.38-3.047-1.139-.813-.785-1.22-1.829-1.22-3.129V0zM125.62.002v47.656c0 1.815.23 3.454.691 4.916.46 1.436 1.07 2.71 1.829 3.82a13.97 13.97 0 0 0 2.681 2.803 16.26 16.26 0 0 0 3.129 1.87c1.11.486 2.22.85 3.33 1.095 1.111.216 2.169.326 3.17.326h19.055c1.815 0 3.44-.23 4.875-.691 1.435-.461 2.696-1.07 3.78-1.829a12.64 12.64 0 0 0 2.802-2.681 15.2 15.2 0 0 0 1.91-3.127c.487-1.111.84-2.222 1.057-3.332.243-1.111.365-2.169.365-3.17V33.357c0-1.815-.23-3.44-.691-4.875-.46-1.436-1.07-2.695-1.828-3.78a11.884 11.884 0 0 0-2.641-2.802 14.765 14.765 0 0 0-3.17-1.91 14.987 14.987 0 0 0-3.29-1.057 14.826 14.826 0 0 0-3.169-.365H140.45v10.564h19.055c1.246 0 2.262.38 3.047 1.139.785.73 1.178 1.76 1.178 3.087V47.66c0 1.272-.38 2.301-1.137 3.086-.73.787-1.76 1.18-3.088 1.18H140.45c-1.219 0-2.234-.38-3.047-1.139-.813-.785-1.22-1.827-1.22-3.127V.001zm57.449 0v47.656c0 1.815.23 3.454.69 4.916.46 1.436 1.07 2.71 1.83 3.82a13.924 13.924 0 0 0 2.68 2.803 16.278 16.278 0 0 0 3.128 1.87c1.11.486 2.222.85 3.332 1.095 1.111.216 2.169.326 3.17.326h19.055c1.815 0 3.439-.23 4.873-.691 1.437-.461 2.698-1.07 3.781-1.829a12.64 12.64 0 0 0 2.803-2.681 15.2 15.2 0 0 0 1.91-3.127c.487-1.111.84-2.222 1.057-3.332.243-1.111.365-2.169.365-3.17V33.357c0-1.815-.23-3.44-.691-4.875-.46-1.436-1.07-2.695-1.829-3.78a11.911 11.911 0 0 0-2.64-2.802 14.767 14.767 0 0 0-3.17-1.91 14.987 14.987 0 0 0-3.29-1.057 14.834 14.834 0 0 0-3.169-.365h-19.055v10.564h19.055c1.246 0 2.262.38 3.047 1.139.785.73 1.178 1.76 1.178 3.087V47.66c0 1.272-.38 2.301-1.137 3.086-.731.787-1.76 1.18-3.088 1.18h-19.055c-1.219 0-2.236-.38-3.049-1.139-.812-.785-1.219-1.827-1.219-3.127V.001zM-.011 4.225v58.264h10.562v-23.81h37.096v23.81h10.562V4.227H47.647v23.809H10.551V4.225zm321.54.002v14.342h-13.732v10.564h13.73v33.355h10.686V29.133h18.445l.002-10.564h-18.445V4.227zM82.999 18.569c-1.463 0-3.062.258-4.795.773s-3.344 1.367-4.834 2.559c-1.463 1.165-2.696 2.694-3.697 4.59-.976 1.869-1.465 4.16-1.465 6.869v14.299c0 2.736.488 5.051 1.463 6.947 1.003 1.869 2.235 3.4 3.697 4.592 1.49 1.164 3.103 2.004 4.836 2.52 1.733.512 3.331.769 4.793.769h19.053c1.003 0 2.059-.107 3.168-.323a16.612 16.612 0 0 0 3.332-1.097 15.738 15.738 0 0 0 3.17-1.87 13.087 13.087 0 0 0 2.643-2.802c.758-1.11 1.367-2.384 1.828-3.82.46-1.462.69-3.102.69-4.916l.001-14.301c0-1.49-.27-3.101-.81-4.834a14.07 14.07 0 0 0-2.522-4.795c-1.165-1.49-2.694-2.722-4.59-3.698-1.896-.974-4.197-1.462-6.906-1.462zm157.92 0v43.92h10.564v-43.92zm31.936 0c-1.3 0-2.696.231-4.186.691a12.135 12.135 0 0 0-4.144 2.154c-1.273 1.002-2.328 2.314-3.168 3.94-.84 1.598-1.26 3.575-1.26 5.931 0 1.22.217 2.535.65 3.944.461 1.408 1.192 2.72 2.194 3.94 1.03 1.218 2.355 2.234 3.98 3.046 1.626.812 3.605 1.219 5.934 1.219h16.373c2.709 0 4.13 1.409 4.266 4.227 0 1.38-.367 2.436-1.098 3.166-.731.732-1.815 1.1-3.25 1.1h-28.521v10.561h28.604c1.002 0 2.058-.109 3.168-.324a16.612 16.612 0 0 0 3.332-1.098 15.691 15.691 0 0 0 3.168-1.869 13.026 13.026 0 0 0 2.64-2.803c.76-1.11 1.369-2.384 1.829-3.82.46-1.462.691-3.1.691-4.914 0-1.49-.271-3.103-.813-4.836a14.044 14.044 0 0 0-2.519-4.793c-1.165-1.49-2.695-2.724-4.59-3.699-1.896-.975-4.197-1.46-6.906-1.46h-17.146a2.082 2.082 0 0 1-.691-.206c-.19-.108-.351-.283-.487-.527-.134-.244-.215-.583-.242-1.016 0-.216.012-.433.04-.65.026-.244.107-.46.243-.65.162-.217.392-.379.69-.487.324-.136.759-.203 1.3-.203h25.882V18.569zm157.15 0c-1.815 0-3.44.231-4.875.691-1.437.461-2.708 1.07-3.818 1.828a13.038 13.038 0 0 0-2.805 2.64 15.69 15.69 0 0 0-1.87 3.17 16.786 16.786 0 0 0-1.097 3.292 16.623 16.623 0 0 0-.324 3.17v14.3c0 2.736.488 5.052 1.463 6.948 1.002 1.869 2.234 3.398 3.697 4.59 1.49 1.165 3.1 2.005 4.834 2.52 1.733.514 3.332.77 4.795.77h28.645V51.928h-28.562c-1.409 0-2.48-.367-3.21-1.098-.732-.731-1.097-1.788-1.097-3.17V33.44c0-1.463.351-2.546 1.055-3.25.732-.705 1.789-1.057 3.17-1.057h28.645V18.57zm35.955 0V29.13h25.393l-24.295 24.297a5.347 5.347 0 0 0-1.502 2.761 5.361 5.361 0 0 0 .324 3.05 5.859 5.859 0 0 0 1.95 2.355 5.24 5.24 0 0 0 2.966.892h38.11V51.924h-25.394l24.418-24.377a5.135 5.135 0 0 0 1.383-2.681c.216-1.03.107-2.046-.326-3.047-.407-1.03-1.058-1.828-1.951-2.397a5.15 5.15 0 0 0-2.885-.853zm109.54 0v43.92h10.562v-43.92zm34.33 0c-2.654 0-4.916.488-6.785 1.463-1.842.975-3.346 2.193-4.51 3.656a14.08 14.08 0 0 0-2.479 4.713c-.514 1.679-.771 3.25-.771 4.713v14.83c0 2.654.486 4.916 1.46 6.785.976 1.841 2.182 3.343 3.618 4.508 1.462 1.138 3.033 1.965 4.713 2.48 1.706.515 3.291.771 4.754.771h19.055V52.412H609.91c-1.3 0-2.396-.391-3.29-1.177-.867-.786-1.302-1.883-1.302-3.291V33.196c0-1.302.394-2.386 1.18-3.252.786-.894 1.897-1.34 3.332-1.34h19.055c1.247 0 2.303.392 3.17 1.178.894.785 1.342 1.868 1.342 3.25 0 1.3-.394 2.397-1.18 3.29-.786.867-1.896 1.301-3.332 1.301H609.83v10.035h19.055c2.655 0 4.903-.487 6.744-1.462 1.87-.976 3.371-2.18 4.508-3.616 1.165-1.462 2.007-3.033 2.521-4.713.515-1.706.772-3.291.772-4.753 0-2.655-.489-4.902-1.463-6.743-.976-1.87-2.193-3.373-3.655-4.51a13.71 13.71 0 0 0-4.714-2.519c-1.68-.515-3.25-.773-4.713-.773zm70.611 0c-.975 0-2.031.122-3.17.365-1.11.217-2.22.57-3.33 1.056a15.12 15.12 0 0 0-3.129 1.91 12.64 12.64 0 0 0-2.682 2.803c-.758 1.084-1.367 2.342-1.828 3.778-.46 1.436-.69 3.061-.69 4.877v42.865h10.563V33.358c0-1.382.366-2.423 1.098-3.127.731-.732 1.814-1.098 3.25-1.098h18.975c1.38 0 2.423.352 3.127 1.057.732.703 1.097 1.786 1.097 3.25v14.219c0 1.38-.352 2.437-1.056 3.168-.704.732-1.76 1.1-3.168 1.1h-19.055v10.561h19.055c1.002 0 2.058-.108 3.168-.324a16.88 16.88 0 0 0 3.29-1.098 15.674 15.674 0 0 0 3.17-1.869 13.027 13.027 0 0 0 2.641-2.803c.758-1.11 1.368-2.383 1.828-3.82.461-1.462.692-3.101.692-4.916v-14.3c0-1.003-.123-2.06-.367-3.17a15.042 15.042 0 0 0-1.055-3.29 14.709 14.709 0 0 0-1.91-3.17 11.94 11.94 0 0 0-2.803-2.64c-1.085-.758-2.344-1.368-3.78-1.828-1.435-.46-3.06-.692-4.874-.692zm-323.08.002v29.09c0 2.735.487 5.05 1.46 6.947.977 1.869 2.21 3.398 3.7 4.59 1.49 1.165 3.088 2.005 4.793 2.52 1.733.514 3.36.77 4.877.77h19.055V51.928h-18.975c-1.435 0-2.518-.367-3.25-1.098-.731-.73-1.098-1.787-1.098-3.168v-29.09zm38.109 0v48.143c0 1.382-.35 2.438-1.055 3.17-.704.73-1.76 1.097-3.17 1.097H372.19v9.108h25.568a14.677 14.677 0 0 0 3.116-1.875 11.908 11.908 0 0 0 2.64-2.805c.758-1.083 1.368-2.356 1.828-3.818.46-1.436.692-3.06.692-4.875V18.57zm127.25 0c-.73 0-1.422.134-2.072.404-.651.271-1.219.65-1.705 1.139a4.807 4.807 0 0 0-1.14 1.666c-.27.623-.405 1.299-.405 2.029v38.68h10.562V29.133h18.486c1.274 0 2.451.217 3.535.65a8.105 8.105 0 0 1 2.885 1.787c.812.786 1.448 1.735 1.908 2.844.489 1.084.732 2.316.732 3.697v24.377h10.564V38.111c0-2.384-.299-4.523-.894-6.42-.596-1.895-1.408-3.56-2.438-4.996-1.002-1.462-2.167-2.695-3.494-3.697-1.3-1.03-2.68-1.87-4.142-2.52a19.008 19.008 0 0 0-4.391-1.462 20.988 20.988 0 0 0-4.182-.446zM83.08 29.133h18.973c1.381 0 2.437.352 3.168 1.056.732.704 1.1 1.787 1.1 3.25l.002 14.22c0 1.38-.354 2.437-1.059 3.167-.704.732-1.773 1.1-3.209 1.1H83.082c-1.408 0-2.479-.367-3.21-1.098-.733-.732-1.099-1.79-1.099-3.17v-14.3c0-1.382.366-2.424 1.098-3.128.731-.732 1.801-1.097 3.21-1.097zm569.29 22.793a4.92 4.92 0 0 0-2.074.445 5.35 5.35 0 0 0-1.664 1.139 5.105 5.105 0 0 0-1.098 1.666 4.936 4.936 0 0 0-.406 1.99c0 .731.135 1.421.406 2.072.27.623.636 1.178 1.096 1.664.488.46 1.044.827 1.668 1.098.65.27 1.34.406 2.072.406.704 0 1.368-.135 1.99-.406a5.112 5.112 0 0 0 1.666-1.098 5.335 5.335 0 0 0 1.137-1.664 4.91 4.91 0 0 0 .447-2.072v-.002c0-.704-.149-1.365-.447-1.988a4.8 4.8 0 0 0-1.137-1.666 4.81 4.81 0 0 0-1.666-1.14 4.55 4.55 0 0 0-1.99-.444z" />
      </svg>
    ),
    name: "Hobbistycznie.pl",
  },
  {
    href: "https://ideo.pl/",
    logo: (
      <svg
        className={clsx(
          "group-hover:fill-ideo dark:group-hover:fill-current",
          partnerLogoClassNames
        )}
        viewBox="0 0 885.81 361.25"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M286.47 20.48C304.65 13.75 322.75 6.8 340.91 0c-.08 77.2.21 154.4.13 231.6.36 21.21-3.53 42.81-13.47 61.7-12.58 24.16-34.49 42.59-59.04 53.83-20.28 9.06-42.45 13.85-64.66 14.12-20.29-.2-40.7-3.42-59.63-10.92-26.96-10.78-51.54-29.51-66.01-55.01-11.48-20.11-15.03-43.9-13.15-66.76 1.58-22.4 9.46-44.54 23.71-62.03 22.9-28.02 58.01-45.65 94.2-47.03 31.64-1.67 65.46 5.96 89.17 28.06-4.88 7.39-9.79 14.75-14.63 22.17-16.31-12.14-36.49-18.26-56.62-19.71-22.62-1.68-46.12 1.54-66.27 12.42-15.04 8.18-28.48 20.04-36.75 35.18-8.73 15.78-11.18 34.33-9.68 52.11 1.36 18.17 7.64 36.22 19.33 50.35 17.12 20.53 42.49 34.45 69.36 36.02 15.6.12 31.41-1.13 46.28-6.2 15.27-5 29.35-14.09 39.38-26.74 12.03-14.97 18.24-33.73 21.22-52.48 3.68-21.83 2.4-44.02 2.63-66.05.04-54.72-.09-109.44.06-164.15zM16.324 54.37c6.05-1.68 12.8-.69 18.06 2.76 5.92 3.77 9.82 10.5 10.14 17.52.46 7.48-3.19 15.04-9.33 19.33-5.64 4.07-13.23 5.21-19.83 3.03C7.044 94.38.744 86.46.114 77.75c-1.12-10.38 6.14-20.76 16.21-23.38zM5.244 131.64c10.96-4.33 22.03-8.37 33.04-12.56.02 73.94 0 147.88.01 221.82-10.98 4.2-22 8.31-32.99 12.49-.06-73.92.05-147.84-.06-221.75zM441.49 128.2c18.15-7.14 37.89-9.75 57.31-8.69 21.11.98 42.3 6.54 60.21 17.97 14.83 9.82 26.75 23.3 37.74 37.12-4.03 7.74-7.77 15.62-11.83 23.35-10.41-13.84-22.88-26.48-38.11-34.95-17.57-9.84-37.97-13.53-57.93-13.38-19.73-.02-39.72 4.26-56.91 14.17-13.35 7.73-25.39 18.3-33.21 31.74-6.42 10.88-9.89 23.32-10.88 35.87 39.4-.02 78.8-.02 118.2 0-3.9 6.33-7.86 12.62-11.74 18.97-35.43.05-70.86 0-106.29.02 1.63 18.91 8.45 37.69 21.21 51.95 9.81 10.81 21.71 19.85 35.09 25.79 18.24 8.11 39.09 9.68 58.54 5.52 18.53-3.94 35.51-13.85 48.91-27.11 7.81-8.52 13.68-18.58 19.37-28.59 9.19-17.33 17.89-34.92 26.59-52.51 5.42-10.87 10.4-21.98 16.29-32.6 5.62-9.15 12.35-17.58 19.47-25.61 12.45-13.87 26.95-26.27 43.91-34.25 28.03-13.21 60.05-15.71 90.53-12.31 34.68 3.9 68.08 20.26 91.32 46.47 11.59 12.8 19.53 28.73 23.41 45.51 4.24 18.65 4.04 38.23.11 56.91-4.03 19.08-13.43 36.96-26.9 51.06-12.01 12.52-26.48 22.72-42.35 29.74-15.91 7.03-33.28 10.5-50.63 10.85-24.13.47-48.95-4.15-69.79-16.76-16.79-10.71-30.05-25.97-42.11-41.6 3.79-8.1 7.6-16.19 11.4-24.29 9.13 13.09 19.95 25.26 33.22 34.27 20.34 14.17 45.79 19.1 70.23 18.18 18.94-.63 38.01-5.29 54.28-15.22 14-8.54 26.44-20.32 33.72-35.18 9.11-18.15 10.37-39.31 7.18-59.1-2.9-17.92-11.31-34.96-24.25-47.75-9.32-9.12-20.22-16.7-32.23-21.83-27.24-11.62-59.92-9.15-85.32 6.01-11.84 7.06-22.54 16.27-30.36 27.7-13.98 19.92-24.82 41.82-35.36 63.69-6.82 14.33-13.43 28.8-21.48 42.51-5.96 10.61-14.52 19.38-22.5 28.46-19.56 22.24-48.07 35.23-77.13 39.12-34.93 4.64-71.93.87-103.31-15.98-16.97-9.18-32.4-21.61-43.94-37.16-10.76-14.43-17.52-31.71-19.77-49.55-2.08-17.38-1.14-35.22 3.55-52.11 5.02-18.02 14.9-34.64 28.33-47.67 12.71-12.29 27.72-22.3 44.21-28.75z" />
      </svg>
    ),
    name: "Ideo",
  },
  {
    href: "https://sklep-elektronika.com/",
    logo: (
      <svg
        className={clsx("mt-2", partnerLogoClassNames)}
        viewBox="0 0 742.03 68.001"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 30.691h5.35l2.36 13.96 3.08-9.4h3.14l3.16 9.4 2.17-13.96h4.64l-3.88 20.21h-5.36l-2.47-8.67-2.84 8.67H4.3zM25.81 30.691h5.35l2.36 13.96 3.08-9.4h3.14l3.16 9.4 2.17-13.96h4.64l-3.88 20.21h-5.36L38 42.231l-2.84 8.67h-5.05zM51.41 30.691h5.35l2.36 13.96 3.08-9.4h3.14l3.16 9.4 2.17-13.96h4.64l-3.88 20.21h-5.36l-2.47-8.67-2.84 8.67h-5.05zM86.342 48.091a3.326 3.326 0 0 1-3.326 3.326 3.326 3.326 0 0 1-3.326-3.326 3.326 3.326 0 0 1 3.326-3.326 3.326 3.326 0 0 1 3.326 3.326zM96.46 18.871c1.9-4.39 6.74-6.91 11.4-6.99 4.52-.04 9.36.08 13.39 2.37-.06 3.67-.03 7.35-.03 11.03l-6.26.03c-.02-2-.03-4-.06-6-4.14-.71-12.08-1.98-11.67 4.47 4.46 5.27 12.63 4.91 17.05 10.28 2.41 2.49 2.4 6.27 1.78 9.46-1 4.17-4.85 7.14-8.89 8.1-5.92 1.31-12.36.57-17.61-2.56.06-3.39.04-6.79.04-10.18 2.01 0 4.03 0 6.04-.01-.01 1.71-.03 3.41-.07 5.12 3.32 1.32 7.11 1.84 10.57.74 2.82-.84 3.58-4.94 1.33-6.78-4.69-3.29-11-3.7-15.11-7.88-3.06-2.8-3.23-7.53-1.9-11.2zM124.72 12.531c3.96 0 7.93 0 11.89.01.01 7.48-.04 14.96.03 22.44 1.63.07 2.47-1.35 3.44-2.35 2.53-2.81 4.69-5.93 7.31-8.65 2.83-.43 5.71-.15 8.56-.14-3.46 4.37-7.87 8.06-10.84 12.74 2.08 3.07 4.66 5.76 6.98 8.65 1.74 0 3.49-.01 5.24-.01v6.32c-3.06 0-6.11.01-9.17-.03-3.13-3.81-6.18-7.71-9.57-11.3-.49-.1-1.49-.29-1.98-.38-.02 3.9 0 7.8-.01 11.71-2.42 0-4.84 0-7.26-.01 0-10.89-.01-21.78 0-32.67-1.54-.01-3.08-.01-4.61-.02-.01-2.1-.01-4.2-.01-6.31zM159.19 12.541c3.98-.01 7.95-.01 11.92-.01.04 8.99-.06 17.99.04 26.98.19 2 .1 4.73 2.23 5.76 2.29 1.59 5.03 0 7.36-.69.86 1.66 1.77 3.29 2.68 4.92-3.91 2.87-9.12 3.36-13.7 2.11-3.9-1.09-6-5.25-5.92-9.09-.07-7.89-.01-15.78-.02-23.66-1.52-.01-3.05-.01-4.57-.01-.01-2.1-.01-4.21-.02-6.31zM187.49 31.951c3.29-10.11 18.83-12.33 25.23-4.09 2.41 3.55 1.82 8.1 1.39 12.11-6.79.03-13.58-.03-20.36.04.51 2.41 1.57 4.89 4.1 5.74 4.44 1.5 9.51.77 13.4-1.84.85 1.59 1.71 3.17 2.57 4.75-5.58 3.82-13.03 4.63-19.34 2.3-7.11-2.98-9.72-12.18-6.99-19.01m6.49 2.74c4.63.05 9.26.04 13.89.01-.36-1.59-.89-3.12-1.5-4.61-4.4-2.6-11.66-1.22-12.39 4.6zM227.7 27.031c4.09-5 12.26-5.6 17.19-1.55 3.24 2.99 4.13 7.73 3.95 11.96 0 4.86-1.81 10.26-6.19 12.86-4.16 2.66-9.4 2.02-14.02 1.23.05 3.68.04 7.37.03 11.06h-7.27v-32.74c-1.41 0-2.81 0-4.21.01-.01-2.03-.01-4.05-.01-6.07 3.17.03 6.35-.16 9.51.13.47.99.81 2.02 1.02 3.11m3.24 3.14c-.72.83-1.45 1.66-2.18 2.48-.16 4.05-.07 8.11-.1 12.17 3.44 1.88 7.71 1.81 10.75-.81 2.22-3.85 3.27-9.29.09-12.93-2.11-2.58-5.83-2.12-8.56-.91zM256.57 32.321c5.41-.01 10.83 0 16.24-.01 0 2.19-.01 4.38-.01 6.58-5.41-.02-10.82 0-16.23-.01v-6.56zM333.78 11.691c4.02-.1 8.03-.06 12.05-.06.01 8.62-.02 17.24.01 25.87.09 2.16.02 4.58 1.46 6.37 2.47 1.8 5.61.59 8.25-.13.85 1.64 1.73 3.26 2.6 4.88-4.18 2.58-9.48 3.7-14.16 1.86-3.2-1.28-5.39-4.51-5.35-7.96-.18-8.27-.02-16.54-.07-24.81-1.59-.01-3.19-.02-4.77-.04-.01-1.99-.01-3.98-.02-5.98zM362.35 30.561c3.64-10.05 19.67-11.86 25.55-3.03 1.84 3.57 1.35 7.74.88 11.58-6.8 0-13.6-.05-20.39.03.61 2.08 1.38 4.53 3.67 5.32 4.56 1.65 9.73.86 14.03-1.23.91 1.44 1.72 2.93 2.5 4.44-6.35 4.17-15.22 5.25-21.76.94-5.61-3.94-6.65-11.93-4.48-18.05m6.22 3.21c4.73.07 9.47.07 14.21-.01-.67-1.87-.93-4.22-2.9-5.24-4.3-2.31-10.52.22-11.31 5.25zM390.63 11.631c3.96-.01 7.92-.01 11.88 0 .01 7.49-.05 14.98.04 22.47 1.8-.2 2.81-1.81 3.93-3.02 2.21-2.81 4.59-5.49 6.71-8.38 2.9-.06 5.8-.07 8.7.03-3.72 4.34-7.59 8.54-11.44 12.75 2.71 2.7 4.84 5.9 7.43 8.71 1.76.17 3.54.11 5.32.14.03 1.93.06 3.86.14 5.79-3.17.58-6.97 1.36-9.87-.35-3.07-3.3-5.65-7.05-8.74-10.33-.54-.15-1.63-.46-2.17-.61-.09 3.8-.08 7.6.01 11.4-2.38.35-4.79.5-7.19.5-.3-11.01-.05-22.02-.13-33.03-1.54 0-3.08-.01-4.62-.01 0-2.02-.01-4.04 0-6.06zM430.71 16.291c2.41-.78 4.86-1.43 7.39-1.75-.01 2.71-.01 5.41-.01 8.11 4.85.01 9.69 0 14.54.01-.01 2.11-.01 4.21-.01 6.32-4.84-.01-9.68-.01-14.52 0 .04 4.19-.27 8.41.45 12.57.68.81 1.35 1.62 2.01 2.46 4.27 2.06 8.62-.19 12.1-2.68.89 1.69 2.59 3.19 2.72 5.16-3.46 3.48-8.7 5.07-13.55 4.79-4.43-.11-8.84-2.89-10.18-7.24-1.42-4.89-.81-10.05-.94-15.07-1.81 0-3.63.01-5.43.01-.01-2.11-.01-4.21-.01-6.32 1.81 0 3.62 0 5.44-.01v-6.36zM459.35 22.671c4.28-.01 8.57-.07 12.85.08.17.95.5 2.84.66 3.79 2.74-3.52 7.58-5.79 11.9-3.73 3.42 2.01 3.55 6.34 3.78 9.85-2.09 0-4.17 0-6.25.01-.37-1.22-.75-2.43-1.14-3.64-3.08-.57-5.75.91-7.55 3.32.02 3.97.01 7.94-.02 11.9 4.01.07 8.02.06 12.04.02.05 2 .08 4 .12 6-1.89.31-3.81.45-5.7.15-6.9-.35-13.8.25-20.69-.13 0-2 .01-4 .03-6 2.3.01 4.62.01 6.93.01.01-5.11.01-10.22.01-15.32-2.33-.01-4.65-.01-6.96-.01-.01-2.1-.01-4.2-.01-6.3zM501.17 22.751c6.63-1.97 15.2-.63 18.81 5.9 2.8 6.09 2.52 14.42-2.62 19.23-6.16 4.91-16.3 4.78-21.79-1.08-6.25-7.26-4.09-20.92 5.6-24.05m.53 7.48c-3.35 3.92-2.59 10.09.86 13.71 2.76 1.13 6.1 1.68 8.76-.06 3.46-2.52 3.43-7.6 2.28-11.31-1.62-4.84-8.56-6.04-11.9-2.34zM523.9 22.841c3.36-.25 6.73-.2 10.1-.18.22 1.27.44 2.55.67 3.82 2.81-3.17 6.88-5.13 11.18-4.46 4.09-.09 7.44 3.39 7.97 7.28.63 4.7.19 9.46.33 14.19-.09 2.46.38 5.06-.7 7.37-1.99-.63-4.07-.54-6.07-.05-1.39-6.16 0-12.55-.81-18.77-.44-2.45-3.07-3.62-5.3-3.78-2.51.21-4.38 1.99-5.92 3.8-.05 6.07-.02 12.14-.02 18.2-2.36.07-4.7.27-7.04.5-.35-7.23-.08-14.48-.16-21.71-1.38-.06-2.74-.11-4.1-.17.2-2.02.24-4.05-.13-6.04zM558.88 22.661c5.78.03 11.57-.08 17.35.08-.04 7.19-.01 14.37-.02 21.55 3.41.01 6.82.01 10.23 0 .01 2 .01 3.99.03 5.98-9.09.59-18.25-.45-27.35.47-.18-2.14-.26-4.29-.29-6.44 3.28 0 6.56 0 9.85-.01-.01-5.1 0-10.21-.01-15.32h-9.79c-.01-2.1-.01-4.21 0-6.31zM577.47 15.08a5 4.25 0 0 1-5 4.25 5 4.25 0 0 1-5-4.25 5 4.25 0 0 1 5-4.25 5 4.25 0 0 1 5 4.25zM586.85 17.691c-.01-2.02-.01-4.04 0-6.06 3.95 0 7.9-.01 11.86 0-.01 7.45-.01 14.91 0 22.36 1.91.15 2.83-1.7 3.96-2.86 2.46-2.74 4.41-5.98 7.19-8.4 2.74-.21 5.49-.07 8.24.06-3.62 4.32-7.61 8.31-11.17 12.68 2.42 2.9 4.79 5.84 7.17 8.77 1.76.04 3.53.06 5.31.07.03 1.98.05 3.97.12 5.95-3.08.66-6.2-.03-9.3.03-3.34-3.44-5.93-7.53-9.38-10.86-.53-.12-1.6-.37-2.14-.49-.02 3.79-.01 7.59 0 11.39h-7.28c.01-10.88.01-21.76 0-32.64h-4.58zM625.07 24.481c4.93-2.17 10.45-2.92 15.78-2.09 3.82.53 6.96 4.14 6.92 8.01.24 4.63-.56 9.25-.12 13.89 1.19 0 2.39.01 3.59.01 0 2.01.01 4.02.02 6.03-3.14-.05-6.29.18-9.4-.17-.14-.72-.43-2.15-.57-2.86-3.49 3.15-8.57 5.07-13.1 3.04-6.27-1.88-6.73-11.9-1.05-14.75 4.11-2.26 9.04-1.65 13.55-1.41-.07-1.43-.14-2.85-.22-4.28-4.09-3.37-9.33-.94-13.77.21-.53-1.89-1.09-3.76-1.63-5.63m6.42 15.13c-1.34 1.32-.58 3.03-.19 4.56 3.31 1.24 7.11.73 9.37-2.16-.08-1.26-.17-2.51-.25-3.77-3.02-.14-6.36-.64-8.93 1.37zM666.41 47.771a3.326 3.326 0 0 1-3.326 3.326 3.326 3.326 0 0 1-3.326-3.326 3.326 3.326 0 0 1 3.326-3.326 3.326 3.326 0 0 1 3.326 3.326zM675.7 32.311c4.29-3.52 10.73-3.47 15.53-1.08-.04 2.28-.05 4.56-.04 6.84-1.53-.01-3.05-.02-4.56-.04-.06-1.27-.11-2.55-.16-3.83-2.05.14-4.33-.27-6.09 1.05-3.27 2.16-3.18 7.82.15 9.87 2.91 2.26 6.92.92 9.89-.57.63 1.34 1.27 2.68 1.93 4.02-4.08 1.93-8.93 3.51-13.32 1.6-7.38-2.16-8.92-13.05-3.33-17.86zM700.75 30.331c4.31-1.34 9.66-1.1 13 2.32 3.75 4.47 3.49 11.84-.77 15.89-3.57 2.63-8.56 3.31-12.59 1.34-7.9-3.14-7.62-16.6.36-19.55m-.63 10.28c-.16 2.18 1.49 3.74 2.64 5.38 2.14.37 4.95.99 6.5-1.02 3.07-3.25 1.86-10.75-3.29-10.89-3.66-.66-6.43 3.16-5.85 6.53zM723.55 32.171c1.94-2.96 7.12-3.73 8.79-.12 1.82-2.16 4.47-2.72 7.17-2.24 1.1 1.37 2.57 2.7 2.39 4.64.26 5.26.03 10.54.11 15.8h-4.87c-.19-4.89.38-9.84-.3-14.7-.24-1.89-3.75-2.06-3.72.04-.26 4.88-.01 9.78-.09 14.66h-4.89c-.19-4.87.36-9.79-.27-14.63-.05-2.21-3.45-1.89-3.79-.03-.33 4.88-.02 9.78-.13 14.66-1.63 0-3.26 0-4.87.01-.01-6.76-.01-13.52 0-20.27 1.89.11 4.61-.66 4.47 2.18z" />
        <path
          d="M285.42 1.171c2.665-1.042 5.473-1.187 8.311-1.17h17.13c3.353 0 6.65.277 9.65 1.97 5.3 2.72 8.52 8.61 8.58 14.5.01 11.68.02 23.37 0 35.06-.07 6.12-3.63 12.21-9.25 14.81-3.155 1.363-6.507 1.668-9.89 1.66h-16.032c-3.594-.007-7.145-.389-10.389-2.1-5.02-2.84-8.42-8.53-8.22-14.34 0-11.71-.01-23.42 0-35.13-.26-6.52 4-12.95 10.11-15.26"
          fill="#e13322"
        />
        <path
          d="M289.9 14.451v-4.95h24.75v4.95h4.95v9.9h-4.95v4.95h4.95v9.9h-4.95v4.95h4.95v14.85h-29.7v-4.95h-4.95v-39.6z"
          fill="#000008"
        />
        <path
          d="M289.9 14.451h19.8v4.95h-14.85v9.9h14.85v4.95h-14.85v9.9h14.85v4.95h-19.8z"
          fill="#fff"
        />
      </svg>
    ),
    name: "Sklep-Elektronika",
  },
];

export const Partners = () => {
  const { LL } = useI18nContext();

  return (
    <section className="space-y-4 py-4">
      <Container>
        <Kicker className="mb-6">{LL.home.partners.kicker()}</Kicker>
        <Headline>{LL.home.partners.headline()}</Headline>
        <Deck className="mt-6 mb-12">{LL.home.partners.deck()}</Deck>
      </Container>
      <Marquee
        enabled={({ containerWidth, marqueeWidth }) =>
          containerWidth < marqueeWidth
        }
        fade
        marqueeProps={{
          className: "flex justify-center",
        }}
      >
        {partners.map(({ href, logo, name }) => (
          <Link
            aria-label={name}
            className="group mx-4 md:mx-8"
            href={href}
            key={name}
          >
            {logo}
          </Link>
        ))}
      </Marquee>
    </section>
  );
};