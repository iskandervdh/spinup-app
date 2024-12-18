import logo from '../assets/images/logo.png';
import { Page, PAGES, usePageStore } from '../stores/pageStore';

function NavbarItem({ page }: { page: Page }) {
  const { currentPage, setCurrentPage } = usePageStore();

  return (
    <li>
      <button
        className="px-2 py-1 text-lg rounded-lg cursor-pointer text-primary hover:bg-black/10 data-[current]:bg-black/10"
        onClick={() => setCurrentPage(page)}
        data-current={page === currentPage ? 'current' : undefined}
      >
        {page}
      </button>
    </li>
  );
}

export function Navbar() {
  const { setCurrentPage } = usePageStore();

  return (
    <div className="flex items-center h-20 gap-8 border-b select-none min-h-20 border-primary/50 overflow-clip">
      <img
        src={logo}
        id="logo"
        alt="logo"
        className="h-20 cursor-pointer"
        draggable={false}
        onClick={() => setCurrentPage(PAGES[0])}
      />

      <ul className="flex gap-8">
        {PAGES.map((page) => (
          <NavbarItem key={page} page={page} />
        ))}
      </ul>
    </div>
  );
}
