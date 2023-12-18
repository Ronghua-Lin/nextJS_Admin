'use client'
import styles from "./menuLink.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface itemType {
  path: string;
  title: string;
  icon: any;
}

const MenuLink = ({ item }: { item: itemType }) => {
  const pathname:string = usePathname();

  return (
    <Link href={item.path} className={`${styles.container} ${pathname===item.path && styles.active}`} >
      {item.icon}
      {item.title}
    </Link>
  );
};

export default MenuLink;
