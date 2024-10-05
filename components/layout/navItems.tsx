import { usePathname } from 'next/navigation';
import { NavItem } from '@/types/types';
import Home from '@/public/sidenav-icons/home.svg';
import MesVentes from '@/public/sidenav-icons/mes-ventes.svg';
import CommandesRemisees from '@/public/sidenav-icons/commandes-remisees.svg';
import BonsCommande from '@/public/sidenav-icons/bons-commande.svg';
import MesProduits from '@/public/sidenav-icons/mes-produits.svg';
import MesAvoirs from '@/public/sidenav-icons/mes-avoirs.svg';
import MonStock from '@/public/sidenav-icons/mon-stock.svg';
import MesConfreres from '@/public/sidenav-icons/mes-confreres.svg';
import MesClients from '@/public/sidenav-icons/mes-clients.svg';
import MaCaisse from '@/public/sidenav-icons/ma-caisse.svg';
import MesFournisseurs from '@/public/sidenav-icons/mes-fournisseurs.svg';
import MesRapports from '@/public/sidenav-icons/mes-rapports.svg';
import Reglages from '@/public/sidenav-icons/reglages.svg';

export  const NavItems = () : NavItem[] => {
    const pathname = usePathname();
  
    function isNavItemActive(pathname: string | null, nav: string) {
      return (pathname || '').includes(nav);
    }
  
    return [
      {
        name: 'Accueil',
        href: '/',
        icon: Home,
        active: pathname === '/' || pathname === '/accueil' || pathname === '/todaysales',
        color: "#3378FF",
        shadowColor: "rgba(51, 97, 255, 0.3)",
      },
      {
        name: 'Mes ventes',
        href: '',
        icon: MesVentes,
        active: isNavItemActive(pathname, '/my-sales') || isNavItemActive(pathname, '/add-sale') || isNavItemActive(pathname, '/sale/'),
        color: "#20C9BF",
        shadowColor: "rgba(32, 201, 151, 0.3)",
        sublinks: [
          {
            name: 'Nouvelle vente',
            href: '/add-sale',
          },
          {
            name: 'Voir mes ventes',
            href: '/my-sales',
          },
        ],
      },
      {
        name: 'Commandes',
        href: '/orders?page=1',
        icon: CommandesRemisees,
        active: isNavItemActive(pathname, '/orders'),
        color: "#A86AFF",
        shadowColor: "rgba(136, 51, 255, 0.3)",
      },
      {
        name: 'Bons de livraison',
        href: '/bons-de-livraison',
        icon: BonsCommande,
        active: isNavItemActive(pathname ? pathname : "/", '/bons-de-livraison'),
        color: "#FF8F6B",
        shadowColor: "rgba(255, 143, 107, 0.3)",
      },
      {
        name: 'Mes produits',
        href: '/mes-produits',
        icon: MesProduits,
        active: isNavItemActive(pathname ? pathname : "/", '/mes-produits'),
        color: "#57CAE3",
        shadowColor: "rgba(87, 202, 227, 0.3)",
      },
      {
        name: 'Mes avoirs',
        href: '/mes-avoirs',
        icon: MesAvoirs,
        active: isNavItemActive(pathname ? pathname : "/", '/mes-avoirs'),
        color: "#FF6A77",
        shadowColor: "rgba(255, 106, 119, 0.3)",
      },
      {
        name: 'Mon stock',
        href: '/mon-stock',
        icon: MonStock,
        active: isNavItemActive(pathname ? pathname : "/", '/mon-stock'),
        color: "#B081C5",
        shadowColor: "rgba(188, 111, 224, 0.3)",
      },
      {
        name: 'Mes confrères',
        href: '/mes-confreres',
        icon: MesConfreres,
        active: isNavItemActive(pathname ? pathname : "/", '/mes-confreres'),
        color: "#E1AE44",
        shadowColor: "rgba(202, 138, 4, 0.3)",
      },
      {
        name: 'Mes clients',
        href: '/mes-clients',
        icon: MesClients,
        active: isNavItemActive(pathname ? pathname : "/", '/mes-clients'),
        color: "#5B93FF",
        shadowColor: "rgba(91, 147, 255, 0.3)",
      },
      {
        name: 'Ma caisse',
        href: '/ma-caisse',
        icon: MaCaisse,
        active: isNavItemActive(pathname ? pathname : "/", '/ma-caisse'),
        color: "#85C568",
        shadowColor: "rgba(78, 184, 28, 0.3)",
      },
      {
        name: 'Mes fournisseurs',
        href: '/mes-fournisseurs',
        icon: MesFournisseurs,
        active: isNavItemActive(pathname ? pathname : "/", '/mes-fournisseurs'),
        color: "#F9C227",
        shadowColor: "rgba(249, 194, 39, 0.3)",
      },
      {
        name: 'Mes rapports',
        href: '/mes-rapports',
        icon: MesRapports,
        active: isNavItemActive(pathname ? pathname : "/", '/mes-rapports'),
        color: "#A1AED7",
        shadowColor: "rgba(161, 174, 215, 0.3)",
      },
      {
        name: 'Réglages',
        href: '/reglages',
        icon: Reglages,
        active: isNavItemActive(pathname ? pathname : "/", '/reglages'),
        color: "#B6B6B6",
        shadowColor: "rgba(182, 182, 182, 0.3)",
      },
    ];
  };