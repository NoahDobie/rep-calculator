function Header() {
  return (
    <header className="w-full">
      <h1 className="w-full mb-4 text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-center">
          <a
            href="https://github.com/NoahDobie/"
            className=" hover:text-[#FFD43B]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Noah's
          </a>
          {' '}1 Rep Max Calculator
        </h1>
    </header>
  );
}

export default Header;